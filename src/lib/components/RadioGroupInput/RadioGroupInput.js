import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RadioButtonInput from "./RadioButtonInput.js";
import classnames from "classnames";

/*
  Renders a radio button group.
  NOTE: Does not expose onBlur and onFocus functions for the underlying
        radio inputs. Accessible keyboard navigation uses arrow keys to
        move between the options, and attaching behavior to the onBlur
        and onFocus events would be unexpected by the user.  
  
  Usage:

    const radioGroupOptions = [
      {
        helperText: "A helpful description.",
        label: "First radio option",
        value: "1"
      },
      {
        helperText: "Another helpful description.",
        label: "Second radio option",
        value: "2"
      }
    ];

    <RadioGroupInput
      id="my-radio-group"
      label="Please select an option"
      name="myRadioGroup"
      options={radioGroupOptions}
    />
  
  Props:

    classes [String] - Additional CSS classes that will be added to the control
      container div element.
    disabled [Boolean] - Disable the input elements.
    feedbackContext [String] - One of "busy", "error", "info", or "success".
      Defaults to "error". Class will be added to the feedback div element.
    feedbackText [String] - Text that will be displayed as feedback. In order to
      be useful for non-sighted users, this text must identify the input that it
      refers to and a  clear message. By default, his text will be read by screen
      readers assertively when it is updated, such as when providing a loading
      message and then updating it with a confirmation message.
    id [String] - (Required) The id attribute of the fieldset element.
    isValid [Boolean] - Show the invalid state for the control.
    label [String] - (required) The text label associated with the fieldset.
    name [String] - (required) The name attribute for the input elements.
    onChange [Function] - A callback to be fired when one of the options is
      selected. Receives the event and option value as arguments.
    options [Array] - (Required) An array of objects representing option elements. Each
      option can have the following shape:
        disabled [Boolean] - Disable this option (superceded by the RadioGroup
            "disabled" prop.)
        helperText [String] - Additional text that will be displayed to help
           the user get an idea of what this option is. This text will be read
           by screen readers when the option receives focus.
        label [String] - (Required) The text label associated with the option.
        value [String] - (Required) The option value.
    polite [Boolean] - Set the aria-live attribute of the feedback element to
      "polite". This will allow a screen reader to finish reading whatever it
      is reading, then read the feedback, as opposed to interupting.
    value [String] - The value of the option to be selected.
*/

const RadioGroupInput = React.forwardRef((props, ref) => {
  const {
    classes,
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
  const fieldsetClasses = classnames("radiogroup", "control", classes, {
    disabled
  });
  const legendClasses = isValid === false ? "invalid" : null;

  const handleChange = event => {
    const value = event.target.value;
    setState({ value });
    onChange && onChange(event);
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
          onChange={handleChange}
          ref={index === 0 ? ref : null}
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
        role="alert"
      />
      {renderOptions()}
    </fieldset>
  );
});

RadioGroupInput.propTypes = {
  classes: PropTypes.string,
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
