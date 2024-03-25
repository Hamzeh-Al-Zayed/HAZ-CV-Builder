import React, { useState, Fragment } from "react";
import classes from "./Contacts.module.css";
import { CiCirclePlus } from "react-icons/ci";

const Contacts = ({ setFormData }) => {
  const [contact, setContact] = useState({
    address: "",
    phone_Number: "",
    linkedIn: "",
    portfolio: "",
    gitHub: "",
  });

  const [contacts, setContacts] = useState([]);

  const [showDone, setShowDone] = useState(false);

  const contactsChangeHandler = (event) => {
    const { name, value } = event.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };
  const MAX_CONTACTS = 1;

  const addContact = (event) => {
    event.preventDefault();
    if (contacts.length >= MAX_CONTACTS) {
      alert(`You can add no more than ${MAX_CONTACTS} educations.`);
      return;
    }
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);

    setFormData((prevFormData) => ({
      ...prevFormData,
      contacts: updatedContacts,
    }));
    setShowDone(true);
  };

  return (
    <Fragment>
      <h2>Contact:</h2>
      <div className={classes.content}>
        <address className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={contact.address}
            name="address"
            onChange={contactsChangeHandler}
          ></input>
        </address>

        <div className={classes.control}>
          <label htmlFor="phone_Number">Phone Number</label>
          <input
            type="tel"
            id="phone_Number"
            value={contact.phone_Number}
            name="phone_Number"
            onChange={contactsChangeHandler}
          ></input>
        </div>
      </div>

      <div className={classes.image}>
        <label htmlFor="linkedIn">LinkedIn Profile URL</label>
        <input
          type="url"
          id="linkedIn"
          value={contact.linkedIn}
          name="linkedIn"
          onChange={contactsChangeHandler}
        ></input>
      </div>

      <div className={classes.image}>
        <label htmlFor="portfolio">Portfolio URL</label>
        <input
          type="url"
          id="portfolio"
          value={contact.portfolio}
          name="portfolio"
          onChange={contactsChangeHandler}
        ></input>
      </div>

      <div className={classes.image}>
        <label htmlFor="gitHub">GitHub URL</label>
        <input
          type="url"
          id="gitHub"
          value={contact.gitHub}
          name="gitHub"
          onChange={contactsChangeHandler}
        ></input>
      </div>
      {!showDone && (
        <CiCirclePlus className={classes.addMore} onClick={addContact} />
      )}
      {showDone && <p className={classes.done}>Done!</p>}
    </Fragment>
  );
};

export default Contacts;
