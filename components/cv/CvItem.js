import Card from "../ui/Card";
import { useRouter } from "next/router";
import classes from "./CvItem.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { useState } from "react";
import ConfirmDeletePopup from "../ui/ConfirmDeletePopup";
import Backdrop from "../ui/Backdrop";

const CvItem = (props) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const router = useRouter();

  const editCvHandler = () => {
    router.push(`/edit-cv/${props.cvId}`);
  };

  const showDeleteConfirmationHandler = () => {
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationHandler = () => {
    setShowDeleteConfirmation(false);
  };

  const showDetialHandler = () => {
    router.push("/" + props.id);
  };

  return (
    <li className={classes.item}>
      <Card>
        {showDeleteConfirmation && (
          <ConfirmDeletePopup
            cvId={props.id}
            onClick={hideDeleteConfirmationHandler}
          />
        )}
        {showDeleteConfirmation && (
          <Backdrop onClick={hideDeleteConfirmationHandler} />
        )}
        {props.profiles &&
          props.profiles.map((profile, index) => (
            <div key={index} className={classes.content}>
              <img className={classes.image} src={profile.image}></img>
              <div className={classes.text}>
                <h2>{profile.name}</h2>
                <h3>{profile.job_title}</h3>
                <p>{profile.email}</p>
              </div>
              <div className={classes.iconDiv}>
                <RiEdit2Fill className={classes.icon} onClick={editCvHandler} />
                <FaTrashAlt
                  className={classes.icon}
                  onClick={showDeleteConfirmationHandler}
                />
              </div>
            </div>
          ))}
        <div className={classes.actions}>
          <button onClick={showDetialHandler}>Show CV</button>
        </div>
      </Card>
    </li>
  );
};

export default CvItem;
