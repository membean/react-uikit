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
    value [String] - Value of the text input
    isFocused [Boolean] - prop to control aria-live behavior


     * Accessibility features:
     * - Uses `aria-describedby` to link input with its feedback and helper text.
     * - Uses `aria-live="assertive"` or `polite` on feedback to announce changes via screen readers.
     * - Uses `role="alert"` for screen reader announcement of dynamic feedback.
     * - Dynamically sets a `key` on feedback container to force DOM update and screen reader re-announcement.
     * - Limits announcements to only the input currently in focus using the `isFocused` prop.
     * 
*/

const TextInput = React.forwardRef((props, ref) => {
  const {
    autoComplete,
    autoFocus = false,
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
    required = false,
    step,
    type,
    value,
    isFocused, // Controls whether screen readers announce feedback for this input
  } = props;

  const controlClasses = classnames("text", "control", classes, {
    disabled,
    inline,
    invalid: isValid !== undefined && !isValid,
  });

  const feedbackClasses = classnames(
    "control-feedback",
    `${feedbackContext || "error"}`,
    {
      "visually-hidden": !feedbackText, // visually hide only when there's no error
    }
  );

  const feedbackId = `${id}-feedback`;
  const helperId = `${id}-helper`;
  const inputClasses = isValid === false ? "invalid" : null;

  /**
   * Compose value for `aria-describedby` on input.
   * Links to feedback text and/or helper text for screen readers.
   */
  const getDescribedByIds = () => {
    if (!helperText && !feedbackText) return null;
    return `${feedbackText ? `${feedbackId} ` : ""}${
      helperText ? helperId : ""
    }`.trim();
  };

  return (
    <div className={controlClasses}>
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        name={name}
        type={type || "text"}
        className={inputClasses}
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        autoComplete={autoComplete || "off"}
        autoFocus={autoFocus}
        disabled={disabled}
        readOnly={readOnly || null}
        placeholder={placeholder || null}
        max={max || null}
        min={min || null}
        maxLength={maxLength || null}
        step={step || null}
        required={required}
        aria-invalid={isValid === false}
        aria-describedby={getDescribedByIds()}
      />

      {/* 
        Feedback region with dynamic key to force DOM updates.
        Only sets `aria-live` and `role=alert` when the field is focused 
        to prevent multiple announcements from unrelated fields.
      */}
      <div
        key={feedbackText ? `${feedbackText}-${Date.now()}` : "empty-feedback"}
        id={feedbackId}
        className={feedbackClasses}
        role={isFocused ? "alert" : undefined}
        aria-live={isFocused ? (polite ? "polite" : "assertive") : undefined}
        aria-atomic="true" // Ensures full feedback text is read even on partial updates
      >
        {feedbackText ? (
          <span>{feedbackText}</span>
        ) : (
          <span aria-hidden="true">&nbsp;</span>
        )}
      </div>

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
    "week",
  ]),
  value: PropTypes.string,
  isFocused: PropTypes.bool, // Important for screen reader conditional announcement
};

export default TextInput;
