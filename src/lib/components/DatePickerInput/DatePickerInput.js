import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
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
    required,
    timezone,
    value
  } = props;

  const containerClasses = classnames("select", "container", {
    disabled,
    invalid: isValid === false
  });
  const feedbackClasses = classnames(
    "control-feedback",
    `${feedbackContext || "error"}`,
    {
      "visually-hidden": !feedbackText
    }
  );
  const feedbackId = `${id}-feedback`;
  const fieldsetClasses = classnames("datepicker", "control", classes, {
    disabled
  });
  const getDescribedByIds = () => {
    if (!helperText && !feedbackText) {
      return null;
    } else {
      return `${feedbackText ? `${feedbackId} ` : ""}${
        helperText ? helperId : ""
      }`;
    }
  };
  const helperId = `${id}-helper`;
  const inputClasses = isValid === false ? "invalid" : null;
  const legendClasses = isValid === false ? "invalid" : null;

  /*
    TODO: Should make changes based on the date range that is allowed.
          Also needs to change the "day" count based on the selected month/year.
  */
  const options = {
    days: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" }
      // ...
    ],
    months: [
      { label: "January", value: "1" },
      { label: "February", value: "2" },
      { label: "March", value: "3" }
      // ...
    ],
    years: [
      { label: "2020", value: "2020" },
      { label: "2021", value: "2021" }
    ]
  };

  console.log(options);

  const renderOptions = unit => {
    let optionsHTML = options[unit].map((option, index) => {
      const optionId = `${id}-${unit}-option-${index + 1}`;

      return (
        <option id={optionId} key={index + 1} value={option.value}>
          {option.label}
        </option>
      );
    });
    /*
      TODO: If there is no current value for this component, return a blank
            option like "Month", "Day", or "Year".
            See the SelectInput component for example.

      TODO: If the current value is outside of the allowed date range, make
            the option disabled.
            <option disabled selected id="" key="" value="">2010</option>
    */
    return optionsHTML;
  };

  return (
    <fieldset className={fieldsetClasses} id={id} ref={ref}>
      <legend className={legendClasses}>{label}</legend>
      <div className={containerClasses}>
        <div className="select-menu">
          <select
            aria-label="Month"
            aria-describedby={getDescribedByIds()}
            className={inputClasses}
            disabled={disabled}
            id={`${id}-month`}
            name={`${name}Month`}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            required={required}
            //size={options.month.length}
            //value={}
          >
            {renderOptions("months")}
          </select>
        </div>
        <div className="select-menu">
          <select
            aria-label="Day"
            aria-describedby={getDescribedByIds()}
            className={inputClasses}
            disabled={disabled}
            id={`${id}-day`}
            name={`${name}Day`}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            required={required}
            //size={options.day.length}
            //value={}
          >
            {renderOptions("days")}
          </select>
        </div>
        <div className="select-menu">
          <select
            aria-label="Year"
            aria-describedby={getDescribedByIds()}
            className={inputClasses}
            disabled={disabled}
            id={`${id}-year`}
            name={`${name}Year`}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            required={required}
            //size={options.year.length}
            //value={}
          >
            {renderOptions("years")}
          </select>
        </div>
      </div>
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
    </fieldset>
  );
});

DatePickerInput.propTypes = {
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
  required: PropTypes.bool,
  timezone: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default DatePickerInput;
