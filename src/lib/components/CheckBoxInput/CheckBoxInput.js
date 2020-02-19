import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*
  Renders an accessible, styleable 2-state checkbox input.
  
  Usage:
    
    <CheckBoxInput
      id="my-checkbox"
      label="Checkbox label"
      name="myCheckbox"
      value={true}
    />
  
  Props:

    classes [String] - Additional CSS classes that will be added to the control
      container div element.
    disabled [Boolean] - Disable the input element.
    feedbackContext [String] - One of "busy", "error", "info", or "success".
      Defaults to "error". Class will be added to the feedback div element.
    feedbackText [String] - Text that will be displayed as feedback. In order to
      be useful for non-sighted users, this text must identify the input that it
      refers to and a  clear message. By default, his text will be read by screen
      readers assertively when it is updated, such as when providing a loading
      message and then updating it with a confirmation message.
    id [String] - (Required) The id attribute of the input element.
    isValid [Boolean] - Show the invalid state for the control.
    helperText [String] - Additional text that will be displayed to help the user
      get an idea of what this input is used for. This text will be read by screen
      readers when the input receives focus.
    label [String] - (required) The text label associated with the input.
    name [String] - (required) The name attribute of the input element.
    onBlur [Function] - A callback to be fired when the input element loses focus.
      Receives the event and input value as arguments.
    onChange [Function] - A callback to be fired when the input element is changed.
      Receives the event and input value as arguments.
    onFocus [Function] - A callback to be fired when the input element receives
      focus. Receives the event and input value as arguments.
    polite [Boolean] - Set the aria-live attribute of the feedback element to
      "polite". This will allow a screen reader to finish reading whatever it
      is reading, then read the feedback, as opposed to interupting.
    value [Boolean] - Whether or not the checkbox is checked. Defaults to false.
*/

const CheckBoxInput = React.forwardRef((props, ref) => {
  const {
    classes,
    disabled,
    feedbackContext,
    feedbackText,
    id,
    isValid,
    helperText,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    polite,
    value
  } = props;

  const controlClasses = classnames("checkbox", "control", classes, {
    disabled
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

  return (
    <div className={controlClasses}>
      <label>
        <input
          aria-checked={value}
          aria-describedby={getDescribedByIds()}
          checked={value}
          className={inputClasses}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          ref={ref}
          type="checkbox"
          value={value}
        />
        <span className="control-indicator" aria-hidden="true"></span>
        <span className="control-label">{label}</span>
      </label>
      <div
        aria-live={polite ? "polite" : "assertive"}
        className={feedbackClasses}
        dangerouslySetInnerHTML={{ __html: feedbackText || null }}
        id={feedbackId}
        role="alert"
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
});

CheckBoxInput.propTypes = {
  classes: PropTypes.string,
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
  value: PropTypes.bool
};

export default CheckBoxInput;
