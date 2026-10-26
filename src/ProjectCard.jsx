function ProjectCard({ title, description, technologies }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Technologies: {technologies}</p>
    </article>
  );
}

export default ProjectCard;
