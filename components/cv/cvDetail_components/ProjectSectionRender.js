import classes from "./ProjectSectionRender.module.css";

const ProjectSectionRender = (props) => {
  return (
    <div className={classes.project}>
      <li>
        <span>Projects:</span>
      </li>
      <div className={classes.projectContainer}>
        <div className={classes.project_Leftside}></div>
        <div className={classes.project_Rightside}>
          <ul>
            {props.projects &&
              props.projects.map((project, index) => (
                <li key={index}>
                  <h2>{project.projectTitle}</h2>
                  <p>
                    {project.projectDescription} - {""}
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Project Link
                    </a>
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectSectionRender;
