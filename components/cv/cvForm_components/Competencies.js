import { Fragment, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import classes from "./Competencies.module.css";

const Competencies = ({ setFormData, initialCompetencies = [] }) => {
  const [competencies, setCompetencies] = useState(initialCompetencies);
  const [currentCompetence, setCurrentCompetence] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      competencies: competencies,
    }));
  }, [competencies, setFormData]);

  const validateInput = (competence) => {
    if (!competence.trim()) {
      return "Competencies cannot be empty.";
    }
    if (competence.length > 35) {
      return "Competencies cannot be more than 35 characters.";
    }

    return "";
  };
  const competenciesChangeHandler = (event) => {
    const competence = event.target.value;
    const validationError = validateInput(competence);
    setCurrentCompetence(competence);
    setErrors(validationError);
  };
  const blurHandler = (event) => {
    const validationError = validateInput(currentCompetence);
    setErrors(validationError);
  };

  const MAX_COMPETENCIES = 12;

  const addCompetencies = (event) => {
    event.preventDefault();
    const validationError = validateInput(currentCompetence);
    if (validationError) {
      setErrors(validationError);
      return;
    }
    if (!currentCompetence.trim()) return;

    if (competencies.length >= MAX_COMPETENCIES) {
      alert(`You can add no more than ${MAX_COMPETENCIES} Competencies `);
      return;
    }

    setCompetencies((prevCompetencies) => [
      ...prevCompetencies,
      currentCompetence,
    ]);
    setCurrentCompetence("");
    setErrors("");
  };

  const removeCompetencies = (indexToRemove) => {
    setCompetencies((prevCompetencies) =>
      prevCompetencies.filter((_, index) => index !== indexToRemove)
    );
  };

  const competenciesClasses = errors
    ? classes.competenciesControlErrorInput
    : classes.competenciesControlInput;

  return (
    <Fragment>
      <h2>Competencies:</h2>
      <div className={classes.competenciesControl}>
        <label htmlFor="competencies">Competencies</label>
        <input
          className={competenciesClasses}
          value={currentCompetence}
          onChange={competenciesChangeHandler}
          onBlur={blurHandler}
          type="text"
        ></input>
        <CiCirclePlus
          className={classes.addMoreCompetence}
          onClick={addCompetencies}
        />
      </div>
      {errors && <p className={classes.errorMessage}>{errors}</p>}
      <ul className={classes.competenceUl}>
        {competencies.map((competence, index) => (
          <li key={index}>
            <h3 className={classes.displayedH3}>
              - {competence}
              <MdCancel
                className={classes.removeCompetence}
                onClick={() => removeCompetencies(index)}
              />
            </h3>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
export default Competencies;
