import { Fragment, useState } from "react";
import classes from "./Education.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

const Education = ({ setFormData }) => {
  const [education, setEducation] = useState({
    educationStartDate: "",
    educationEndDate: "",
    educationTitle: "",
    educationInstituteName: "",
  });

  const [educations, setEducations] = useState([]);

  const educationChangeHandler = (event) => {
    const { name, value } = event.target;
    setEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  const MAX_EDUCATIONS = 2;

  const addEducation = () => {
    if (educations.length >= MAX_EDUCATIONS) {
      alert(`You can add no more than ${MAX_EDUCATIONS} educations.`);
      return;
    }
    const updatedEducations = [...educations, education];
    setEducations(updatedEducations);
    setEducation({
      educationStartDate: "",
      educationEndDate: "",
      educationTitle: "",
      educationInstituteName: "",
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      educations: updatedEducations,
    }));
  };

  const removeEducation = (indexToRemove) => {
    const updatedEducations = educations.filter(
      (_, index) => index !== indexToRemove
    );
    setEducations(updatedEducations);
    setFormData((prevFormData) => ({
      ...prevFormData,
      educations: updatedEducations,
    }));
  };
  return (
    <Fragment>
      <h2>Education:</h2>
      <div className={classes.content}>
        <div className={classes.educationContent}>
          <div className={classes.educationDates}>
            <label htmlFor="educationStartDate">Start Date:</label>
            <input
              value={education.educationStartDate}
              name="educationStartDate"
              onChange={educationChangeHandler}
              type="month"
              id="educationStartDate"
            />
          </div>
          <div className={classes.educationDates}>
            <label htmlFor="educationEndDate">End Date:</label>
            <input
              value={education.educationEndDate}
              name="educationEndDate"
              onChange={educationChangeHandler}
              type="month"
              id="educationEndDate"
            />
          </div>
        </div>
        <div></div>
        <div>
          <div className={classes.educationContent}>
            <div className={classes.educationControl}>
              <label htmlFor="educationTitle">Education Title</label>
              <input
                value={education.educationTitle}
                name="educationTitle"
                onChange={educationChangeHandler}
                type="text"
                id="educationTitle"
              ></input>
            </div>
            <div className={classes.educationControl}>
              <label htmlFor="educationInstituteName">Institute Name</label>
              <input
                value={education.educationInstituteName}
                name="educationInstituteName"
                onChange={educationChangeHandler}
                type="text"
                id="educationInstituteName"
              ></input>
            </div>
          </div>
        </div>
      </div>
      <CiCirclePlus
        className={classes.addMoreEducation}
        onClick={addEducation}
      />
      <ul>
        {educations.map((edu, index) => (
          <li key={index}>
            <h3 className={classes.displayedH3}>
              {edu.educationTitle}
              <MdCancel
                className={classes.removeEducation}
                onClick={() => removeEducation(index)}
              />
            </h3>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Education;
