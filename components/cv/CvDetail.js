import { Fragment, useEffect } from "react";
import CvCard from "../ui/CvCard";

import classes from "./CvDetail.module.css";
import { FaLocationDot, FaSquarePhone } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

const CvDetail = (props) => {
  //   const [showAddressData, setShowAddressData] = useState(false);

  // const contact_address = props.contacts

  //   useEffect(() => {
  //     if (props.address !== "") {
  //       setShowAddressData(true);
  //     }
  //   }, []);

  console.log(props);
  return (
    <Fragment>
      <CvCard>
        <div className={classes.leftSection}>
          <div className={classes.contactContent}>
            <li>
              <span>Contact</span>
            </li>
            <ul className={classes.contactDataUl}>
              <div className={classes.contactData}>
                <IoMailSharp className={classes.contactIcon} /> {props.email}
              </div>
              {props.contacts &&
                props.contacts.map((contact, index) => (
                  <div key={index}>
                    <div className={classes.contactData}>
                      <FaLocationDot className={classes.contactIcon} />{" "}
                      {contact.address}
                    </div>

                    <div className={classes.contactData}>
                      <FaSquarePhone className={classes.contactIcon} />{" "}
                      {contact.phone_Number}
                    </div>
                    <div className={classes.contactData}>
                      <FaLinkedin className={classes.contactIcon} />{" "}
                      <a href={contact.linkedIn} target="_blank">
                        LinkedIn
                      </a>
                    </div>
                    <div className={classes.contactData}>
                      <BsFillBriefcaseFill className={classes.contactIcon} />{" "}
                      <a href={contact.portfolio} target="_blank">
                        Portfolio
                      </a>
                    </div>
                    <div className={classes.contactData}>
                      <FaGithub className={classes.contactIcon} />{" "}
                      <a href={contact.gitHub} target="_blank">
                        GitHub
                      </a>
                    </div>
                  </div>
                ))}
            </ul>
          </div>
        </div>

        <div className={classes.rightSection}>
          <div>
            <div className={classes.profileContent}>
              <img
                className={classes.image}
                src={props.image}
                alt="The Clint image"
                width={50}
                height={50}
              ></img>
              <div className={classes.text}>
                <h2>{props.name}</h2>
                <h3>{props.job_title}</h3>
              </div>
            </div>
            <div className={classes.selfSummary}>
              <p>{props.selfSummary}</p>
            </div>
          </div>

          <div className={classes.jobHistory}>
            <li>
              <span>Work History</span>
            </li>
            <div className={classes.jobHistoryContainer}>
              <div className={classes.jobHistory_Leftside}></div>
              <div className={classes.jobHistory_Rightside}>
                <ul>
                  {props.jobs &&
                    props.jobs.map((job, index) => (
                      <li key={index}>
                        <h2>{job.jobTitle}</h2>
                        <div className={classes.jobHistoryDate} key={index}>
                          <p>{job.jobStartDate}</p>

                          <p>{job.jobEndDate}</p>
                        </div>
                        <p>{job.companyName}</p>
                        <p>{job.jobDescription}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CvCard>

      <CvCard>
        <div className={classes.leftSection}></div>
        <div className={classes.rightSection}>
          <div className={classes.coursesCertificates}>
            <li>
              <span>Courses / Certificates</span>
            </li>
            <div className={classes.coursesCertificatesContainer}>
              <div className={classes.coursesCertificates_Leftside}></div>
              <div className={classes.coursesCertificates_Rightside}>
                <ul className={classes.coursesCertificatesList}>
                  {props.courses_Certificates &&
                    props.courses_Certificates.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={classes.education}>
            <li>
              <span>Education:</span>
            </li>
            <div className={classes.educationContainer}>
              <div className={classes.education_Leftside}>
                {props.educations &&
                  props.educations.map((education, index) => (
                    <div key={index}>
                      <div>
                        <p>{education.educationStartDate}</p>
                      </div>
                      <div>
                        <p>{education.educationEndDate}</p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className={classes.education_Rightside}>
                <ul>
                  {props.educations &&
                    props.educations.map((education, index) => (
                      <li key={index}>
                        <h2>{education.educationTitle}</h2>
                        <p>{education.educationInstituteName}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={classes.project}>
            <li>
              <span>Projects:</span>
            </li>
            <div className={classes.projectContainer}>
              <div className={classes.project_Leftside}></div>
              <div className={classes.project_Rightside}>
                <ul>
                  {props.projects &&
                    props.projects.map((project, index) => (
                      <li key={index}>
                        <h2>{project.projectTitle}</h2>
                        <p>
                          {project.projectDescription} - {""}
                          <a
                            href={project.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Project Link
                          </a>
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CvCard>
    </Fragment>
  );
};

export default CvDetail;
