import React, { useState, Fragment } from "react";
import { CiCirclePlus } from "react-icons/ci";

import { MdCancel } from "react-icons/md";
import classes from "./ProjectsSection.module.css";

const ProjectsSection = ({ setFormData }) => {
  const [project, setProject] = useState({
    projectTitle: "",
    projectDescription: "",
    projectLink: "",
  });
  const [projects, setProjects] = useState([]);

  const projectChangeHandler = (event) => {
    const { name, value } = event.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const MAX_PROJECTS = 3;

  const addProject = () => {
    if (projects.length >= MAX_PROJECTS) {
      alert(`You can add no more than ${MAX_PROJECTS} projects.`);
      return;
    }
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    // Optionally reset the project state to clear the form fields
    setProject({ projectTitle: "", projectDescription: "", projectLink: "" });

    // Call setFormData to update parent component's state
    setFormData((prevFormData) => ({
      ...prevFormData,
      projects: updatedProjects,
    }));
  };

  const removeProject = (indexToRemove) => {
    const updatedProjects = projects.filter(
      (_, index) => index !== indexToRemove
    );
    setProjects(updatedProjects);
    setFormData((prevFormData) => ({
      ...prevFormData,
      projects: updatedProjects,
    }));
  };

  return (
    <Fragment>
      <h2>Projects:</h2>
      <div className={classes.projectContent}>
        {/* Project Title */}
        <div className={classes.projectControl}>
          <label htmlFor="projectTitle">Project Title</label>
          <input
            value={project.projectTitle}
            onChange={projectChangeHandler}
            name="projectTitle"
            type="text"
            id="projectTitle"
          />
        </div>
        {/* Project Description */}
        <div className={classes.projectTextArea}>
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            value={project.projectDescription}
            onChange={projectChangeHandler}
            name="projectDescription"
            id="projectDescription"
            rows="2"
            className={classes.projectTextAreaBox}
          />
        </div>
        {/* Project Link */}
        <div className={classes.projectLink}>
          <label htmlFor="projectLink">URL to the Project</label>
          <input
            type="url"
            value={project.projectLink}
            onChange={projectChangeHandler}
            name="projectLink"
            id="projectLink"
          />
        </div>
        <CiCirclePlus className={classes.addMoreProject} onClick={addProject} />
      </div>
      <ul>
        {projects.map((proj, index) => (
          <li key={index}>
            <h3 className={classes.displayedH3}>
              {proj.projectTitle}{" "}
              <MdCancel
                className={classes.removeProject}
                onClick={() => removeProject(index)}
              />
            </h3>
            {/* <p>{proj.projectDescription}</p>
            <a
              href={proj.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Project Link
            </a> */}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default ProjectsSection;
