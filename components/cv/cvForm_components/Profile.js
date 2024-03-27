import { Fragment, useState } from "react";
import classes from "./Profile.module.css";
import { CiCirclePlus } from "react-icons/ci";

const Profile = ({ setFormData }) => {
  const [profile, setProfile] = useState({
    image: "",
    name: "",
    job_title: "",
    email: "",
    selfSummary: "",
    birthday: "",
  });

  const [profiles, setProfiles] = useState([]);

  const [showDone, setShowDone] = useState(false);

  const profileChangeHandler = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const MAX_PROFILE = 1;

  const addProfile = () => {
    if (profiles.length >= MAX_PROFILE) {
      alert(`You can add no more than ${MAX_PROFILE} educations.`);
      return;
    }
    const updatedProfiles = [...profiles, profile];
    setProfiles(updatedProfiles);

    setFormData((prevFormData) => ({
      ...prevFormData,
      profiles: updatedProfiles,
    }));
    setShowDone(true);
  };

  return (
    <Fragment>
      <h2>Pesonal Information:</h2>
      <div className={classes.image}>
        <label htmlFor="image">Upload Image URL</label>
        <input
          type="url"
          required
          id="image"
          value={profile.image}
          name="image"
          onChange={profileChangeHandler}
          accept="image/*"
        ></input>
      </div>
      <div className={classes.content}>
        <div className={classes.control}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            required
            id="name"
            value={profile.name}
            name="name"
            onChange={profileChangeHandler}
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="job_title">Job Title</label>
          <input
            type="text"
            required
            id="job_title"
            value={profile.job_title}
            name="job_title"
            onChange={profileChangeHandler}
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            value={profile.email}
            name="email"
            onChange={profileChangeHandler}
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="birthday">BirthDay</label>
          <input
            type="date"
            required
            id="birthday"
            value={profile.birthday}
            name="birthday"
            onChange={profileChangeHandler}
          ></input>
        </div>
      </div>
      <div className={classes.textarea}>
        <label className={classes.textarealabel} htmlFor="summary">
          Self Summary
        </label>
        <textarea
          className={classes.textareaBox}
          required
          id="summary"
          rows="9"
          value={profile.selfSummary}
          name="selfSummary"
          onChange={profileChangeHandler}
          maxLength={300}
        ></textarea>
      </div>
      {!showDone && (
        <CiCirclePlus className={classes.addMoreProfile} onClick={addProfile} />
      )}
      {showDone && <p className={classes.done}>Done!</p>}
    </Fragment>
  );
};

export default Profile;
