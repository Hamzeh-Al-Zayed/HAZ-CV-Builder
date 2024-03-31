import { Fragment, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import classes from "./Competencies.module.css";

const Competencies = (props) => {
  const [currentCompetence, setCurrentCompetence] = useState([]);

  const competenciesChangeHandler = (event) => {
    setCurrentCompetence(event.target.value);
  };

  const MAX_COMPETENCIES = 12;

  const addCompetencies = (event) => {
    event.preventDefault();
    if (!currentCompetence.trim()) return;

    if (props.competencies && props.competencies.length >= MAX_COMPETENCIES) {
      alert(`You can add no more than ${MAX_COMPETENCIES} Competencies `);
      return;
    }

    props.setFormData((prevFormData) => ({
      ...prevFormData,
      competencies: [...prevFormData.competencies, currentCompetence],
    }));
    setCurrentCompetence("");
  };

  const removeCompetencies = (indexToRemove) => {
    props.setFormData((prevFormData) => ({
      ...prevFormData,
      competencies: prevFormData.competencies.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  return (
    <Fragment>
      <h2>Competencies</h2>
      <div className={classes.competenciesControl}>
        <label htmlFor="competencies">Competencies</label>
        <input
          value={currentCompetence}
          onChange={competenciesChangeHandler}
          type="text"
          maxLength={40}
        ></input>
        <CiCirclePlus
          className={classes.addMoreCompetence}
          onClick={addCompetencies}
        />
      </div>

      <ul className={classes.competenceUl}>
        {props.competencies &&
          props.competencies.map((competence, index) => (
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
