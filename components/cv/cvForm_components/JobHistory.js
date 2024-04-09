import { Fragment, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { BsExclamationSquare } from "react-icons/bs";
import classes from "./JobHistory.module.css";
import NoteModal from "../../ui/NoteModal";
import Backdrop from "../../ui/Backdrop";

const JobHistory = ({ setFormData, initialJobs }) => {
  const [lastEndDate, setLastEndDate] = useState("");
  const [showEndDate, setShowEndDate] = useState(true);
  const [showWorkHistoryNote, setShowWorkHistoryNote] = useState(false);
  const initialJobState = {
    jobStartDate: "",
    jobEndDate: "",
    jobTitle: "",
    companyName: "",
    jobDescription: "",
  };
  const [job, setJob] = useState(() => {
    return initialJobs && initialJobs.length > 0
      ? initialJobs[0]
      : initialJobState;
  });

  const [jobs, setJobs] = useState(
    Array.isArray(initialJobs) ? initialJobs : []
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialJobs && initialJobs.length > 0) {
      setJob(initialJobs[0]);
    } else {
      setJob({
        jobStartDate: "",
        jobEndDate: "",
        jobTitle: "",
        companyName: "",
        jobDescription: "",
      });
    }
  }, [initialJobs]);

  useEffect(() => {
    if (Array.isArray(initialJobs)) {
      setJobs(initialJobs);
    }
  }, [initialJobs]);

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, jobs }));
  }, [jobs, setFormData]);

  const validateInput = (name, value) => {
    switch (name) {
      case "jobStartDate":
        return value.trim().length === 0 ? "Start Date cannot be empty" : "";
      case "jobEndDate":
        return value.trim().length === 0 ? "End Date cannot be empty" : "";
      case "jobTitle":
        if (value.trim().length === 0) {
          return "Job Title cannot be empty";
        } else if (!/^[A-Za-z0-9 /-]+$/.test(value)) {
          return "Input can only include letters, numbers, and spaces";
        } else if (value.trim().length > 60) {
          return "Job Title can only contain up to 60 character";
        } else {
          return "";
        }
      case "companyName":
        if (value.trim().length === 0) {
          return "Company Name cannot be empty";
        } else if (value.trim().length > 61) {
          return "Company Name can only contain up to 60 character";
        } else {
          return "";
        }
      case "jobDescription":
        if (value.trim().length === 0) {
          return "Job Description cannot be empty";
        } else if (value.trim().length > 401) {
          return "Job Description can only contain up to 400 character";
        } else {
          return "";
        }
      default:
        return "";
    }
  };

  const jobChangeHandler = (event) => {
    const { name, value } = event.target;
    const error = validateInput(name, value);
    setJob((previousJob) => ({ ...previousJob, [name]: value }));
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

  const MAX_JOBS = 3;

  const resetJobForm = () => {
    setJob({
      jobStartDate: "",
      jobEndDate: "",
      jobTitle: "",
      companyName: "",
      jobDescription: "",
    });
  };

  const addJob = () => {
    if (jobs.length >= MAX_JOBS) {
      alert(`You can add no more than ${MAX_JOBS} Jobs.`);
      return;
    }

    const requiredFields = [
      "jobStartDate",
      "jobTitle",
      "companyName",
      "jobDescription",
    ];
    const missingFields = requiredFields.filter((field) => {
      if (!job[field] || !job[field].toString().trim()) {
        console.log(`Missing or empty field: ${field}`);
        return true;
      }
      return false;
    });

    if (missingFields.length > 0) {
      alert(
        `Please fill in all required fields before adding a job. Missing: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    if (
      job.jobEndDate &&
      job.jobStartDate &&
      new Date(job.jobEndDate) < new Date(job.jobStartDate)
    ) {
      alert("End date cannot be before Start date.");
      return;
    }

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      alert("Please correct the errors before adding your Job History.");
      return;
    }
    setJobs((prev) => [...prev, job]);
    resetJobForm();
    setShowEndDate(true);
  };

  const removeJob = (indexToRemove) => {
    const updatedJobs = jobs.filter((_, index) => index !== indexToRemove);
    setJobs(updatedJobs);
  };

  function showWorkHistoryNoteHandler() {
    setShowWorkHistoryNote(true);
  }

  function hideWorkHistoryNoteHandler() {
    setShowWorkHistoryNote(false);
  }

  const showEndDateHandler = (event) => {
    const isChecked = event.target.checked;
    setShowEndDate(!isChecked);
    if (isChecked) {
      setLastEndDate(job.jobEndDate);
      setJob((prevJob) => ({
        ...prevJob,
        jobEndDate: "Present",
      }));
    } else {
      setJob((prevJob) => ({
        ...prevJob,
        jobEndDate: lastEndDate,
      }));
    }
  };

  const jobStartDateClasses = errors.jobStartDate
    ? classes.jobHistoryDatesErrorInput
    : classes.jobHistoryDatesInput;

  const jobEndDateClasses = errors.jobEndDate
    ? classes.jobHistoryDatesErrorInput
    : classes.jobHistoryDatesInput;

  const jobTitleClasses = errors.jobTitle
    ? classes.jobHistoryControlErrorInput
    : classes.jobHistoryControlInput;

  const companyNameClasses = errors.companyName
    ? classes.jobHistoryControlErrorInput
    : classes.jobHistoryControlInput;

  const jobDescriptionClasses = errors.jobDescription
    ? classes.jobHistoryErrorTextareaBox
    : classes.jobHistoryTextareaBox;

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
              className={jobStartDateClasses}
              value={job.jobStartDate}
              name="jobStartDate"
              onChange={jobChangeHandler}
              type="month"
              id="jobStartDate"
              onBlur={blurHandler}
            />
            {errors.jobStartDate && (
              <p className={classes.errorMessage}>{errors.jobStartDate}</p>
            )}
          </div>
          {showEndDate && (
            <div className={classes.jobHistoryDates}>
              <label htmlFor="jobEndDate">End Date:</label>
              <input
                className={jobEndDateClasses}
                value={job.jobEndDate}
                name="jobEndDate"
                onChange={jobChangeHandler}
                type="month"
                id="jobEndDate"
                onBlur={blurHandler}
              />
              {errors.jobEndDate && (
                <p className={classes.errorMessage}>{errors.jobEndDate}</p>
              )}
            </div>
          )}
        </div>
        <div>
          <div className={classes.untilNowCheckbox}>
            <label htmlFor="until_now">Until Now</label>
            <input
              type="checkbox"
              id="until_now"
              name="until_now"
              onChange={showEndDateHandler}
              checked={job.jobEndDate === "Present"}
              onBlur={blurHandler}
            />
          </div>
        </div>
        <div className={classes.jobHistoryControl}>
          <label htmlFor="jobTitle">Job Title</label>
          <input
            className={jobTitleClasses}
            value={job.jobTitle}
            name="jobTitle"
            onChange={jobChangeHandler}
            type="text"
            id="jobTitle"
            onBlur={blurHandler}
          ></input>
          {errors.jobTitle && (
            <p className={classes.errorMessage}>{errors.jobTitle}</p>
          )}
        </div>
        <div className={classes.jobHistoryControl}>
          <label htmlFor="companyName">Company Name</label>
          <input
            className={companyNameClasses}
            value={job.companyName}
            name="companyName"
            onChange={jobChangeHandler}
            type="text"
            id="companyName"
            onBlur={blurHandler}
          ></input>
          {errors.companyName && (
            <p className={classes.errorMessage}>{errors.companyName}</p>
          )}
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
          className={jobDescriptionClasses}
          id="jobDescription"
          rows="5"
          onBlur={blurHandler}
        ></textarea>
        {errors.jobDescription && (
          <p className={classes.errorMessage}>{errors.jobDescription}</p>
        )}
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
