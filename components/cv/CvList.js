import classes from "./CvList.module.css";
import CvItem from "./CvItem";

const CvList = (props) => {
  return (
    <ul className={classes.list}>
      {props.cvs.map((cv) => (
        <CvItem
          key={cv.id}
          id={cv.id}
          image={cv.image}
          name={cv.name}
          job_title={cv.job_title}
          email={cv.email}
        ></CvItem>
      ))}
    </ul>
  );
};
export default CvList;
