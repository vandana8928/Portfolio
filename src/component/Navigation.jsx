import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import WhatsAppButton from "./WhatsAppButton";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="Navbar">
      <a href="#home" className="logo-link" onClick={toggleMenu}>
     Vandana Yadav
      </a>
      <div className={`nav-items ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#hero" className="nav-link active" onClick={toggleMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="#skills" className="nav-link" onClick={toggleMenu}>
              Skills
            </a>
          </li>
          <li>
            <a href="#project" className="nav-link" onClick={toggleMenu}>
              Project
            </a>
          </li>
         
          <li>
           
              <WhatsAppButton/>
          
          </li>
        </ul>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
      </button>
    </div>
  );
};

export default Navigation;