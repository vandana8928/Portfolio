import React from "react";

const Hero = () => {
  return (
    <div className="hero" id="hero">
      <h1>This is Vandana Yadav</h1>
      <p>My resume is available below. Click to download and view</p>
      <div className="btns">

        <a href="./Vandana Yadav.pdf" target="_black">
          <button className="btn">Open Resume</button>
        </a>
        <a href="./Vandana Yadav.pdf" download>
          <button className="btn1">Download</button>
        </a>
      </div>
    </div>
  );
};

export default Hero;