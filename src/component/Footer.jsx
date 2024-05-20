import React from 'react';
import 'remixicon/fonts/remixicon.css';// Import your CSS file

const Footer = () => {
  return (
    <div className='footer'>
      <h2>Vandana Yadav</h2>
      <div className='social-icons'>
        <ul>
          <li>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="ri-facebook-box-fill" style={{ fontSize: '2em' }}></i>
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="ri-twitter-fill" style={{ fontSize: '2em' }}></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="ri-instagram-fill" style={{ fontSize: '2em' }}></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="ri-linkedin-box-fill" style={{ fontSize: '2em' }}></i>
            </a>
          </li>
        </ul>
      </div>
      <p>Copyright © 2024 Vandana Yadav</p>
    </div>
  );
}

export default Footer;