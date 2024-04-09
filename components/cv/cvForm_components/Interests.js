import { Fragment, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import classes from "./Interests.module.css";

const Interests = ({ setFormData, initialInterests }) => {
  const [interests, setInterests] = useState(initialInterests);
  const [currentInterests, setCurrentInterests] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      interests: interests,
    }));
  }, [interests, setFormData]);

  const validateInput = (interest) => {
    if (!interest.trim()) {
      return "Interest cannot be empty.";
    }
    if (interest.length > 65) {
      return "Interest cannot be more than 65 characters.";
    }

    return "";
  };

  const interestsChangeHandler = (event) => {
    const interest = event.target.value;
    const validationError = validateInput(interest);
    setCurrentInterests(interest);
    setErrors(validationError);
  };

  const blurHandler = (event) => {
    const validationError = validateInput(currentInterests);
    setErrors(validationError);
  };

  const MAX_INTERESTS = 6;

  const addInterests = (event) => {
    event.preventDefault();
    const validationError = validateInput(currentInterests);
    if (validationError) {
      setErrors(validationError);
      return;
    }
    if (!currentInterests.trim()) return;

    if (interests.length >= MAX_INTERESTS) {
      alert(`You can add no more than ${MAX_INTERESTS} Interests`);
      return;
    }
    setInterests((prevInterests) => [...prevInterests, currentInterests]);
    setCurrentInterests("");
    setErrors("");
  };

  const removeInterests = (indexToRemove) => {
    setInterests((prevInterests) =>
      prevInterests.filter((_, index) => index !== indexToRemove)
    );
  };

  const interestClasses = errors
    ? classes.interestControlErrorInput
    : classes.interestControlInput;

  return (
    <Fragment>
      <h2>Interests:</h2>
      <div className={classes.interestControl}>
        <label htmlFor="interests">Interests</label>
        <input
          className={interestClasses}
          value={currentInterests}
          onChange={interestsChangeHandler}
          onBlur={blurHandler}
          type="text"
        ></input>
        <CiCirclePlus className={classes.addInterests} onClick={addInterests} />
      </div>
      {errors && <p className={classes.errorMessage}>{errors}</p>}
      <ul className={classes.interestUl}>
        {interests.map((interest, index) => (
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
