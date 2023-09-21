import React from "react";
import "./Contact.css";
import { useNavigate } from "react-router-dom";

const Contact = () => {

  const navigate = useNavigate();

  const contactSubmitHandler = (e) => {
    e.preventDefault();
    navigate("/");
  }


  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>
          We value your feedback and are here to assist you. Feel free to
          contact us for any inquiries or concerns.
        </p>
        <div className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Your Message"
            ></textarea>
          </div>
      <button type="submit"  onClick={contactSubmitHandler} className="submit-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
