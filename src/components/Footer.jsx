import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="footer-section">
            <h3 className="footer-logo">Food<span>Kart</span></h3>
            <p>Delicious food delivered straight to your doorstep. Experience the best tastes from your local restaurants.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: support@foodkart.com</p>
            <p>Phone: +91 (234) 567-890</p>
            <p>Address: 123 Foodie Lane,KPHB, Hyderbad,INDIA</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Pavan@FoodKart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
