import classes from "./ConfirmDeletePopup.module.css";
import DeleteCv from "@/pages/delete-cv";

const ConfirmDeletePopup = (props) => {
  return (
    <div className={classes.confirmDelete}>
      <h2> Are you sure ?</h2>
      <DeleteCv cvId={props.cvId} onClick={props.onClick} />
      <button onClick={props.onClick}>Cancel</button>
    </div>
  );
};

export default ConfirmDeletePopup;
