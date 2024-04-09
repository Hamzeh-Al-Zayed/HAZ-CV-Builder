import React, { useState, Fragment, useEffect } from "react";
import classes from "./Contacts.module.css";

const Contacts = ({ setFormData, initialContact }) => {
  const [contact, setContact] = useState(
    initialContact || {
      address: "",
      phone_Number: "",
      linkedIn: "",
      portfolio: "",
      gitHub: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    setFormData((prevFromData) => ({
      ...prevFromData,
      contacts: [contact],
    }));
  }, [contact, setFormData]);

  const validateInput = (name, value) => {
    switch (name) {
      case "address":
        return value.trim().length === 0 ? "address cannot be empty" : "";
      case "phone_Number":
        if (value.trim().length === 0) {
          return "Phone Number cannot be empty";
        } else if (value !== "+" && !/^\+?[0-9]*$/.test(value)) {
          return "Input must start with an optional plus sign followed by numbers only.";
        } else if (value.trim().length > 16) {
          return "Phone Number can only contain up to 15 number";
        } else {
          return "";
        }
      case "linkedIn":
        if (!/^https?:\/\/.+\..+/.test(value)) {
          return "Please enter a valid URL.";
        } else {
          return "";
        }
      case "portfolio":
        if (!/^https?:\/\/.+\..+/.test(value)) {
          return "Please enter a valid URL.";
        } else {
          return "";
        }
      case "gitHub":
        if (!/^https?:\/\/.+\..+/.test(value)) {
          return "Please enter a valid URL.";
        } else {
          return "";
        }
    }
  };

  const contactsChangeHandler = (event) => {
    const { name, value } = event.target;
    const error = validateInput(name, value);
    setContact((prevContact) => ({
      ...prevContact,
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
    if (initialContact && Object.keys(initialContact).length) {
      setContact(initialContact);
    }
  }, [initialContact]);

  useEffect(() => {
    const allFieldsFilled = Object.values(contact).every(
      (value) => typeof value === "string" && value.trim() !== ""
    );
    const hasNoError = Object.values(errors).every((error) => error === "");
    setShowDone(allFieldsFilled && hasNoError);
  }, [contact, errors]);

  const addressClasses = errors.address
    ? classes.controlErrorInput
    : classes.controlInput;

  const phone_NumberClasses = errors.phone_Number
    ? classes.controlErrorInput
    : classes.controlInput;

  const linkedInClasses = errors.linkedIn
    ? classes.linkErrorInput
    : classes.linkInput;

  const portfolioClasses = errors.portfolio
    ? classes.linkErrorInput
    : classes.linkInput;

  const gitHubClasses = errors.gitHub
    ? classes.linkErrorInput
    : classes.linkInput;

  return (
    <Fragment>
      <h2>Contact:</h2>
      <div className={classes.content}>
        <address className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            className={addressClasses}
            required
            type="text"
            id="address"
            value={contact.address}
            name="address"
            onChange={contactsChangeHandler}
            onBlur={blurHandler}
          />
          {errors.address && (
            <p className={classes.errorMessage}>{errors.address}</p>
          )}
        </address>

        <div className={classes.control}>
          <label htmlFor="phone_Number">Phone Number</label>
          <input
            className={phone_NumberClasses}
            required
            type="tel"
            id="phone_Number"
            value={contact.phone_Number}
            name="phone_Number"
            onChange={contactsChangeHandler}
            onBlur={blurHandler}
          />
          {errors.phone_Number && (
            <p className={classes.errorMessage}>{errors.phone_Number}</p>
          )}
        </div>
      </div>

      <div className={classes.link}>
        <label htmlFor="linkedIn">LinkedIn Profile URL</label>
        <input
          className={linkedInClasses}
          type="url"
          id="linkedIn"
          value={contact.linkedIn}
          name="linkedIn"
          onChange={contactsChangeHandler}
          placeholder="Insert a link here 'Optional'"
        ></input>
        {errors.linkedIn && (
          <p className={classes.errorMessage}>{errors.linkedIn}</p>
        )}
      </div>

      <div className={classes.link}>
        <label htmlFor="portfolio">Portfolio URL</label>
        <input
          className={portfolioClasses}
          type="url"
          id="portfolio"
          value={contact.portfolio}
          name="portfolio"
          onChange={contactsChangeHandler}
          placeholder="Insert a link here 'Optional'"
        ></input>
        {errors.portfolio && (
          <p className={classes.errorMessage}>{errors.portfolio}</p>
        )}
      </div>

      <div className={classes.link}>
        <label htmlFor="gitHub">GitHub URL</label>
        <input
          className={gitHubClasses}
          type="url"
          id="gitHub"
          value={contact.gitHub}
          name="gitHub"
          onChange={contactsChangeHandler}
          placeholder="Insert a link here 'Optional'"
        ></input>
        {errors.gitHub && (
          <p className={classes.errorMessage}>{errors.gitHub}</p>
        )}
      </div>

      {!showDone && <p className={classes.done}>Done Contacts Updated!</p>}
    </Fragment>
  );
};

export default Contacts;
