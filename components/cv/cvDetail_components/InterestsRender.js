import classes from "./InterestsRender.module.css";

const InterestsRender = (props) => {
  return (
    <div className={classes.interests}>
      <li>
        <span>Interests</span>
      </li>
      <div className={classes.interestsContainer}>
        <ul className={classes.interestsList}>
          {props.interests &&
            props.interests.map((interest, index) => (
              <li key={index}>
                <p>{interest}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default InterestsRender;
