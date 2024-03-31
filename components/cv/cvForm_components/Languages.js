import { Fragment, useState } from "react";
import classes from "./Languages.module.css";
import Dropdown from "@/components/ui/Dropdown";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

const Languages = ({ setFormData }) => {
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("A1");

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
    if (languages.length < 5) {
      const updatedLanguages = [...languages, { language, level }];
      setLanguages(updatedLanguages);
      setLanguage("");
      setLevel("A1");

      if (setFormData) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          languages: updatedLanguages,
        }));
      }
    } else {
      alert("Maximum of 5 languages can be added.");
    }
  };

  const languageChangeHandler = (event) => {
    setLanguage(event.target.value);
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

  return (
    <Fragment>
      <h2>Languages:</h2>
      <div className={classes.languageControl}>
        <label htmlFor="language">Languages</label>
        <input
          type="text"
          value={language}
          onChange={languageChangeHandler}
          placeholder="Add a Language"
          className={classes.input}
        />
        <Dropdown
          value={level}
          onChange={levelChangeHandler}
          className={classes.dropdown}
          options={levels}
        ></Dropdown>

        <CiCirclePlus className={classes.addLanguage} onClick={addLanguage} />
      </div>
      <ul>
        {languages.map((lang, index) => (
          <li key={index}>
            <h3 className={classes.displayedH3}>
              {lang.language} - {lang.level}
              <MdCancel onClick={() => removeLanguage(index)} />
            </h3>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
export default Languages;
