import classes from "./Course_CertificatesRender.module.css";

const Course_CertificatesRender = (props) => {
  return (
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
                <li key={index}>
                  <h2>{course}</h2>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Course_CertificatesRender;
