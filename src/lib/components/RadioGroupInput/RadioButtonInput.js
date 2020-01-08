import React from "react";
import PropTypes from "prop-types";

/*
  Used by the RadioGroup component.
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

  /*
    NOTE: Avoid onBlur, onChange, and onFocus side effects, since a keyboard
          user has to go between each option to read them, and each time they
          tab to one it will be selected. That means that all three of these
          events will fire even if someone is simply browsing through the choices.
  */
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
