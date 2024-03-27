import classes from "./JobHistoryRender.module.css";

const JobHistoryRender = (props) => {
  return (
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
  );
};

export default JobHistoryRender;
