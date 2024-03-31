import { useState } from "react";
import FromCard from "../ui/FormCard";
import classes from "./NewCvForm.module.css";
import Courses_Certificates_Section from "./cvForm_components/Courses_Certificates_Section";
import ProjectsSection from "./cvForm_components/ProjectsSection";
import Education from "./cvForm_components/Education";
import JobHistory from "./cvForm_components/JobHistory";
import Contacts from "./cvForm_components/Contacts";
import Profile from "./cvForm_components/Profile";
import TechnicalSkills from "./cvForm_components/TechnicalProfile";
import Competencies from "./cvForm_components/Competencies";
import Languages from "./cvForm_components/Languages";

const NewCvForm = (props) => {
  const [formData, setFormData] = useState({
    profiles: [],
    contacts: [],
    jobs: [],
    courses_Certificates: [],
    educations: [],
    projects: [],
    technicalSkills: [],
    competencies: [],
    languages: [],
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formData);
    props.onAddCv(formData);
  };

  return (
    <FromCard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Profile
          setFormData={setFormData}
          profiles={formData.profiles}
        ></Profile>

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

        <TechnicalSkills
          technicalSkills={formData.technicalSkills}
          setFormData={setFormData}
        ></TechnicalSkills>

        <Competencies
          competencies={formData.competencies}
          setFormData={setFormData}
        ></Competencies>

        <Languages
          languages={formData.languages}
          setFormData={setFormData}
        ></Languages>

        <div className={classes.actions}>
          <button>Build New CV</button>
        </div>
      </form>
    </FromCard>
  );
};

export default NewCvForm;
