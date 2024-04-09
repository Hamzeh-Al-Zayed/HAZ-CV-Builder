import { Fragment, useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import classes from "./Courses_Certificates_Section.module.css";

const Courses_Certificates_Section = ({ setFormData, initialCourses = [] }) => {
  const [courses, setCourses] = useState(initialCourses);
  const [currentCourse, setCurrentCourse] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    // Update the parent component's state whenever the courses array changes.
    setFormData((prevFormData) => ({
      ...prevFormData,
      courses_Certificates: courses,
    }));
  }, [courses, setFormData]);

  const validateInput = (course) => {
    if (!course.trim()) {
      return "Course/Certificate cannot be empty.";
    }
    if (course.length > 85) {
      return "Course/Certificate cannot be more than 85 characters.";
    }
    return "";
  };

  const courseChangeHandler = (event) => {
    const course = event.target.value;
    const validationError = validateInput(course);
    setCurrentCourse(course);
    setErrors(validationError);
  };

  const blurHandler = () => {
    const validationError = validateInput(currentCourse);
    setErrors(validationError);
  };

  const MAX_COURSES = 5;

  const addCourse = (event) => {
    event.preventDefault();

    if (courses.length >= MAX_COURSES) {
      alert(`You can add no more than ${MAX_COURSES} Courses`);
      return;
    }

    const validationError = validateInput(currentCourse);
    if (validationError) {
      setErrors(validationError);
      return;
    }
    if (!currentCourse.trim()) return;
    setCourses((prevCourses) => [...prevCourses, currentCourse]);
    setCurrentCourse(""); // Reset the input field after adding a course
    setErrors(""); // Clear any errors
  };

  const removeCourse = (indexToRemove) => {
    setCourses((prevCourses) =>
      prevCourses.filter((_, index) => index !== indexToRemove)
    );
  };

  const coursesClasses = errors
    ? classes.courseControlErrorInput
    : classes.courseControlInput;

  return (
    <Fragment>
      <h2>Courses / Certificates:</h2>
      <div className={classes.courseControl}>
        <label htmlFor="courses_Certificates">Course / Certificate</label>
        <input
          className={coursesClasses}
          value={currentCourse}
          onChange={courseChangeHandler}
          onBlur={blurHandler}
          type="text"
        ></input>
        <CiCirclePlus className={classes.addMoreCourses} onClick={addCourse} />
      </div>
      {errors && <p className={classes.errorMessage}>{errors}</p>}
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <h3 className={classes.displayedH3}>
              {course}
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
