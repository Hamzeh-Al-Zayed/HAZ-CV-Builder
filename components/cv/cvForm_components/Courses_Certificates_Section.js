import { Fragment, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import classes from "./Courses_Certificates_Section.module.css";

const Courses_Certificates_Section = (props) => {
  const [currentCourse, setCurrentCourse] = useState("");

  const courseChangeHandler = (event) => {
    setCurrentCourse(event.target.value);
  };

  const MAX_COURSES = 5;

  const addCourse = (event) => {
    event.preventDefault();
    if (!currentCourse.trim()) return;

    if (
      props.courses_Certificates &&
      props.courses_Certificates.length >= MAX_COURSES
    ) {
      alert(`You can add no more than ${MAX_COURSES} Courses`);
      return;
    }

    props.setFormData((prevFormData) => ({
      ...prevFormData,
      courses_Certificates: [
        ...prevFormData.courses_Certificates,
        currentCourse,
      ],
    }));
    setCurrentCourse("");
  };

  const removeCourse = (indexToRemove) => {
    props.setFormData((prevFormData) => ({
      ...prevFormData,
      courses_Certificates: prevFormData.courses_Certificates.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  return (
    <Fragment>
      <h2>Courses / Certificates:</h2>
      <div className={classes.courseControl}>
        <label htmlFor="courses_Certificates">Course / Certificate</label>
        <input
          value={currentCourse}
          onChange={courseChangeHandler}
          type="text"
          maxLength={65}
        ></input>
        <CiCirclePlus className={classes.addMoreCourses} onClick={addCourse} />
      </div>
      <ul>
        {props.courses_Certificates &&
          props.courses_Certificates.map((course, index) => (
            <li key={index}>
              <h3 className={classes.displayedH3}>
                {course}{" "}
                <MdCancel
                  className={classes.removeCourse}
                  onClick={() => removeCourse(index)}
                />
              </h3>
            </li>
          ))}
      </ul>
    </Fragment>
  );
};

export default Courses_Certificates_Section;
