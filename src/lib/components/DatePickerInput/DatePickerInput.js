import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import DateTime from "react-datetime";
import moment from "moment-timezone";

/*
  Generates an datepicker element:
  https://github.com/YouCanBookMe/react-datetime

  Not totally accessible, but very close.
  
  Usage:
    
    <DatePickerInput
      id="datepicker-1"
      label="Exame Date"
      name="examDate"
      timezone="America/Los Angeles"
    />
    
  Props:
    autoComplete [String] - The autocomplete attribue of the input element. Defaults to "off". Options are outlined at: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
    classes [String] - Additional CSS classes that will be added to the control
      container div element.
    dateFormat [Boolean or String] - The format of the date to be displayed.
      https://github.com/YouCanBookMe/react-datetime
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
    isValidDate [Function] - A function that determines if each day in the calendar is
      selectectable or not. https://github.com/YouCanBookMe/react-datetime
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
    onNavigateBack [Function] - A callback to be fired when the calendar goes back a
      day, month, or year. https://github.com/YouCanBookMe/react-datetime 
    onNavigateForward [Function] - A callback to be fired when the calendar goes forward a
      day, month, or year. https://github.com/YouCanBookMe/react-datetime 
    onViewModeChange [Function] - A callback to be fired when the calendar view mode changes.
      https://github.com/YouCanBookMe/react-datetime
    open [Boolean] - Whether the datepicker should be open or closed.
      https://github.com/YouCanBookMe/react-datetime
    placeholder [String] - The placeholder attribute of the input element.
    polite [Boolean] - Set the aria-live attribute of the feedback element to
      "polite". This will allow a screen reader to finish reading whatever it
      is reading, then read the feedback, as opposed to interupting.
    readOnly [Boolean] - Set the input element to read only.
    required [Boolean] - Mark the input as required in a form.
    timeFormat [Boolean or String] - The display format of times.
      https://github.com/YouCanBookMe/react-datetime
    timezone [String] - A moment timezone string, used to display dates in the correct
      timezone for the current user.
    value [Boolean] - Whether or not the checkbox is checked. Defaults to false.
    viewDate [Object or String] - The date that will be shown when the datepicker is opened.
      https://github.com/YouCanBookMe/react-datetime
    viewMode [String or Number] - The default view to show for the datepicker. Can be one of
      "years", "months", "days", or "time", or a number representing a month. Defaults to "days".
      https://github.com/YouCanBookMe/react-datetime
*/

const DatePickerInput = React.forwardRef((props, ref) => {
  const {
    autoComplete,
    classes,
    dateFormat,
    disabled,
    feedbackContext,
    feedbackText,
    id,
    isValid,
    isValidDate,
    helperText,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    onNavigateBack,
    onNavigateForward,
    onViewModeChange,
    open,
    placeholder,
    polite,
    readOnly,
    required,
    timeFormat,
    timezone,
    value,
    viewDate,
    viewMode
  } = props;

  const controlClasses = classnames("text", "control", "datepicker", classes, {
    disabled: disabled,
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

  const today = moment.tz(timezone);
  const yesterday = today.subtract(1, "day");

  const defaultIsValidDate = (currentDate, selectedDate) => {
    return currentDate.isAfter(yesterday);
  };

  // TODO: Add additional (visually hidden) text to make sure someone knows
  //       the correct format for entering the date manually.
  return (
    <div className={controlClasses}>
      <label htmlFor={id}>{label}</label>
      <DateTime
        closeOnSelect={true}
        dateFormat={dateFormat || "MMM D, YYYY"}
        displayTimeZone={timezone}
        inputProps={{
          "aria-describedby": getDescribedByIds(),
          autoComplete: autoComplete || "off",
          className: inputClasses,
          disabled: disabled,
          id: id,
          name: name,
          placeholder: placeholder || null,
          readOnly: readOnly || null,
          ref: ref,
          required: required
        }}
        isValidDate={isValidDate || defaultIsValidDate}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onNavigateBack={onNavigateBack}
        onNavigateForward={onNavigateForward}
        onViewModeChange={onViewModeChange}
        open={open}
        timeFormat={timeFormat || false}
        value={value ? moment(value) : null}
        viewDate={moment(viewDate)}
        viewMode={viewMode}
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

DatePickerInput.propTypes = {
  autoComplete: PropTypes.string,
  classes: PropTypes.string,
  dateFormat: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  feedbackContext: PropTypes.oneOf(["busy", "error", "info", "success"]),
  feedbackText: PropTypes.string,
  id: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  isValidDate: PropTypes.func,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onNavigateBack: PropTypes.func,
  onNavigateForward: PropTypes.func,
  onViewModeChange: PropTypes.func,
  open: PropTypes.bool,
  placeholder: PropTypes.string,
  polite: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  timeFormat: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  timezone: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  viewDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  viewMode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DatePickerInput;
