import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to our modern and user-friendly E-Commerce platform! Our goal
          is to provide you with an exceptional online shopping experience.
        </p>
        <p>
          Whether you're looking for the latest fashion trends, electronics,
          home decor, or more, we have it all. Our extensive product catalog
          caters to your diverse needs.
        </p>
        <p>
          Shopping with us is easy and secure. With features like user
          registration, a streamlined checkout process, and various payment
          options, you can shop with confidence.
        </p>
        <p>
          We value your feedback. You can leave product reviews and ratings to
          help others make informed decisions.
        </p>
        <p>
          Explore our website and discover a world of possibilities. Happy
          shopping!
        </p>
        <a
          className="github-link"
          href="https://github.com/chouhananmol/Ecommerce-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit our GitHub Repository
        </a>
      </div>

    </div>
  );
};

export default About;
