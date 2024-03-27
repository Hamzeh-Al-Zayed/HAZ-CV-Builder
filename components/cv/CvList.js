import classes from "./CvList.module.css";
import CvItem from "./CvItem";

const CvList = (props) => {
  return (
    <ul className={classes.list}>
      {props.cvs.map((cv) => (
        <CvItem key={cv.id} id={cv.id} profiles={cv.profiles}></CvItem>
      ))}
    </ul>
  );
};
export default CvList;
