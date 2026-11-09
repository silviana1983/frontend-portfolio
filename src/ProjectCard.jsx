function ProjectCard({ title, description, technologies, status, onClick }) {
  return (
    <article onClick={onClick}>
      <h3>{title}</h3>
      <p
        className={`project-status ${status === "Available" ? "available" : "coming-soon"}`}
      >
        {status}
      </p>
      <p>{description}</p>
      <p>Technologies: {technologies}</p>
    </article>
  );
}

export default ProjectCard;
