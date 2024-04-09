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
import Interests from "./cvForm_components/Interests";

const getInitialFormData = (initialData) => ({
  profiles: initialData.profiles || [],
  contacts: initialData.contacts || [],
  jobs: initialData.jobs || [],
  courses_Certificates: initialData.courses_Certificates || [],
  educations: initialData.educations || [],
  projects: initialData.projects || [],
  technicalSkills: initialData.technicalSkills || [],
  competencies: initialData.competencies || [],
  languages: initialData.languages || [],
  interests: initialData.interests || [],
});

const NewCvForm = ({ onSubmitCv, initialCvData = {} }) => {
  const [formData, setFormData] = useState(getInitialFormData(initialCvData));

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formData);
    onSubmitCv(formData);
  };

  return (
    <FromCard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Profile
          setFormData={setFormData}
          initialProfile={
            formData.profiles.length > 0 ? formData.profiles[0] : undefined
          }
        ></Profile>

        <Contacts
          setFormData={setFormData}
          initialContact={
            formData.contacts.length > 0 ? formData.contacts[0] : undefined
          }
        ></Contacts>

        <JobHistory
          setFormData={setFormData}
          initialJobs={formData.jobs}
        ></JobHistory>

        <Courses_Certificates_Section
          initialCourses={formData.courses_Certificates || []}
          setFormData={setFormData}
        />
        <Education
          initialEducations={formData.educations}
          setFormData={setFormData}
        />

        <ProjectsSection
          setFormData={setFormData}
          initialProjects={formData.projects}
        ></ProjectsSection>

        <TechnicalSkills
          initialTechnicalSkills={formData.technicalSkills || []}
          setFormData={setFormData}
        ></TechnicalSkills>

        <Competencies
          initialCompetencies={formData.competencies || []}
          setFormData={setFormData}
        ></Competencies>

        <Languages
          initialLanguages={formData.languages || []}
          setFormData={setFormData}
        ></Languages>

        <Interests
          initialInterests={formData.interests || []}
          setFormData={setFormData}
        ></Interests>

        <div className={classes.actions}>
          <button>
            {Object.keys(initialCvData).length > 0
              ? "Update CV"
              : "Build New CV"}
          </button>
        </div>
      </form>
    </FromCard>
  );
};

export default NewCvForm;
