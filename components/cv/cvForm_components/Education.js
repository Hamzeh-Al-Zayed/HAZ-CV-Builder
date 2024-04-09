import { Fragment, useEffect, useState } from "react";
import classes from "./Education.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

const Education = ({ setFormData, initialEducations }) => {
  const [lastEndDate, setLastEndDate] = useState("");
  const [showEndDate, setShowEndDate] = useState(true);
  const initialEducationState = {
    educationStartDate: "",
    educationEndDate: "",
    educationTitle: "",
    educationInstituteName: "",
  };
  const [education, setEducation] = useState(() => {
    return initialEducations && initialEducations.length > 0
      ? initialEducations[0]
      : initialEducationState;
  });

  const [educations, setEducations] = useState(
    Array.isArray(initialEducations) ? initialEducations : []
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialEducations && initialEducations.length > 0) {
      setEducation(initialEducations[0]);
    } else {
      setEducation({
        educationStartDate: "",
        educationEndDate: "",
        educationTitle: "",
        educationInstituteName: "",
      });
    }
  }, [initialEducations]);

  useEffect(() => {
    if (Array.isArray(initialEducations)) {
      setEducations(initialEducations);
    }
  }, [initialEducations]);

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, educations }));
  }, [educations, setFormData]);

  const validateInput = (name, value) => {
    switch (name) {
      case "educationStartDate":
        return value.trim().length === 0 ? "Start Date cannot be empty" : "";
      case "educationEndDate":
        return value.trim().length === 0 ? "End Date cannot be empty" : "";
      case "educationTitle":
        if (value.trim().length === 0) {
          return "Education Title cannot be empty";
        } else if (value.trim().length > 61) {
          return "Education Title can only contain up to 60 character";
        } else {
          return "";
        }
      case "educationInstituteName":
        if (value.trim().length === 0) {
          return "Education Institute Name cannot be empty";
        } else if (value.trim().length > 61) {
          return "Education Institute Name can only contain up to 60 character";
        } else {
          return "";
        }
      default:
        return "";
    }
  };

  const educationChangeHandler = (event) => {
    const { name, value } = event.target;
    const error = validateInput(name, value);
    setEducation((prevEducation) => ({
      ...prevEducation,
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

  const MAX_EDUCATIONS = 2;

  const resetEducationForm = () => {
    setEducation({
      educationStartDate: "",
      educationEndDate: "",
      educationTitle: "",
      educationInstituteName: "",
    });
  };

  const addEducation = () => {
    if (educations.length >= MAX_EDUCATIONS) {
      alert(`You can add no more than ${MAX_EDUCATIONS} educations.`);
      return;
    }

    const requiredFields = [
      "educationStartDate",
      "educationEndDate",
      "educationTitle",
      "educationInstituteName",
    ];

    const missingFields = requiredFields.filter((field) => {
      if (!education[field] || !education[field].toString().trim()) {
        console.log(`Missing or empty field: ${field}`);
        return true;
      }
      return false;
    });

    if (missingFields.length > 0) {
      alert(
        `Please fill in all required fields before adding an education. Missing: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    if (
      education.educationEndDate &&
      education.educationStartDate &&
      new Date(education.educationEndDate) <
        new Date(education.educationStartDate)
    ) {
      alert("End date cannot be before Start date.");
      return;
    }

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      alert("Please correct the errors before adding your Education.");
      return;
    }

    setEducations((prev) => [...prev, education]);
    resetEducationForm();
    setShowEndDate(true);
  };

  const removeEducation = (indexToRemove) => {
    const updatedEducations = educations.filter(
      (_, index) => index !== indexToRemove
    );
    setEducations(updatedEducations);
  };

  const showEndDateHandler = (event) => {
    const isChecked = event.target.checked;
    setShowEndDate(!isChecked); // Toggle visibility of the end date input
    if (isChecked) {
      setLastEndDate(education.jobEndDate); // Save the current end date before setting to "Present"
      setEducation((prevJob) => ({
        ...prevJob,
        educationEndDate: "Present",
      }));
    } else {
      setEducation((prevJob) => ({
        ...prevJob,
        educationEndDate: lastEndDate, // Restore the last end date when unchecked
      }));
    }
  };

  const educationStartDateClasses = errors.educationStartDate
    ? classes.educationDatesErrorInput
    : classes.educationDatesInput;

  const educationEndDateClasses = errors.educationEndDate
    ? classes.educationDatesErrorInput
    : classes.educationDatesInput;

  const educationTitleClasses = errors.educationTitle
    ? classes.educationControlErrorInput
    : classes.educationControlInput;

  const educationInstituteNameClasses = errors.educationInstituteName
    ? classes.educationControlErrorInput
    : classes.educationControlInput;
  return (
    <Fragment>
      <h2>Education:</h2>
      <div className={classes.educationContent}>
        <div className={classes.educationDatesContent}>
          <div className={classes.educationDates}>
            <label htmlFor="educationStartDate">Start Date:</label>
            <input
              className={educationStartDateClasses}
              value={education.educationStartDate}
              name="educationStartDate"
              onChange={educationChangeHandler}
              onBlur={blurHandler}
              type="month"
              id="educationStartDate"
            />
            {errors.educationStartDate && (
              <p className={classes.errorMessage}>
                {errors.educationStartDate}
              </p>
            )}
          </div>
          {showEndDate && (
            <div className={classes.educationDates}>
              <label htmlFor="educationEndDate">End Date:</label>
              <input
                className={educationEndDateClasses}
                value={education.educationEndDate}
                name="educationEndDate"
                onChange={educationChangeHandler}
                onBlur={blurHandler}
                type="month"
                id="educationEndDate"
              />
              {errors.educationEndDate && (
                <p className={classes.errorMessage}>
                  {errors.educationEndDate}
                </p>
              )}
            </div>
          )}
          <div className={classes.untilNowCheckbox}>
            <label htmlFor="until_now">Until Now</label>
            <input
              type="checkbox"
              id="until_now"
              name="until_now"
              onChange={showEndDateHandler}
              checked={education.educationEndDate === "Present"}
            />
          </div>
        </div>
        <div></div>
        <div>
          <div>
            <div className={classes.educationContent}>
              <div className={classes.educationControl}>
                <label htmlFor="educationTitle">Education Title</label>
                <input
                  className={educationTitleClasses}
                  value={education.educationTitle}
                  name="educationTitle"
                  onChange={educationChangeHandler}
                  onBlur={blurHandler}
                  type="text"
                  id="educationTitle"
                />
                {errors.educationTitle && (
                  <p className={classes.errorMessage}>
                    {errors.educationTitle}
                  </p>
                )}
              </div>

              <div className={classes.educationControl}>
                <label htmlFor="educationInstituteName">Institute Name</label>
                <input
                  className={educationInstituteNameClasses}
                  value={education.educationInstituteName}
                  name="educationInstituteName"
                  onChange={educationChangeHandler}
                  onBlur={blurHandler}
                  type="text"
                  id="educationInstituteName"
                />
                {errors.educationInstituteName && (
                  <p className={classes.errorMessage}>
                    {errors.educationInstituteName}
                  </p>
                )}
              </div>
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
