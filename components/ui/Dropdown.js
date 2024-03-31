// import React, { useState } from "react";
// import classes from "./Dropdown.module.css";

// const Dropdown = ({ options }) => {
//   const [selectedValue, setSelectedValue] = useState(options[0].value);

//   const changeHandler = (e) => {
//     setSelectedValue(e.target.value);
//   };

//   return (
//     <div className={classes.dropdown}>
//       <select
//         value={selectedValue}
//         onChange={changeHandler}
//         className={classes.dropdownSelect}
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Dropdown;

// LevelDropdown.js
import React from "react";

const Dropdown = (props) => {
  return (
    <select
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
