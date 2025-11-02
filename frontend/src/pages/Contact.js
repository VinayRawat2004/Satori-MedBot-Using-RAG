import React, { useState } from "react";
import './Contact.css'; // Link to the new dedicated CSS file

export default function Contact() {
  const [form, setForm] = useState({name:"", email:"", message:""});

  const send = (e) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    alert("Message sent! We'll be in touch shortly.");
    setForm({name:"", email:"", message:""});
  };

  return (
    <div className="contact glass">
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-subtitle">
        Have a question, feedback, or a partnership inquiry? 
        We’d love to hear from you.
      </p>
      <form onSubmit={send} className="contact-form">
        <input
          type="text"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={e => setForm({...form, name:e.target.value})}
          className="form-input"
        />
        <input
          type="email" /* Corrected for email validation */
          placeholder="Your Email"
          required
          value={form.email}
          onChange={e => setForm({...form, email:e.target.value})}
          className="form-input"
        />
        {/* [FIXED] Incorrect tag replaced with proper textarea */ }
        <textarea
          placeholder="Your Message"
          required
          value={form.message}
          onChange={e => setForm({...form, message:e.target.value})}
          className="form-textarea"
          rows="6" /* Gives it a substantial default height */
        />
        <button type="submit" className="glass form-button">
          Send Message
        </button>
      </form>
    </div>
  );
}