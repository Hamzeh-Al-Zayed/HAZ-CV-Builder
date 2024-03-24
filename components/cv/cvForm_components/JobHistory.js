import { Fragment, useState } from "react";

import { MdCancel } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { BsExclamationSquare } from "react-icons/bs";
import classes from "./JobHistory.module.css";
import NoteModal from "../../ui/NoteModal";
import Backdrop from "../../ui/Backdrop";

const JobHistory = ({ setFormData }) => {
  const [showEndDate, setShowEndDate] = useState(false);
  const [showWorkHistoryNote, setShowWorkHistoryNote] = useState(false);

  const [job, setJob] = useState({
    jobStartDate: "",
    jobEndDate: "",
    jobTitle: "",
    companyName: "",
    jobDescription: "",
  });

  const [jobs, setJobs] = useState([]);

  const jobChangeHandler = (event) => {
    const { name, value } = event.target;
    setJob((previousJob) => ({ ...previousJob, [name]: value }));
  };

  const MAX_JOBS = 3;

  const addJob = () => {
    if (jobs.length >= MAX_JOBS) {
      alert(`You can add no more than ${MAX_JOBS} educations.`);
      return;
    }
    const updatedJobs = [...jobs, job];
    setJobs(updatedJobs);
    setJob({
      jobStartDate: "",
      jobEndDate: "",
      jobTitle: "",
      companyName: "",
      jobDescription: "",
    });

    setFormData((prevFormData) => ({ ...prevFormData, jobs: updatedJobs }));
  };

  const removeJob = (indexToRemove) => {
    const updatedJobs = jobs.filter((_, index) => index !== indexToRemove);
    setJobs(updatedJobs);
    setFormData((prevFormData) => ({ ...prevFormData, jobs: updatedJobs }));
  };

  function showWorkHistoryNoteHandler() {
    setShowWorkHistoryNote(true);
  }

  function hideWorkHistoryNoteHandler() {
    setShowWorkHistoryNote(false);
  }

  const showEndDateHandler = (event) => {
    setShowEndDate(event.target.checked);
  };

  return (
    <Fragment>
      <h2>Work History:</h2>
      <div className={classes.noteContainor}>
        <h3>
          Note
          <BsExclamationSquare
            className={classes.note}
            onClick={showWorkHistoryNoteHandler}
          />
        </h3>
      </div>
      {showWorkHistoryNote && (
        <NoteModal onClick={hideWorkHistoryNoteHandler} />
      )}
      {showWorkHistoryNote && <Backdrop onClick={hideWorkHistoryNoteHandler} />}
      <div>
        <h3>Previous Job 1:</h3>
      </div>
      <div className={classes.jobHistoryContent}>
        <div className={classes.jobHistoryDatesContent}>
          <div className={classes.jobHistoryDates}>
            <label htmlFor="jobStartDate">Start Date:</label>
            <input
              value={job.jobStartDate}
              name="jobStartDate"
              onChange={jobChangeHandler}
              type="month"
              id="jobStartDate"
            />
          </div>
          {!showEndDate && (
            <div className={classes.jobHistoryDates}>
              <label htmlFor="jobEndDate">End Date:</label>
              <input
                value={job.jobEndDate}
                name="jobEndDate"
                onChange={jobChangeHandler}
                type="month"
                id="jobEndDate"
              />
            </div>
          )}
        </div>
        <div>
          <div className={classes.untilNowCheckbox}>
            <label htmlFor="first_Job_Until_now">Until Now</label>
            <input
              type="checkbox"
              id="first_Job_Until_now"
              name="first_Job_Until_now"
              onChange={showEndDateHandler}
            />
          </div>
        </div>
        <div className={classes.jobHistoryControl}>
          <label htmlFor="jobTitle">Job Title</label>
          <input
            value={job.jobTitle}
            name="jobTitle"
            onChange={jobChangeHandler}
            type="text"
            id="jobTitle"
          ></input>
        </div>
        <div className={classes.jobHistoryControl}>
          <label htmlFor="companyName">Company Name</label>
          <input
            value={job.companyName}
            name="companyName"
            onChange={jobChangeHandler}
            type="text"
            id="companyName"
          ></input>
        </div>
      </div>
      <div className={classes.jobHistoryTextarea}>
        <label
          className={classes.jobHistoryTextarealabel}
          htmlFor="jobDescription"
        >
          Job Description
        </label>
        <textarea
          value={job.jobDescription}
          name="jobDescription"
          onChange={jobChangeHandler}
          className={classes.jobHistoryTextareaBox}
          id="jobDescription"
          rows="5"
        ></textarea>
      </div>
      <CiCirclePlus className={classes.addMore} onClick={addJob} />
      <ul>
        {jobs.map((jobb, index) => (
          <li key={index}>
            <h3 className={classes.displayedH3}>
              {jobb.jobTitle}
              <MdCancel
                className={classes.cancelIcon}
                onClick={() => removeJob(index)}
              />
            </h3>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default JobHistory;
