import React from "react";

const projects = [
  {
    img: "https://plus.unsplash.com/premium_photo-1661508333411-0246522ee003?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Sales Data Analysis for 2022",
    link: "https://github.com/vandana8928/visualization-using-power-bi/blob/main/store_dashboard/dashboard.png",
  },
  {
    img: "./img/Todo.png",
    description: "Todo List App",
    link: "https://goalguru.netlify.app/",
  },
  {
    img: "./img/Brand.png",
    description: "WatchTime",
    link: "https://watchwhisperer.netlify.app/",
  },
  {
    img: "https://user-images.githubusercontent.com/49127037/138058027-a9d85497-8bbb-4385-b313-1b0dca7e3dbb.png",
    description: "Home Price Prediction",
    link: "#",
  },
  {
    img: "https://images.unsplash.com/photo-1582133776712-0b942f3ef601?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Book Shop",
    link: "https://github.com/vandana8928/CPP_project",
  },
  {
    img: "./img/landing.png",
    description: "Landing Page",
    link: "https://landingresponsive.netlify.app/",
  },
  {
    img: "./img/Class.png",
    description: "Classmitra",
    link: "https://classmitra.netlify.app/",
  },
  {
    img: "./img/Women.png",
    description: "WomenCollection",
    link: "https://diorwomecollection.netlify.app/",
  },



];

const Project = () => (
  <div className="Project" id="project">
    <h1>Projects</h1>
    <div className="grid-container">
      {projects.map((project, i) => (
        <div className="grid-item" key={i}>
          <img src={project.img} alt={project.description} />
          <p>{project.description}</p>
          {project.link !== "#" ? (
            <a className="btn" href={project.link} target="_blank" rel="noopener noreferrer">
              Click here
            </a>
          ) : (
            <button className="btn">Click here</button>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Project;
