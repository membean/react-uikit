import React from "react";
import PropTypes from "prop-types";

/*
  Used by the RadioGroup component.
  TODO: Verify props and proptypes
*/

const RadioButtonInput = props => {
  const {
    disabled,
    helperText,
    id,
    label,
    name,
    onChange,
    selected,
    value
  } = props;

  const helperId = helperText ? `${id}-helper` : "";
  const itemClasses = `radiogroup-item control ${disabled ? "disabled" : ""}`;

  return (
    <div className={itemClasses}>
      <label className="radio">
        <input
          aria-describedby={helperText ? helperId : null}
          checked={selected}
          disabled={disabled}
          id={id}
          name={name}
          onChange={onChange}
          type="radio"
          value={value}
        />
        <span className="control-indicator" aria-hidden="true"></span>
        <span className="control-label">{label}</span>
      </label>
      {helperText && (
        <div
          className="helper-text"
          dangerouslySetInnerHTML={{ __html: helperText }}
          id={helperId}
        />
      )}
    </div>
  );
};

RadioButtonInput.propTypes = {
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired
};

export default RadioButtonInput;
