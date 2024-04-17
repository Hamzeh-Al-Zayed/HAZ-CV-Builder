import classes from "./Card.module.css";

const Card = (props) => {
  // Append any additional classes passed via props.className
  const classNames = `${classes.card} ${props.className || ""}`.trim();

  return <div className={classNames}>{props.children}</div>;
};

export default Card;
