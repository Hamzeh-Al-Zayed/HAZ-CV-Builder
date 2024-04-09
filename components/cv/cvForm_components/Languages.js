import { Fragment, useState } from "react";
import classes from "./Languages.module.css";
import Dropdown from "@/components/ui/Dropdown";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

const Languages = ({ setFormData, initialLanguages = [] }) => {
  const [languages, setLanguages] = useState(initialLanguages);
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("A1");
  const [errors, setErrors] = useState("");

  const validateInput = (language) => {
    if (!language.trim()) {
      return "Language cannot be empty.";
    }
    if (language.length > 16) {
      return "Language cannot be more than 16 letters.";
    }
    if (!/^[A-Za-z ]+$/.test(language)) {
      return "Language can only include letters.";
    }
    return "";
  };
  const levels = [
    { label: "A1", value: "A1" },
    { label: "A2", value: "A2" },
    { label: "B1", value: "B1" },
    { label: "B2", value: "B2" },
    { label: "C1", value: "C1" },
    { label: "C2", value: "C2" },
    { label: "Native", value: "Native" },
  ];

  const addLanguage = () => {
    if (languages.length < 6) {
      const validationError = validateInput(language);
      if (validationError) {
        setErrors(validationError);
        return;
      }

      const updatedLanguages = [...languages, { language, level }];
      setLanguages(updatedLanguages);
      setLanguage("");
      setLevel("A1");
      setErrors("");

      if (setFormData) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          languages: updatedLanguages,
        }));
      }
    } else {
      alert("Maximum of 6 languages can be added.");
    }
  };

  const languageChangeHandler = (event) => {
    const language = event.target.value;
    const validationError = validateInput(language);
    setLanguage(language);
    setErrors(validationError);
  };

  const blurHandler = (event) => {
    const validationError = validateInput(language);
    setErrors(validationError);
  };

  const levelChangeHandler = (event) => {
    setLevel(event.target.value);
  };

  const removeLanguage = (indexToRemove) => {
    const updatedLanguages = languages.filter(
      (_, index) => index !== indexToRemove
    );
    setLanguages(updatedLanguages);
    setFormData((prevFormData) => ({
      ...prevFormData,
      languages: updatedLanguages,
    }));
  };

  const languageClasses = errors
    ? classes.languageControlErrorInput
    : classes.languageControlInput;

  return (
    <Fragment>
      <h2>Languages:</h2>
      <div className={classes.languageControl}>
        <label htmlFor="language">Languages</label>
        <input
          className={languageClasses}
          type="text"
          value={language}
          onChange={languageChangeHandler}
          onBlur={blurHandler}
          placeholder="Add a Language"
        />
        <Dropdown
          value={level}
          onChange={levelChangeHandler}
          className={classes.dropdown}
          options={levels}
        ></Dropdown>

        <CiCirclePlus className={classes.addLanguage} onClick={addLanguage} />
      </div>
      {errors && <p className={classes.errorMessage}>{errors}</p>}
      <ul className={classes.languageUl}>
        {languages.map((lang, index) => (
          <li key={index}>
            <h3 className={classes.displayedH3}>
              - {lang.language} - {lang.level}
              <MdCancel onClick={() => removeLanguage(index)} />
            </h3>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
export default Languages;
