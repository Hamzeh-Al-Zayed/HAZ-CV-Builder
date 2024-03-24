import classes from "./CvCard.module.css";

const CvCard = (props) => {
  return <div className={classes.cvcard}>{props.children}</div>;
};

export default CvCard;
