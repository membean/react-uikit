import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*
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

const SelectInput = props => {
  const {
    classes,
    blankOption,
    disabled,
    feedbackContext,
    feedbackText,
    id,
    inline,
    isValid,
    helperText,
    label,
    name,
    onChange,
    options,
    polite,
    value
  } = props;

  const [state, setState] = useState({ value: value || false });

  useEffect(() => {
    setState({ value: value || false });
  }, [value]);

  const controlClasses = classnames("select", "control", classes, {
    disabled: disabled,
    inline: inline,
    invalid: isValid !== undefined && !isValid
  });
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
    const newValue = event.target.value;
    setState({ value: newValue });
    onChange && onChange(event, newValue);
  };

  const renderOptions = () => {
    let optionsHTML = options.map((option, index) => {
      const optionId = `${id}-option-${index + 1}`;

      return (
        <option id={optionId} key={index + 1} value={option.value}>
          {option.label}
        </option>
      );
    });

    if (blankOption) {
      optionsHTML.unshift(
        <option key={0} value="null">
          {blankOption}
        </option>
      );
    }
    return optionsHTML;
  };

  return (
    <div className={controlClasses}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="select-menu">
        <select
          aria-label={label ? null : blankOption || null}
          aria-describedby={getDescribedByIds()}
          className={inputClasses}
          disabled={disabled}
          id={id}
          name={name}
          onChange={handleChange}
          value={state.value}
        >
          {renderOptions()}
        </select>
      </div>
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

SelectInput.propTypes = {
  classes: PropTypes.string,
  disabled: PropTypes.bool,
  feedbackContext: PropTypes.oneOf(["busy", "error", "info", "success"]),
  feedbackText: PropTypes.string,
  id: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  polite: PropTypes.bool,
  value: PropTypes.string
};

export default SelectInput;
