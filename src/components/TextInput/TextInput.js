import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*

  TODO: Verify props and proptypes
  TODO: Add an event that fires when the "enter" key is pressed.
  
  Usage:
    
    <CheckBoxInput
      feedbackContext="success"
      feedbackText="You must check this box."
      id="my-checkbox"
      label="Agree to the terms and conditions"
      name="myCheckbox"
      value={false}
    />
  
  Props:

    disabled [Boolean] - Checkbox is disabled if true.
    feedbackContext [String] - One of "busy", "error", "info", or "success".
                               Defaults to "error".
    feedbackText [String] - Feedback text that will be read assertively.
    id [String] - (required) The HTML id attribute of the checkbox input.
    isValid [Boolean] - Displays invalid state if false.
    helperText [String] - Additional text to describe the checkbox.
    label [String] - (required) The checkbox text label.
    name [String] - (required) The HTML name attribute of the checkbox input.
    onChange [Function] - Fired when the checkbox changes, and receives the
                          event and value of the checkbox. 
    polite [Boolean] - Causes a screen reader to read the feedbackText politely.
    value [Boolean] - (required) The checkbox is checked if true.
*/

const TextInput = props => {
  const {
    autoComplete,
    disabled,
    feedbackContext,
    feedbackText,
    id,
    inline,
    isValid,
    helperText,
    label,
    max,
    maxLength,
    min,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    polite,
    readOnly,
    step,
    type,
    value
  } = props;

  const [state, setState] = useState({ value: value || "" });

  useEffect(() => {
    setState({ value: value || "" });
  }, [value]);

  const controlClasses = classnames("text", "control", {
    disabled: disabled,
    inline: inline,
    invalid: isValid !== undefined && !isValid
  });
  const feedbackClasses = classnames(
    "control-feedback",
    `${feedbackContext || "error"}`,
    {
      "visually-hidden": !feedbackText
    }
  );
  const feedbackId = `${id}-feedback`;
  const helperId = `${id}-helper`;
  const inputClasses = isValid === false ? "invalid" : null;

  const getDescribedByIds = () => {
    if (!helperText && !feedbackText) {
      return null;
    } else {
      return `${feedbackText ? `${feedbackId} ` : ""}${
        helperText ? helperId : ""
      }`;
    }
  };

  const handleBlur = event => {
    onBlur && onBlur(event, event.target.value);
  };

  const handleChange = event => {
    const newValue = event.target.value;
    setState({ value: newValue });
    onChange && onChange(event, newValue);
  };

  const handleFocus = event => {
    onFocus && onFocus(event, event.target.value);
  };

  return (
    <div className={controlClasses}>
      <label htmlFor={id}>{label}</label>
      <input
        aria-describedby={getDescribedByIds()}
        autoComplete={autoComplete || "off"}
        className={inputClasses}
        disabled={disabled}
        id={id}
        name={name}
        max={max || null}
        maxLength={maxLength || null}
        min={min || null}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={placeholder || null}
        readOnly={readOnly || null}
        step={step || null}
        type={type || "text"}
        value={state.value}
      />
      <div
        aria-live={polite ? "polite" : "assertive"}
        className={feedbackClasses}
        dangerouslySetInnerHTML={{ __html: feedbackText || null }}
        id={feedbackId}
      />
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

TextInput.propTypes = {
  disabled: PropTypes.bool,
  feedbackContext: PropTypes.oneOf(["busy", "error", "info", "success"]),
  feedbackText: PropTypes.string,
  id: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  polite: PropTypes.bool,
  type: PropTypes.oneOf([
    "date",
    "datetime-local",
    "email",
    "month",
    "number",
    "password",
    "range",
    "search",
    "tel",
    "text",
    "time",
    "url",
    "week"
  ]),
  value: PropTypes.string
};

export default TextInput;
