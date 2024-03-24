import classes from "./NoteModal.module.css";

const NoteModal = (props) => {
  return (
    <div className={classes.noteModal}>
      <h2> Read Please !</h2>
      <h3>
        Please Insert the Information of the last 3 previous Jobs you had.
      </h3>
      <h3>
        PS: you don't need to fill them all if you didn't work up to 3 Jobs
      </h3>
      <button onClick={props.onClick}>Ok Understood!</button>
    </div>
  );
};

export default NoteModal;
