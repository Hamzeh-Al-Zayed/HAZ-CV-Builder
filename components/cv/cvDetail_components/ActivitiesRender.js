import classes from "./ActivitiesRender.module.css";

const ActivitiesRender = (props) => {
  return (
    <div className={classes.activity}>
      <li>
        <span>Activities:</span>
      </li>
      <div className={classes.activityContainer}>
        <div className={classes.activity_Leftside}>
          {props.activities &&
            props.activities.map((activity, index) => (
              <div key={index}>
                <div>
                  <p>{activity.activityStartDate}</p>
                </div>
                <div>
                  <p>{activity.activityEndDate}</p>
                </div>
              </div>
            ))}
        </div>
        <div className={classes.activity_Rightside}>
          <ul>
            {props.activities &&
              props.activities.map((activity, index) => (
                <li key={index}>
                  <h2>{activity.activityName}</h2>
                  <p>{activity.activityInstituteName}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesRender;
