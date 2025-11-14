import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings  # ← FIXED
from sentence_transformers import SentenceTransformer  # ← PRE-LOAD
from langchain import hub
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="MedBot RAG API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://vinayrawat2004.github.io"],  # ← GITHUB PAGES
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FAISS_PATH = "vectorstore/db_faiss"
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
GROQ_MODEL_NAME = "llama-3.1-8b-instant"

# PRE-LOAD MODEL TO AVOID OOM
_model = SentenceTransformer("all-MiniLM-L6-v2")
embedding_model = HuggingFaceEmbeddings(model_kwargs={"model": _model})

# Load vectorstore
db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)

# Setup LLM
llm = ChatGroq(
    model=GROQ_MODEL_NAME,
    temperature=0.5,
    max_tokens=512,
    api_key=GROQ_API_KEY,
)

# RAG Chain
retrieval_qa_chat_prompt = hub.pull("langchain-ai/retrieval-qa-chat")
combine_docs_chain = create_stuff_documents_chain(llm, retrieval_qa_chat_prompt)
rag_chain = create_retrieval_chain(db.as_retriever(search_kwargs={'k': 3}), combine_docs_chain)

class QueryRequest(BaseModel):
    input: str

@app.post("/chat")
async def chat(request: QueryRequest):
    try:
        response = rag_chain.invoke({'input': request.input})
        return {
            "answer": response["answer"],
            "sources": [
                {
                    "metadata": doc.metadata,
                    "content": doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content
                }
                for doc in response["context"]
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
   uvicorn.run(app, host="0.0.0.0", port=8000)
