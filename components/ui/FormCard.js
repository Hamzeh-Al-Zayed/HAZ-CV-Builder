import classes from "./FormCard.module.css";

const FormCard = (props) => {
  return <div className={classes["form-card"]}>{props.children}</div>;
};

export default FormCard;
