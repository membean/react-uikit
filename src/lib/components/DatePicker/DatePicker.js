import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import moment from "moment-timezone";

/*
  Generates an datepicker element:
  https://github.com/YouCanBookMe/react-datetime

  Not totally accessible, but very close.
  
  Usage:
    
    <DatePicker
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
    maxDate [String] - Used to specify the max year available in the Date Picker.
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

const DatePicker = React.forwardRef((props, ref) => {
  const {
    classes,
    disabled,
    feedbackContext,
    feedbackText,
    id,
    isValid,
    helperText,
    label,
    maxDate,
    name,
    onBlur,
    onChange,
    onFocus,
    polite,
    required,
    timezone,
    value,
  } = props;
  const formattedExamDate = value && moment.tz(value, timezone);
  const selectedExamDay = value && formattedExamDate.date().toString();
  const selectedExamMonth = value && formattedExamDate.format("MMMM");
  const selectedExamYear = value && formattedExamDate.year().toString();

  const maxYear = maxDate
    ? moment.tz(maxDate, timezone).year()
    : moment.tz(timezone).year() + 4;

  const containerClasses = classnames("select", "container", {
    disabled,
    invalid: isValid === false,
  });
  const feedbackClasses = classnames(
    "control-feedback",
    `${feedbackContext || "error"}`,
    {
      "visually-hidden": !feedbackText,
    }
  );
  const feedbackId = `${id}-feedback`;
  const fieldsetClasses = classnames("datepicker", "control", classes, {
    disabled,
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

  const generateDaysOptions = () => {
    const isYearInRange = generateYearsOptions().find(
      (year) => !year.disabled && year.value === selectedExamYear
    );
    return Array.from(
      {
        length: moment(
          `${selectedExamMonth} ${selectedExamYear}`,
          "MMMM YYYY"
        ).daysInMonth(),
      },
      (_, i) => {
        const dateNumber = i + 1;
        return {
          disabled: !isYearInRange,
          label: dateNumber.toString(),
          value: dateNumber.toString(),
        };
      }
    );
  };

  const generateYearsOptions = () => {
    let yearOptions = [];
    for (let i = moment.tz(timezone).year(); i <= maxYear; i++) {
      yearOptions.push({
        label: i.toString(),
        value: i.toString(),
      });
    }

    if (yearOptions.find((year) => year.value === selectedExamYear)) {
      return yearOptions;
    } else {
      return [
        {
          disabled: true,
          label: selectedExamYear,
          value: selectedExamYear,
        },
        ...yearOptions,
      ];
    }
  };

  const longMonthNames = moment.months();

  const generateMonthOptions = () =>
    longMonthNames.map((m) => {
      return {
        disabled: !generateYearsOptions().find(
          (year) => !year.disabled && year.value === selectedExamYear
        ),
        label: m,
        value: m,
      };
    });

  const options = {
    days: generateDaysOptions(),
    months: generateMonthOptions(),
    years: generateYearsOptions(),
  };

  const renderOptions = (unit) => {
    let optionsHTML = options[unit].map((option, index) => {
      const optionId = `${id}-${unit}-option-${index + 1}`;

      return (
        <option
          disabled={option.disabled}
          id={optionId}
          key={index + 1}
          value={option.value}
        >
          {option.label}
        </option>
      );
    });
    return optionsHTML;
  };

  const handleSelectChange = (e) => {
    let momentString;
    if (e.target.name.indexOf("Month") > -1) {
      momentString = `${e.target.value} ${selectedExamDay}, ${selectedExamYear}`;
    } else if (e.target.name.indexOf("Day") > -1) {
      momentString = `${selectedExamMonth} ${e.target.value}, ${selectedExamYear}`;
    } else if (e.target.name.indexOf("Year") > -1) {
      momentString = `${selectedExamMonth} ${selectedExamDay}, ${e.target.value}`;
    }
    return (
      momentString &&
      onChange("examDate", moment(momentString, "MM-DD-YYYY").toISOString())
    );
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
            onChange={handleSelectChange}
            onFocus={onFocus}
            required={required}
            value={selectedExamMonth}
          >
            <option style={{ display: "none" }} value="">
              Month
            </option>
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
            onChange={handleSelectChange}
            onFocus={onFocus}
            required={required}
            value={selectedExamDay}
          >
            <option style={{ display: "none" }} value="">
              Day
            </option>
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
            onChange={handleSelectChange}
            onFocus={onFocus}
            required={required}
            value={selectedExamYear}
          >
            <option style={{ display: "none" }} value="">
              Year
            </option>
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

DatePicker.propTypes = {
  classes: PropTypes.string,
  disabled: PropTypes.bool,
  feedbackContext: PropTypes.oneOf(["busy", "error", "info", "success"]),
  feedbackText: PropTypes.string,
  id: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  maxDate: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  polite: PropTypes.bool,
  required: PropTypes.bool,
  timezone: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default DatePicker;
