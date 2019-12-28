import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*
  Renders a 2-state checkbox input. Follows the W3C accessible design patterns:
  https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox

  TODO: Verify props and proptypes
  
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

const CheckBoxInput = props => {
  const {
    disabled,
    feedbackContext,
    feedbackText,
    id,
    isValid,
    helperText,
    label,
    name,
    onChange,
    polite,
    value
  } = props;

  const [state, setState] = useState({ value: value || false });

  useEffect(() => {
    setState({ value: value || false });
  }, [value]);

  const controlClasses = `checkbox control ${disabled ? "disabled" : ""}`;
  const feedbackClasses = classnames(
    "control-feedback",
    `${feedbackContext || "error"}`,
    {
      hidden: !feedbackText
    }
  );
  const feedbackId = `${id}-feedback`;
  const inputClasses = isValid === false ? "invalid" : null;
  const helperId = `${id}-helper`;

  const getDescribedByIds = () => {
    if (!helperText && !feedbackText) {
      return null;
    } else {
      return `${feedbackText ? `${feedbackId} ` : ""}${
        helperText ? helperId : ""
      }`;
    }
  };

  const handleChange = event => {
    const newValue = !state.value;
    setState({ value: newValue });
    onChange && onChange(event, newValue);
  };

  return (
    <div className={controlClasses}>
      <label>
        <input
          aria-checked={state.value}
          aria-describedby={getDescribedByIds()}
          className={inputClasses}
          checked={state.value}
          disabled={disabled}
          id={id}
          name={name}
          onChange={handleChange}
          type="checkbox"
        />
        <span className="control-indicator" aria-hidden="true"></span>
        <span className="control-label">{label}</span>
      </label>
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

CheckBoxInput.propTypes = {
  disabled: PropTypes.bool,
  feedbackContext: PropTypes.oneOf(["busy", "error", "info", "success"]),
  feedbackText: PropTypes.string,
  id: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  polite: PropTypes.bool,
  value: PropTypes.bool
};

export default CheckBoxInput;
