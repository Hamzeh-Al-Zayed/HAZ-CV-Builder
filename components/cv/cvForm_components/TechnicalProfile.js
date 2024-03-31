import { Fragment, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import classes from "./TechnicalProfile.module.css";

const TechnicalSkills = (props) => {
  const [currentTechnicalSkills, setCurrentTechnicalSkills] = useState([]);

  const technicalSkillsChangeHandler = (event) => {
    setCurrentTechnicalSkills(event.target.value);
  };

  const MAX_TECHNICALSKILLS = 12;

  const addTechnicalSkills = (event) => {
    event.preventDefault();
    if (!currentTechnicalSkills.trim()) return;

    if (
      props.technicalSkills &&
      props.technicalSkills.length >= MAX_TECHNICALSKILLS
    ) {
      alert(`You can add no more than ${MAX_TECHNICALSKILLS} Skills`);
      return;
    }

    props.setFormData((prevFormData) => ({
      ...prevFormData,
      technicalSkills: [
        ...prevFormData.technicalSkills,
        currentTechnicalSkills,
      ],
    }));
    setCurrentTechnicalSkills("");
  };

  const removeTechnicalSkills = (indexToRemove) => {
    props.setFormData((prevFormData) => ({
      ...prevFormData,
      technicalSkills: prevFormData.technicalSkills.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  return (
    <Fragment>
      <h2>Technical Profile</h2>
      <div className={classes.technicalControl}>
        <label htmlFor="technicalSkills">Technical Skills</label>
        <input
          value={currentTechnicalSkills}
          onChange={technicalSkillsChangeHandler}
          type="text"
          maxLength={40}
        ></input>
        <CiCirclePlus
          className={classes.addMoreSkills}
          onClick={addTechnicalSkills}
        />
      </div>

      <ul className={classes.technicalUl}>
        {props.technicalSkills &&
          props.technicalSkills.map((skill, index) => (
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
