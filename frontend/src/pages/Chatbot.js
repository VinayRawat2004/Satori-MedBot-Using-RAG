import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import './Chatbot.css'; 

// Loading spinner remains the same
const LoadingSpinner = () => <div className="spinner"></div>;

// Function to get a formatted timestamp
const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hey there! I'm Dr. Satori. How can I help you?", isUser: false, time: getTime() }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, isUser: true, time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/chat", { input });
      const botReply = { text: res.data.answer, isUser: false, time: getTime() };
      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      const errorReply = { text: "My apologies, I'm currently unable to connect. Please try again soon.", isUser: false, time: getTime() };
      setMessages(prev => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot glass">
      <h2 className="chatbot-header">Dr. Satori</h2>
      
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`message-container ${m.isUser ? 'user' : 'bot'}`}>
            <div className="message-bubble">
              <p className="message-text">{m.text}</p>
              <span className="message-time">{m.time}</span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message-container bot">
            <div className="message-bubble">
              <LoadingSpinner />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === "Enter" && sendMessage()}
          placeholder="e.g. I have a cough and runny nose..."
          className="chat-input"
          disabled={isLoading}
        />
        <button onClick={sendMessage} className="send-button" disabled={isLoading}>
          ➤
        </button>
      </div>
    </div>
  );
}