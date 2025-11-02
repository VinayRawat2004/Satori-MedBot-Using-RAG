/**
 * Project: Satori
 * Made by: Vinay Rawat & Nikhil Kumar
 */

import React from 'react';
import './About.css';

export default function About() {
  const timelineEvents = [
    {
      date: "September 2025",
      event: "First PDF Ingested",
      description:
        "The journey began with the successful ingestion and processing of our first medical document.",
    },
    {
      date: "September 2025",
      event: "Groq Llama-3.1 Integration",
      description:
        "We integrated a cutting-edge language model to provide lightning-fast and accurate responses.",
    },
    {
      date: "October 2025",
      event: "Glassy UI v1 (You’re Here)",
      description:
        "Launched the first version of our user-friendly interface, focusing on clarity and ease of use.",
    },
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Our Journey & Vision</h1>
        <p>
          At <strong>Satori</strong>, we are committed to revolutionizing personal health management. 
          Here’s a look at our timeline and our vision for the future.
        </p>
      </div>

      <div className="timeline">
        {timelineEvents.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content glass-card">
              <h3>{item.date}</h3>
              <h4>{item.event}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="vision-section">
        <h2>Our Vision</h2>
        <p>
          To create a world where everyone has access to a private, instant, and intelligent health assistant 
          that understands their medical history better than anyone else.
        </p>
      </div>

      <footer className="credits">
        <p>© 2025 Satori — Created by <strong>Vinay Rawat</strong> & <strong>Nikhil Kumar</strong></p>
      </footer>
    </div>
  );
}
