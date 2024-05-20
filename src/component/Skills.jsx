import React from "react";
const Skills = () => {
  return (
    <div className="Skills" id="skills">
      <h1>Skills</h1>
      <div className="skills-content">
        <div className="image">
          <img
            src="https://cdn-images-1.medium.com/max/839/1*L5QyrMNalM3yhtgdgBcvkQ.png"
            alt="Skills "
          />
        </div>
        <div className="con">
          <p className="skills">
            {/* <span className="skills-title">Skills:</span> */}
            <ul className="skills-list">
              <li><strong>Web Development:</strong> Proficient in HTML, CSS, JavaScript, and React.js</li>
              <li><strong>Backend Development:</strong> Experience with Node.js, Express.</li>
              <li><strong>Database Management:</strong> Knowledge of SQL, MySQL, and MongoDB</li>
              <li><strong>Version Control:</strong> Skilled in using Git and GitHub</li>
              <li><strong>Problem Solving:</strong> Strong analytical and problem-solving abilities</li>
              <li><strong>Communication: </strong> Excellent verbal and written communication skills</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;