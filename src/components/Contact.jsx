// src/components/Contact.jsx
import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="contact-page">
      <h1 className="contact-title">Contact Me</h1>
      <form
        className="contact-form"
        action="https://formspree.io/f/mblyrkoy"
        method="POST"
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />

        <button type="submit">Send</button>
      </form>
    </section>
  );
}
