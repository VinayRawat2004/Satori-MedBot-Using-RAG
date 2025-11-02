import React from 'react';
import './ChatMessage.css';

// This component is no longer in active use. 
// The logic has been integrated into Chatbot.js for better cohesion.
function ChatMessage({ message, isUser }) {
  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
      <p>{message}</p>
    </div>
  );
}

export default ChatMessage;