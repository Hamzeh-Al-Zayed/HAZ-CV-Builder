import classes from "./ProdfileRender.module.css";

const ProdfileRender = (props) => {
  return (
    <div>
      {props.profiles &&
        props.profiles.map((profile, index) => (
          <div key={index}>
            <img
              className={classes.image}
              src={profile.image}
              alt="The Clint image"
              width={50}
              height={50}
            ></img>
            <div className={classes.text}>
              <h2>{profile.name}</h2>
              <h3>{profile.job_title}</h3>
            </div>

            <div className={classes.selfSummary}>
              <p>{profile.selfSummary}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProdfileRender;
