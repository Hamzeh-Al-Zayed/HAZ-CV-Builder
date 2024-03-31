import { Fragment, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import classes from "./Interests.module.css";

const Interests = (props) => {
  const [currentInterests, setCurrentInterests] = useState([]);

  const interestsChangeHandler = (event) => {
    setCurrentInterests(event.target.value);
  };

  const MAX_INTERESTS = 6;

  const addInterests = (event) => {
    event.preventDefault();
    if (!currentInterests.trim()) return;

    if (props.interests && props.interests.length >= MAX_INTERESTS) {
      alert(`You can add no more than ${MAX_INTERESTS} Interests`);
      return;
    }
    props.setFormData((prevFormData) => ({
      ...prevFormData,
      interests: [...prevFormData.interests, currentInterests],
    }));
    setCurrentInterests("");
  };

  const removeInterests = (indexToRemove) => {
    props.setFormData((prevFormData) => ({
      ...prevFormData,
      interests: prevFormData.interests.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  return (
    <Fragment>
      <h2>Interests</h2>
      <div className={classes.interestControl}>
        <label htmlFor="interests">Interests</label>
        <input
          value={currentInterests}
          onChange={interestsChangeHandler}
          type="text"
          maxLength={40}
        ></input>
        <CiCirclePlus className={classes.addInterests} onClick={addInterests} />
      </div>
      <ul className={classes.interestUl}>
        {props.interests &&
          props.interests.map((interest, index) => (
            <li key={index}>
              <h3 className={classes.displayedH3}>
                - {interest}
                <MdCancel
                  className={classes.removeInterests}
                  onClick={() => removeInterests(index)}
                />
              </h3>
            </li>
          ))}
      </ul>
    </Fragment>
  );
};

export default Interests;
