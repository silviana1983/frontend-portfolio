function ProjectCard({ title, description, technologies, onClick }) {
  return (
    <article onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Technologies: {technologies}</p>
    </article>
  );
}

export default ProjectCard;
