import { useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import TaskTracker from "./TaskTracker.jsx";

const projects = [
  {
    id: 1,
    title: "Interactive Task Tracker",
    description:
      "A React application for organizing tasks and tracking progress through a simple, intuitive interface.",
    technologies: "React, JavaScript, CSS",
  },
  {
    id: 2,
    title: "Personal Finance Dashboard",
    description:
      "A web application for organizing expenses, monitoring budgets, and tracking personal finances.",
    technologies: "React, JavaScript, CSS, Chart.js",
  },

  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A web application for exploring weather conditions and displaying forecast information in a clear, user-friendly interface.",
    technologies: "React, JavaScript, CSS, Weather API",
  },
];

function App() {
  const [showTaskTracker, setShowTaskTracker] = useState(false);
  return (
    <main>
      <h1>Hi, I'm Silvia Flórez! 🌷</h1>
      <p>Welcome to my frontend developer portfolio.</p>

      <section>
        <h2>About Me</h2>
        <p>
          I'm a Systems Engineer passionate about building useful, accessible,
          and user-friendly web applications.
        </p>
      </section>

      <section className="projects-section">
        <h2>My Projects</h2>

        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            onClick={
              project.id === 1 ? () => setShowTaskTracker(true) : undefined
            }
            title={project.title}
            description={project.description}
            technologies={project.technologies}
          />
        ))}
      </section>

      {showTaskTracker && (
        <TaskTracker onBack={() => setShowTaskTracker(false)} />
      )}

      <section>
        <h2>My Skills</h2>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Git and GitHub</li>
        </ul>
      </section>
    </main>
  );
}

export default App;
