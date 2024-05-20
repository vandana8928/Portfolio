import React from "react";
import "./App.css";
import Navigation from "./component/Navigation";
import Hero from "./component/Hero";
import Project from "./component/Project";
import CustomScrollButton from "./component/CustomScrollButton";
import Footer from "./component/Footer";
import Skills from "./component/Skills";
import VideoGallery from "./component/VideoGallery";


function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <div className="App">
      <Navigation />
      <div id="hero">
        <Hero />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="project">
        <Project />
      </div>
      <div id="video">
        <VideoGallery />
      </div>

      <CustomScrollButton direction="up" onClick={scrollToTop} />
      <CustomScrollButton direction="down" onClick={scrollToBottom} />
      <Footer />
    </div>
  );
}

export default App;