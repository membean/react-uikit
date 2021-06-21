import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*
  Generates an accessible input element. Defaults to type "text".
  
  Usage:
    
    <TextInput
      feedbackContext="success"
      feedbackText="Your name has been updated successfully."
      id="my-text-input"
      label="Enter your name"
      name="myName"
    />
  
  Props:
    autoComplete [String] - The autocomplete attribue of the input element. Defaults to "off". Options are outlined at: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
    autoFocus [Boolean] - sets the autoFocus prop on the input element. Defaults to false
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
    inline [Boolean] - Show the label inline rather than as a block element.
    isValid [Boolean] - Show the invalid state for the control.
    helperText [String] - Additional text that will be displayed to help the user
      get an idea of what this input is used for. This text will be read by screen
      readers when the input receives focus.
    label [String] - (required) The text label associated with the input.
    max [Number] - The max attribute of the input element.
    maxLength [Number] - The maxlength attribute of the input element.
    min [Number] - The min attribute of the input element.
    name [String] - (required) The name attribute of the input element.
    onBlur [Function] - A callback to be fired when the input element loses focus.
      Receives the event and input value as arguments.
    onChange [Function] - A callback to be fired when the input element is changed.
      Receives the event and input value as arguments.
    onFocus [Function] - A callback to be fired when the input element receives
      focus. Receives the event and input value as arguments.
    placeholder [String] - The placeholder attribute of the input element.
    polite [Boolean] - Set the aria-live attribute of the feedback element to
      "polite". This will allow a screen reader to finish reading whatever it
      is reading, then read the feedback, as opposed to interupting.
    readOnly [Boolean] - Set the input element to read only.
    required [Boolean] - Mark the input as required in a form.
    step [Number] - The step attribute of the input element.
    type [String] - The type of input element. Defaults to "text". One of "date", "datetime-local", "email", "month", "number", "password", "range", "search", "tel", "text", "time", "url", or "week".
    value [Boolean] - Whether or not the checkbox is checked. Defaults to false.
*/

const TextInput = React.forwardRef((props, ref) => {
  const {
    autoComplete,
    autoFocus,
    classes,
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
    required,
    step,
    type,
    value
  } = props;

  const controlClasses = classnames("text", "control", classes, {
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

  return (
    <div className={controlClasses}>
      <label htmlFor={id}>{label}</label>
      <input
        aria-describedby={getDescribedByIds()}
        autoComplete={autoComplete || "off"}
        autoFocus={autoFocus}
        className={inputClasses}
        disabled={disabled}
        id={id}
        name={name}
        max={max || null}
        maxLength={maxLength || null}
        min={min || null}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder || null}
        readOnly={readOnly || null}
        ref={ref}
        required={required}
        step={step || null}
        type={type || "text"}
        value={value}
      />
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

TextInput.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  classes: PropTypes.string,
  disabled: PropTypes.bool,
  feedbackContext: PropTypes.oneOf(["busy", "error", "info", "success"]),
  feedbackText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  isValid: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  polite: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
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

TextInput.defaultProps = {
  autoFocus: false,
  required: false
};

export default TextInput;
