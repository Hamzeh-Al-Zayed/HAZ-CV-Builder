import { Fragment, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import classes from "./TechnicalProfile.module.css";

const TechnicalSkills = ({ setFormData, initialTechnicalSkills = [] }) => {
  const [technicalSkills, setTechnicalSkills] = useState(
    initialTechnicalSkills
  );
  const [currentTechnicalSkills, setCurrentTechnicalSkills] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      technicalSkills: technicalSkills,
    }));
  }, [setFormData, technicalSkills]);

  const validateInput = (skill) => {
    if (!skill.trim()) {
      return "Technical Skill cannot be empty.";
    }
    if (skill.length > 35) {
      return "Technical Skill cannot be more than 35 characters.";
    }
    if (!/^[A-Za-z0-9 /-]+$/.test(skill)) {
      return "Technical Skill can only include letters, numbers, spaces, slashes, and dashes.";
    }
    return "";
  };
  const technicalSkillsChangeHandler = (event) => {
    const technicalSkill = event.target.value;
    const validateError = validateInput(technicalSkill);
    setCurrentTechnicalSkills(technicalSkill);
    setErrors(validateError);
  };

  const blurHandler = () => {
    const validationError = validateInput(currentTechnicalSkills);
    setErrors(validationError);
  };

  const MAX_TECHNICALSKILLS = 12;

  const addTechnicalSkills = (event) => {
    event.preventDefault();

    if (technicalSkills.length >= MAX_TECHNICALSKILLS) {
      alert(`You can add no more than ${MAX_TECHNICALSKILLS} Skills`);
      return;
    }

    const validationError = validateInput(currentTechnicalSkills);
    if (validationError) {
      setErrors(validationError);
      return;
    }
    if (!currentTechnicalSkills.trim()) return;

    setTechnicalSkills((prevTechnicalSkills) => [
      ...prevTechnicalSkills,
      currentTechnicalSkills,
    ]);
    setCurrentTechnicalSkills("");
    setErrors("");
  };

  const removeTechnicalSkills = (indexToRemove) => {
    setTechnicalSkills((prevTechnicalSkills) =>
      prevTechnicalSkills.filter((_, index) => index !== indexToRemove)
    );
  };

  const technicalSkillsClasses = errors
    ? classes.technicalControlErrorInput
    : classes.technicalControlInput;

  return (
    <Fragment>
      <h2>Technical Profile:</h2>
      <div className={classes.technicalControl}>
        <label htmlFor="technicalSkills">Technical Skills</label>
        <input
          className={technicalSkillsClasses}
          value={currentTechnicalSkills}
          onChange={technicalSkillsChangeHandler}
          onBlur={blurHandler}
          type="text"
        ></input>
        <CiCirclePlus
          className={classes.addMoreSkills}
          onClick={addTechnicalSkills}
        />
      </div>
      {errors && <p className={classes.errorMessage}>{errors}</p>}
      <ul className={classes.technicalUl}>
        {technicalSkills.map((skill, index) => (
          <li key={index}>
            <h3 className={classes.displayedH3}>
              - {skill}
              <MdCancel
                className={classes.removeSkill}
                onClick={() => removeTechnicalSkills(index)}
              />
            </h3>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default TechnicalSkills;
