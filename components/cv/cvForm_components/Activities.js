import { Fragment, useEffect, useState } from "react";
import classes from "./Activities.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

const Activities = ({ setFormData, initialActivities }) => {
  const [lastEndDate, setLastEndDate] = useState("");
  const [showEndDate, setShowEndDate] = useState(true);
  const initialActivityState = {
    activityStartDate: "",
    activityEndDate: "",
    activityName: "",
    activityInstituteName: "",
  };
  const [activity, setActivity] = useState(() => {
    return initialActivities && initialActivities.length > 0
      ? initialActivities[0]
      : initialActivityState;
  });

  const [activities, setActivities] = useState(
    Array.isArray(initialActivities) ? initialActivities : []
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialActivities && initialActivities.length > 0) {
      setActivity(initialActivities[0]);
    } else {
      setActivity({
        activityStartDate: "",
        activityEndDate: "",
        activityName: "",
        activityInstituteName: "",
      });
    }
  }, [initialActivities]);

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, activities }));
  }, [activities, setFormData]);

  const validateInput = (name, value) => {
    switch (name) {
      case "activityStartDate":
        return value.trim().length === 0 ? "Start Date cannot be empty" : "";
      case "activityEndDate":
        return value.trim().length === 0 ? "End Date cannot be empty" : "";
      case "activityName":
        if (value.trim().length === 0) {
          return "Activity Name cannot be empty";
        } else if (value.trim().length > 61) {
          return "Activity Name can only contain up to 60 character";
        } else {
          return "";
        }
      case "activityInstituteName":
        if (value.trim().length === 0) {
          return "Activity Institute Name cannot be empty";
        } else if (value.trim().length > 61) {
          return "Activity Institute Name can only contain up to 60 character";
        } else {
          return "";
        }
      default:
        return "";
    }
  };

  const activityChangeHandler = (event) => {
    const { name, value } = event.target;
    const error = validateInput(name, value);
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value,
    }));
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

  const MAX_ACTIVITIES = 3;

  const resetActivityFrom = () => {
    setActivity({
      activityStartDate: "",
      activityEndDate: "",
      activityName: "",
      activityInstituteName: "",
    });
  };

  const addActivity = () => {
    if (activities.length >= MAX_ACTIVITIES) {
      alert(`You can add no more than ${MAX_ACTIVITIES} activities.`);
      return;
    }

    const requiredFields = [
      "activityStartDate",
      "activityEndDate",
      "activityName",
      "activityInstituteName",
    ];

    const missingFields = requiredFields.filter((field) => {
      if (!activity[field] || !activity[field].toString().trim()) {
        console.log(`Missing or empty field: ${field}`);
        return true;
      }
      return false;
    });

    if (missingFields.length > 0) {
      alert(
        `Please fill in all required fields before adding an activity. Missing: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    if (
      activity.activityEndDate &&
      activity.activityStartDate &&
      new Date(activity.activityEndDate) < new Date(activity.activityStartDate)
    ) {
      alert("End date cannot be before Start date.");
      return;
    }

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      alert("Please correct the errors before adding your Activity.");
      return;
    }
    setActivities((prev) => [...prev, activity]);
    resetActivityFrom();
    setShowEndDate(true);
  };

  const removeActivity = (indexToRemove) => {
    const updatedActivities = activities.filter(
      (_, index) => index !== indexToRemove
    );
    setActivities(updatedActivities);
  };

  const showEndDateHandler = (event) => {
    const isChecked = event.target.checked;
    setShowEndDate(!isChecked); // Toggle visibility of the end date input
    if (isChecked) {
      setLastEndDate(activity.activityEndDate); // Save the current end date before setting to "Present"
      setActivity((prevActivity) => ({
        ...prevActivity,
        activityEndDate: "Present",
      }));
    } else {
      setActivity((prevActivity) => ({
        ...prevActivity,
        activityEndDate: lastEndDate, // Restore the last end date when unchecked
      }));
    }
  };

  const activityStartDateClasses = errors.activityStartDate
    ? classes.activityDatesErrorInput
    : classes.activityDatesInput;

  const activityEndDateClasses = errors.activityEndDate
    ? classes.activityDatesErrorInput
    : classes.activityDatesInput;

  const activityNameClasses = errors.activityName
    ? classes.activityControlErrorInput
    : classes.activityControlInput;

  const activityInstituteNameClasses = errors.activityInstituteName
    ? classes.activityControlErrorInput
    : classes.activityControlInput;
  return (
    <Fragment>
      <h2>Activities:</h2>
      <div className={classes.activityContent}>
        <div className={classes.activityDatesContent}>
          <div className={classes.activityDates}>
            <label htmlFor="activityStartDate">Start Date:</label>
            <input
              className={activityStartDateClasses}
              value={activity.activityStartDate}
              name="activityStartDate"
              onChange={activityChangeHandler}
              onBlur={blurHandler}
              type="month"
              id="activityStartDate"
            />
            {errors.activityStartDate && (
              <p className={classes.errorMessage}>{errors.activityStartDate}</p>
            )}
          </div>
          {showEndDate && (
            <div className={classes.activityDates}>
              <label htmlFor="activityEndDate">End Date:</label>
              <input
                className={activityEndDateClasses}
                value={activity.activityEndDate}
                name="activityEndDate"
                onChange={activityChangeHandler}
                onBlur={blurHandler}
                type="month"
                id="activityEndDate"
              />
              {errors.activityEndDate && (
                <p className={classes.errorMessage}>{errors.activityEndDate}</p>
              )}
            </div>
          )}
          <div className={classes.untilNowCheckbox}>
            <label htmlFor="until_now">Until Now</label>
            <input
              type="checkbox"
              id="until_now"
              name="until_now"
              onChange={showEndDateHandler}
              checked={activity.activityEndDate === "Present"}
            />
          </div>
        </div>
        <div></div>
        <div>
          <div>
            <div className={classes.activityContent}>
              <div className={classes.activityControl}>
                <label htmlFor="activityName">Activity Name</label>
                <input
                  className={activityNameClasses}
                  value={activity.activityName}
                  name="activityName"
                  onChange={activityChangeHandler}
                  onBlur={blurHandler}
                  type="text"
                  id="activityName"
                />
                {errors.activityName && (
                  <p className={classes.errorMessage}>{errors.activityName}</p>
                )}
              </div>

              <div className={classes.activityControl}>
                <label htmlFor="activityInstituteName">Institute Name</label>
                <input
                  className={activityInstituteNameClasses}
                  value={activity.activityInstituteName}
                  name="activityInstituteName"
                  onChange={activityChangeHandler}
                  onBlur={blurHandler}
                  type="text"
                  id="activityInstituteName"
                />
                {errors.activityInstituteName && (
                  <p className={classes.errorMessage}>
                    {errors.activityInstituteName}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CiCirclePlus className={classes.addMoreActivity} onClick={addActivity} />
      <ul>
        {activities.map((act, index) => (
          <li key={index}>
            <h3 className={classes.displayedH3}>
              {act.activityName}
              <MdCancel
                className={classes.removeActivity}
                onClick={() => removeActivity(index)}
              />
            </h3>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Activities;
