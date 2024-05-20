// WhatsAppButton.jsx
import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '8928358012'; // Replace with your WhatsApp Business phone number
  const apiLink = `https://wa.me/${phoneNumber}`;

  return (
    <a href={apiLink} target="_blank" rel="noopener noreferrer">
      <button className='whatbtn'>Contact us on WhatsApp</button>
    </a>
  );
};

export default WhatsAppButton;