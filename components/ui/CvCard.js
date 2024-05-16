import classes from "./CvCard.module.css";
import React from "react";

const CvCard = React.forwardRef((props, ref) => {
  const classNames = `${classes.cvcard} ${props.className || ""}`.trim();

  return (
    <div ref={ref} className={classNames}>
      {props.children}
    </div>
  );
});

export default CvCard;
