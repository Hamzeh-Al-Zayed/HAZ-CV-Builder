import { FaLocationDot, FaSquarePhone } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import classes from "./ContactsRender.module.css";

const ContactsRender = (props) => {
  return (
    <div className={classes.contactContent}>
      <li>
        <span>Contact</span>
      </li>
      <ul className={classes.contactDataUl}>
        {props.profiles &&
          props.profiles.map((profile, index) => (
            <div key={index} className={classes.contactData}>
              <IoMailSharp className={classes.contactIcon} /> {profile.email}
            </div>
          ))}
        {props.contacts &&
          props.contacts.map((contact, index) => (
            <div key={index}>
              {contact.address && (
                <div className={classes.contactData}>
                  <FaLocationDot className={classes.contactIcon} />{" "}
                  {contact.address}
                </div>
              )}

              {contact.phone_Number && (
                <div className={classes.contactData}>
                  <FaSquarePhone className={classes.contactIcon} />{" "}
                  {contact.phone_Number}
                </div>
              )}

              {contact.linkedIn && (
                <div className={classes.contactData}>
                  <FaLinkedin className={classes.contactIcon} />{" "}
                  <a href={contact.linkedIn} target="_blank">
                    LinkedIn
                  </a>
                </div>
              )}

              {contact.portfolio && (
                <div className={classes.contactData}>
                  <BsFillBriefcaseFill className={classes.contactIcon} />{" "}
                  <a href={contact.portfolio} target="_blank">
                    Portfolio
                  </a>
                </div>
              )}
              {contact.gitHub && (
                <div className={classes.contactData}>
                  <FaGithub className={classes.contactIcon} />{" "}
                  <a href={contact.gitHub} target="_blank">
                    GitHub
                  </a>
                </div>
              )}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default ContactsRender;
