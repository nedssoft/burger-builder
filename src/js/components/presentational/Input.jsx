import React from "react";
import PropTypes from "prop-types";
import classes from './Presentation.css';

const Input = (props) => {
  const { label, text, type, id, value, handleChange } = props;
  
  return (
    <div className="form-group">
      <label htmlFor={label}>{text}</label>
      <input
        type={type}
        className={classes.Input}
        id={id}
        value={value ? value: ''}
        onChange={handleChange}
        required
      />
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};
export default Input;