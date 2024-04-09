import React, { useState, Fragment, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";

import { MdCancel } from "react-icons/md";
import classes from "./ProjectsSection.module.css";

const ProjectsSection = ({ setFormData, initialProjects }) => {
  // const [project, setProject] = useState({
  //   projectTitle: "",
  //   projectDescription: "",
  //   projectLink: "",
  // });
  // const [projects, setProjects] = useState([]);
  const initialProjectState = {
    projectTitle: "",
    projectDescription: "",
    projectLink: "",
  };

  const [project, setProject] = useState(() => {
    return initialProjects && initialProjects.length > 0
      ? initialProjects[0]
      : initialProjectState;
  });

  const [projects, setProjects] = useState(
    Array.isArray(initialProjects) ? initialProjects : []
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      setProject(initialProjects[0]);
    } else {
      setProject({
        projectTitle: "",
        projectDescription: "",
        projectLink: "",
      });
    }
  }, [initialProjects]);

  useEffect(() => {
    if (Array.isArray(initialProjects)) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, projects }));
  }, [projects, setFormData]);

  const validateInput = (name, value) => {
    switch (name) {
      case "projectTitle":
        if (value.trim().length === 0) {
          return "Project Title cannot be empty";
        } else if (value.trim().length > 61) {
          return "Project Title can only contain up to 60 character";
        } else {
          return "";
        }
      case "projectDescription":
        if (value.trim().length === 0) {
          return "Project Description cannot be empty";
        } else if (value.trim().length > 151) {
          return "Project Description can only contain up to 150 character";
        } else {
          return "";
        }
      case "projectLink":
        if (value.trim().length === 0) {
          return "Project Link cannot be empty";
        } else if (!/^https?:\/\/.+\..+/.test(value)) {
          return "Please enter a valid URL.";
        } else {
          return "";
        }
    }
  };

  const projectChangeHandler = (event) => {
    const { name, value } = event.target;
    const error = validateInput(name, value);
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const blurHandler = (event) => {
    const { name, value } = event.target;
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const MAX_PROJECTS = 3;

  const resetProjectForm = () => {
    setProject({
      projectTitle: "",
      projectDescription: "",
      projectLink: "",
    });
  };

  const addProject = () => {
    if (projects.length >= MAX_PROJECTS) {
      alert(`You can add no more than ${MAX_PROJECTS} projects.`);
      return;
    }

    const requiredFields = [
      "projectTitle",
      "projectDescription",
      "projectLink",
    ];

    const missingFields = requiredFields.filter((field) => {
      if (!project[field] || !project[field].toString().trim()) {
        console.log(`Missing or empty field: ${field}`);
        return true;
      }
      return false;
    });

    if (missingFields.length > 0) {
      alert(
        `Please fill in all required fields before adding a project. Missing: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      alert("Please correct the errors before adding your Project.");
      return;
    }
    setProjects((prev) => [...prev, project]);
    resetProjectForm();
  };

  const removeProject = (indexToRemove) => {
    const updatedProjects = projects.filter(
      (_, index) => index !== indexToRemove
    );
    setProjects(updatedProjects);
  };

  const projectTitleClasses = errors.projectTitle
    ? classes.projectControlErrorInput
    : classes.projectControlInput;

  const projectDescriptionClasses = errors.projectDescription
    ? classes.projectTextErrorAreaBox
    : classes.projectTextAreaBox;

  const projectLinkClasses = errors.projectLink
    ? classes.projectLinkErrorInput
    : classes.projectLinkInput;

  return (
    <Fragment>
      <h2>Projects:</h2>
      <div className={classes.projectContent}>
        <div className={classes.projectControl}>
          <label htmlFor="projectTitle">Project Title</label>
          <input
            className={projectTitleClasses}
            value={project.projectTitle}
            onChange={projectChangeHandler}
            onBlur={blurHandler}
            name="projectTitle"
            type="text"
            id="projectTitle"
          />
          {errors.projectTitle && (
            <p className={classes.errorMessage}>{errors.projectTitle}</p>
          )}
        </div>

        <div className={classes.projectTextArea}>
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            className={projectDescriptionClasses}
            value={project.projectDescription}
            onChange={projectChangeHandler}
            onBlur={blurHandler}
            name="projectDescription"
            id="projectDescription"
            rows="2"
          />
          {errors.projectDescription && (
            <p className={classes.errorMessage}>{errors.projectDescription}</p>
          )}
        </div>

        <div className={classes.projectLink}>
          <label htmlFor="projectLink">URL to the Project</label>
          <input
            className={projectLinkClasses}
            type="url"
            value={project.projectLink}
            onChange={projectChangeHandler}
            onBlur={blurHandler}
            name="projectLink"
            id="projectLink"
          />
          {errors.projectLink && (
            <p className={classes.errorMessage}>{errors.projectLink}</p>
          )}
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
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default ProjectsSection;
