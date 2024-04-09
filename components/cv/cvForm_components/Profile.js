import { Fragment, useEffect, useState } from "react";
import classes from "./Profile.module.css";

const Profile = ({ setFormData, initialProfile }) => {
  const [profile, setProfile] = useState(
    initialProfile || {
      image: "",
      name: "",
      job_title: "",
      email: "",
      selfSummary: "",
      birthday: "",
    }
  );

  // const [profiles, setProfiles] = useState(initialProfiles);
  const [errors, setErrors] = useState({});
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profiles: [profile],
    }));
  }, [profile, setFormData]);

  const validateInput = (name, value) => {
    switch (name) {
      case "image":
        if (value.trim().length === 0) {
          return "Image Link cannot be empty";
        } else if (!/^https?:\/\/.+\..+/.test(value)) {
          return "Please enter a valid URL.";
        } else {
          return "";
        }
      case "name":
        if (value.trim().length === 0) {
          return "Name cannot be empty";
        } else if (!/^[A-Za-z ]+$/.test(value)) {
          return "Name can only include letters";
        } else if (value.trim().length > 21) {
          return "Name can only contain up to 20 letters";
        } else {
          return "";
        }
      case "email":
        if (value.trim().length === 0) {
          return "Email cannot be empty";
        } else if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
        else if (value.trim().length > 29) {
          return "Email can only contain up to 28 character";
        } else {
          return "";
        }
      case "job_title":
        if (value.trim().length === 0) {
          return "Job Title cannot be empty";
        } else if (!/^[A-Za-z0-9 /-]+$/.test(value)) {
          return "Input can only include letters, numbers, and spaces";
        } else if (value.trim().length > 21) {
          return "Job Title can only contain up to 20 character";
        } else {
          return "";
        }
      case "birthday":
        return value.trim().length === 0 ? "Birthday cannot be empty" : "";
      case "selfSummary":
        if (value.trim().length === 0) {
          return "Self Summary cannot be empty";
        } else if (value.trim().length > 600) {
          return "Self Summary can only contain up to 600 character";
        } else {
          return "";
        }
      default:
        return "";
    }
  };

  const profileChangeHandler = (event) => {
    const { name, value } = event.target;
    const error = validateInput(name, value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const blurHandler = (event) => {
    const { name, value } = event.target;
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  useEffect(() => {
    // Check if initialProfile is not empty or undefined
    if (initialProfile && Object.keys(initialProfile).length) {
      setProfile(initialProfile);
    }
  }, [initialProfile]);

  useEffect(() => {
    const allFieldsFilled = Object.values(profile).every(
      (value) => typeof value === "string" && value.trim() !== ""
    );
    const hasNoError = Object.values(errors).every((error) => error === "");
    setShowDone(allFieldsFilled && hasNoError);
  }, [profile, errors]);

  const imageClasses = errors.image
    ? classes.imageErrorInput
    : classes.imageInput;

  const nameClasses = errors.name
    ? classes.controlErrorInput
    : classes.controlInput;

  const job_titleClasses = errors.job_title
    ? classes.controlErrorInput
    : classes.controlInput;

  const birthdayClasses = errors.birthday
    ? classes.controlErrorInput
    : classes.controlInput;

  const selfSummaryClasses = errors.selfSummary
    ? classes.textareaBoxErrorInput
    : classes.textareaBox;

  return (
    <Fragment>
      <h2>Pesonal Information:</h2>
      <div className={classes.image}>
        <label htmlFor="image">Upload Image URL</label>
        <input
          className={imageClasses}
          type="url"
          required
          id="image"
          value={profile.image}
          name="image"
          onChange={profileChangeHandler}
          onBlur={blurHandler}
          accept="image/*"
          placeholder="Insert a link here"
        />
        {errors.image && <p className={classes.errorMessage}>{errors.image}</p>}
      </div>
      <div className={classes.content}>
        <div className={classes.control}>
          <label htmlFor="name">Full Name</label>
          <input
            className={nameClasses}
            type="text"
            required
            id="name"
            value={profile.name}
            name="name"
            onChange={profileChangeHandler}
            onBlur={blurHandler}
          />
          {errors.name && <p className={classes.errorMessage}>{errors.name}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="job_title">Job Title</label>
          <input
            className={job_titleClasses}
            type="text"
            required
            id="job_title"
            value={profile.job_title}
            name="job_title"
            onChange={profileChangeHandler}
            onBlur={blurHandler}
          />
          {errors.job_title && (
            <p className={classes.errorMessage}>{errors.job_title}</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            className={
              errors.email ? classes.controlErrorInput : classes.controlInput
            }
            type="email"
            required
            id="email"
            value={profile.email}
            name="email"
            onChange={profileChangeHandler}
            onBlur={blurHandler}
          />
          {errors.email && (
            <p className={classes.errorMessage}>{errors.email}</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="birthday">BirthDay</label>
          <input
            className={birthdayClasses}
            type="date"
            required
            id="birthday"
            value={profile.birthday}
            name="birthday"
            onChange={profileChangeHandler}
            onBlur={blurHandler}
          />
          {errors.birthday && (
            <p className={classes.errorMessage}>{errors.birthday}</p>
          )}
        </div>
      </div>
      <div className={classes.textarea}>
        <label className={classes.textarealabel} htmlFor="summary">
          Self Summary
        </label>
        <textarea
          required
          id="summary"
          rows="9"
          value={profile.selfSummary}
          name="selfSummary"
          onChange={profileChangeHandler}
          className={selfSummaryClasses}
          onBlur={blurHandler}
        />
        {errors.selfSummary && (
          <p className={classes.errorMessage}>{errors.selfSummary}</p>
        )}
      </div>
      {/* {!showDone && (
        <CiCirclePlus className={classes.addMoreProfile} onClick={addProfile} />
      )} */}
      {showDone && <p className={classes.done}>Done Profile Updated!</p>}
    </Fragment>
  );
};

export default Profile;
