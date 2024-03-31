import classes from "./TechnicalProfileRender.module.css";

const TechnicalProfileRender = (props) => {
  return (
    <div className={classes.technicalSkills}>
      <li>
        <span> Technical Profile</span>
      </li>
      <div className={classes.technicalSkillsContainer}>
        <ul className={classes.technicalSkillsList}>
          {props.technicalSkills &&
            props.technicalSkills.map((skill, index) => (
              <li key={index} className={classes.technicalSkillsLi}>
                <p>{skill}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default TechnicalProfileRender;
