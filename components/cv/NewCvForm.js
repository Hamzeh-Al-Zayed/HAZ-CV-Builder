import { useState } from "react";
import FromCard from "../ui/FormCard";
import classes from "./NewCvForm.module.css";
import Courses_Certificates_Section from "./cvForm_components/Courses_Certificates_Section";
import ProjectsSection from "./cvForm_components/ProjectsSection";
import Education from "./cvForm_components/Education";
import JobHistory from "./cvForm_components/JobHistory";
import Contacts from "./cvForm_components/Contacts";

const NewCvForm = (props) => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    job_title: "",
    email: "",
    selfSummary: "",
    birthday: "",
    contacts: [],
    jobs: [],
    courses_Certificates: [],
    educations: [],
    projects: [],
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formData);
    props.onAddCv(formData);
  };

  return (
    <FromCard>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>Pesonal Information:</h2>
        <div className={classes.image}>
          <label htmlFor="image">Upload Image URL</label>
          <input
            type="url"
            required
            id="image"
            value={formData.image}
            name="image"
            onChange={changeHandler}
            accept="image/*"
          ></input>
        </div>
        <div className={classes.content}>
          <div className={classes.control}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              required
              id="name"
              value={formData.name}
              name="name"
              onChange={changeHandler}
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="job_title">Job Title</label>
            <input
              type="text"
              required
              id="job_title"
              value={formData.job_title}
              name="job_title"
              onChange={changeHandler}
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              id="email"
              value={formData.email}
              name="email"
              onChange={changeHandler}
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="birthday">BirthDay</label>
            <input
              type="date"
              required
              id="birthday"
              value={formData.birthday}
              name="birthday"
              onChange={changeHandler}
            ></input>
          </div>
        </div>
        <div className={classes.textarea}>
          <label className={classes.textarealabel} htmlFor="summary">
            Self Summary
          </label>
          <textarea
            className={classes.textareaBox}
            required
            id="summary"
            rows="9"
            value={formData.selfSummary}
            name="selfSummary"
            onChange={changeHandler}
            maxLength={300}
          ></textarea>
        </div>

        <Contacts
          setFormData={setFormData}
          contacts={formData.contacts}
        ></Contacts>

        <JobHistory setFormData={setFormData} jobs={formData.jobs}></JobHistory>

        <Courses_Certificates_Section
          courses_Certificates={formData.courses_Certificates}
          setFormData={setFormData}
        />
        <Education educations={formData.educations} setFormData={setFormData} />

        <ProjectsSection
          setFormData={setFormData}
          projects={formData.projects}
        ></ProjectsSection>

        <div className={classes.actions}>
          <button>Build New CV</button>
        </div>
      </form>
    </FromCard>
  );
};

export default NewCvForm;
