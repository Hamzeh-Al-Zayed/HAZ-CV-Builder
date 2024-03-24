import { Fragment } from "react";
import CvCard from "../ui/CvCard";

import classes from "./CvDetail.module.css";
import { FaLocationDot, FaSquarePhone } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const CvDetail = (props) => {
  console.log(props);
  return (
    <Fragment>
      <CvCard>
        <div className={classes.leftSection}>
          <div className={classes.contactContent}>
            <li>
              <span>Contact</span>
            </li>
            <div className={classes.contactData}>
              <FaLocationDot className={classes.contactIcon} /> {props.address}
            </div>
            <div className={classes.contactData}>
              <FaSquarePhone className={classes.contactIcon} />{" "}
              {props.phone_Number}
            </div>
            <div className={classes.contactData}>
              <IoMailSharp className={classes.contactIcon} /> {props.email}
            </div>
            <div className={classes.contactData}>
              <FaLinkedin className={classes.contactIcon} />{" "}
              <a href={props.linkedIn} target="_blank">
                LinkedIn
              </a>
            </div>
            <div className={classes.contactData}>
              <BsFillBriefcaseFill className={classes.contactIcon} />{" "}
              <a href={props.portfolio} target="_blank">
                Portfolio
              </a>
            </div>
            <div className={classes.contactData}>
              <FaGithub className={classes.contactIcon} />{" "}
              <a href={props.gitHub} target="_blank">
                GitHub
              </a>
            </div>
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
          {/* <div className={classes.workHistory}>
            <li>
              <span>Work History</span>
            </li>
            <div className={classes.workHistoryContainer}>
              <div className={classes.workHistory_Leftside}>
                <div>
                  <p>{props.first_Job_Start_Date}</p>
                </div>
                <div>
                  <p>{props.first_Job_End_Date}</p>
                </div>
              </div>
              <div className={classes.workHistory_Rightside}>
                <div>
                  <h2>{props.first_Job_Title}</h2>
                </div>
                <div>
                  <p>{props.first_Job_Company_Name}</p>
                </div>
                <div>
                  <p>{props.first_Job_Description}</p>
                </div>
              </div>
            </div>

            <div className={classes.workHistoryContainer}>
              <div className={classes.workHistory_Leftside}>
                <div>
                  <p>{props.second_Job_Start_Date}</p>
                </div>
                <div>
                  <p>{props.second_Job_End_Date}</p>
                </div>
              </div>
              <div className={classes.workHistory_Rightside}>
                <div>
                  <h2>{props.second_Job_Title}</h2>
                </div>
                <div>
                  <p>{props.second_Job_Company_Name}</p>
                </div>
                <div>
                  <p>{props.second_Job_Description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CvCard>

      <CvCard>
        <div className={classes.leftSection}>
          <h2>{props.birthday}</h2>
        </div>
        <div className={classes.rightSection}>
          <div className={classes.workHistoryContainer}>
            <div className={classes.workHistory_Leftside}>
              <div>
                <p>{props.third_Job_Start_Date}</p>
              </div>
              <div>
                <p>{props.third_Job_End_Date}</p>
              </div>
            </div>
            <div className={classes.workHistory_Rightside}>
              <div>
                <h2>{props.third_Job_Title}</h2>
              </div>
              <div>
                <p>{props.third_Job_Company_Name}</p>
              </div>
              <div>
                <p>{props.third_Job_Description}</p>
              </div>
            </div>
          </div> */}

          <div className={classes.workHistory}>
            <li>
              <span>Courses / Certificates</span>
            </li>
            <div className={classes.workHistoryContainer}>
              <div className={classes.project_Leftside}></div>
              <div className={classes.project_Rightside}>
                <ul className={classes.coursesCertificates}>
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

          <div className={classes.workHistory}>
            <li>
              <span>Projects:</span>
            </li>
            <div className={classes.workHistoryContainer}>
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
