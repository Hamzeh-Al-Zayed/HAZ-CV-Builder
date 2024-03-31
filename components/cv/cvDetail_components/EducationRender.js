import classes from "./EducationRender.module.css";

const EducationRender = (props) => {
  return (
    <div className={classes.education}>
      <li>
        <span>Education:</span>
      </li>
      <div className={classes.educationContainer}>
        <div className={classes.education_Leftside}>
          {props.educations &&
            props.educations.map((education, index) => (
              <div key={index}>
                <div>
                  <p>{education.educationStartDate}</p>
                </div>
                <div>
                  <p>{education.educationEndDate}</p>
                </div>
              </div>
            ))}
        </div>
        <div className={classes.education_Rightside}>
          <ul>
            {props.educations &&
              props.educations.map((education, index) => (
                <li key={index}>
                  <h2>{education.educationTitle}</h2>
                  <p>{education.educationInstituteName}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EducationRender;
