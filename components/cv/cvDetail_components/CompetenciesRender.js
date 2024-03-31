import classes from "./CompetenciesRender.module.css";

const CompetenciesRender = (props) => {
  return (
    <div className={classes.competencies}>
      <li>
        <span>Competencies</span>
      </li>
      <div className={classes.competenciesContainer}>
        <ul className={classes.competenciesList}>
          {props.competencies &&
            props.competencies.map((competence, index) => (
              <li key={index} className={classes.competenciesLi}>
                <p>{competence}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CompetenciesRender;
