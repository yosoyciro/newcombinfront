import React from "react";
import classes from "./Members.module.css";
import ssnIsValid from "../../validators/ssnIsValid";

const MembersForm = (props) => {
  const handleChange = (event) => {
    //console.log("event", event.target.id);
    props.onChange(event.target.value, event.target.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit();
  };

  const handleReset = () => {
    props.onReset();
  };

  const disableSave = () => {    
    if (props.firstName.length === 0) return true;

    if (props.lastName.length === 0) return true;

    if (ssnIsValid(props.ssn) === false) {
      return true;
    }

    return false;
  };

  return (
    <>
      <h4>{props.error?.message !== undefined && <h3>Error: {props.error.message}</h3>}</h4>
      <form onSubmit={handleSubmit} className={classes.div}>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          value={props.firstName}
          onChange={handleChange}
        />
        <label>
          Last Name:
          <input
            id="lastName"
            type="text"
            value={props.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            id="address"
            type="text"
            value={props.address}
            onChange={handleChange}
          />
        </label>
        <label>
          SSN:
          <input
            id="ssn"
            type="text"
            value={props.ssn}
            onChange={handleChange}
          />
        </label>
      </form>
      <div>
        <button type="submit" onClick={handleSubmit} disabled={disableSave()}>
          Save
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  );
};

export default MembersForm;
