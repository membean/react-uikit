import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RadioButtonInput from "./RadioButtonInput.js";
import classnames from "classnames";

/*
  Renders a radio button group. Follows the W3C accessible design patterns:
  https://www.w3.org/TR/wai-aria-practices-1.1/#radiobutton

  TODO: Verify props and proptypes
  
  Usage:

    const radioGroupOptions = [
      {
        helperText: "A helpful description.",
        label: "First radio option",
        value: "1"
      }
    ];

    <RadioGroupInput
      id="my-radio-group"
      label="Agree to the terms and conditions"
      name="myRadio"
      options={radioGroupOptions}
    />
  
  Props:

    disabled [Boolean] - All radio options are disabled if true.
    feedbackContext [String] - One of "busy", "error", "info", or "success".
                               Defaults to "error".
    feedbackText [String] - Feedback text that will be read assertively.
    id [String] - (required) The HTML id attribute of the fieldset.
    isValid [Boolean] - Displays invalid state if false.
    label [String] - (required) The fieldset legend text.
    name [String] - (required) The HTML name attribute of the radio options.
    onChange [Function] - Fired when an option changes, and receives the
                          event and value of the selected option. 
    polite [Boolean] - Causes a screen reader to read the feedbackText politely.
    options [Array] - (required) An array of option objects, with the following shape:
      disabled [Boolean] - The option will be disabled if true (overridden by
                           disabling the radio group).
      helperText [String] - Optional text to provide context for the option.
      label [String] - (required) The option's text label.
      value [String] - (required) The option's value.
    value [Boolean] - (required) A value to be preselected when rendered.
*/

const RadioGroupInput = props => {
  const {
    disabled,
    feedbackContext,
    feedbackText,
    id,
    isValid,
    label,
    name,
    onChange,
    options,
    polite,
    value
  } = props;

  const [state, setState] = useState({ value: value || null });

  useEffect(() => {
    setState({ value: value || null });
  }, [value]);

  const feedbackClasses = classnames(
    "control-feedback",
    `${feedbackContext || "error"}`,
    {
      hidden: !feedbackText
    }
  );
  const feedbackId = `${id}-feedback`;
  const fieldsetClasses = classnames("radiogroup", "control", { disabled });
  const legendClasses = isValid === false ? "invalid" : null;

  const handleChange = (event, value) => {
    const newValue = value;
    setState({ value: newValue });
    onChange && onChange(event, newValue);
  };

  const renderOptions = () => {
    return options.map((option, index) => {
      const isSelected = option.value === state.value;
      const optionId = `${id}-option-${index + 1}`;

      return (
        <RadioButtonInput
          disabled={disabled || option.disabled}
          helperText={option.helperText}
          id={optionId}
          key={index}
          label={option.label}
          name={name}
          onChange={event => {
            handleChange(event, option.value);
          }}
          selected={isSelected}
          value={option.value}
        />
      );
    });
  };

  return (
    <fieldset className={fieldsetClasses} id={id}>
      <legend className={legendClasses}>{label}</legend>
      <div
        aria-live={polite ? "polite" : "assertive"}
        className={feedbackClasses}
        dangerouslySetInnerHTML={{ __html: feedbackText || null }}
        id={feedbackId}
      />
      {renderOptions()}
    </fieldset>
  );
};

RadioGroupInput.propTypes = {
  disabled: PropTypes.bool,
  feedbackContext: PropTypes.string,
  feedbackText: PropTypes.string,
  id: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      helperText: PropTypes.string,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string
};

export default RadioGroupInput;
