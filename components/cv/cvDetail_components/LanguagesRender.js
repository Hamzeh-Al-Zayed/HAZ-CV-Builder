import classes from "./languagesRender.module.css";

const LanguagesRender = (props) => {
  console.log(props.languages);
  return (
    <div className={classes.languages}>
      <li>
        <span>Languages</span>
      </li>
      <div className={classes.languagesContainer}>
        <ul className={classes.languagesList}>
          {props.languages &&
            props.languages.map((languages, index) => (
              <li key={index} className={classes.languagesLi}>
                <p>
                  {languages.language}
                  {languages.level}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguagesRender;
