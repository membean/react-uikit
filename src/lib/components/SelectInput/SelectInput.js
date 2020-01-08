import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*
  Generates an accessible, stylable select menu.
  
  Usage:
    
    <SelectInput
      id="my-checkbox"
      label="Agree to the terms and conditions"
      name="myCheckbox"
      value={false}
    />
  
  Props:

    blankOption [String] - A blank menu option to serve as a prompt. Should be
      used when using the "inline" prop to provide an appropriate label for
      both sighted users and screen readers. If not used, the first option will
      be displayed to the user. This can also be used to provide an additional
      prompt or empty state for the select menu.
    classes [String] - Additional CSS classes that will be added to the control
      container div element.
    disabled [Boolean] - Disable the select elements.
    feedbackContext [String] - One of "busy", "error", "info", or "success".
      Defaults to "error". Class will be added to the feedback div element.
    feedbackText [String] - Text that will be displayed as feedback. In order to
      be useful for non-sighted users, this text must identify the select menu that
      it refers to and a  clear message. By default, his text will be read by screen
      readers assertively when it is updated, such as when providing a loading
      message and then updating it with a confirmation message.
    helperText [String] - Additional text that will be displayed to help the user
      get an idea of what this input is used for. This text will be read by screen
      readers when the input receives focus.
    id [String] - (Required) The id attribute of the select element.
    inline [Boolean] - Show the label as an inline element.
    isValid [Boolean] - Show the invalid state for the control.
    label [String] - The text label associated with the select element.
      Will not be rendered if 
    name [String] - (required) The name attribute for the select element.
    onBlur [Function] - A callback to be fired when the select menu loses focus.
      Receives the event and option value as arguments.
    onChange [Function] - A callback to be fired when one of the options is
      selected. Receives the event and option value as arguments.
    onFocus [Function] - A callback to be fired when the select menu receives
      focus. Receives the event and option value as arguments.
    options [Array] - (Required) An array of objects representing option elements. Each
      option can have the following shape:
        label [String] - (Required) The text label associated with the option.
        value [String] - (Required) The option value.
    polite [Boolean] - Set the aria-live attribute of the feedback element to
      "polite". This will allow a screen reader to finish reading whatever it
      is reading, then read the feedback, as opposed to interupting.
    value [String] - The value of the selected option (if there is one).
*/

const SelectInput = React.forwardRef((props, ref) => {
  const {
    blankOption,
    classes,
    disabled,
    feedbackContext,
    feedbackText,
    helperText,
    id,
    inline,
    isValid,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    options,
    polite,
    value
  } = props;

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
          defaultValue={value}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          ref={ref}
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
});

SelectInput.propTypes = {
  blankOption: PropTypes.string,
  classes: PropTypes.string,
  disabled: PropTypes.bool,
  feedbackContext: PropTypes.oneOf(["busy", "error", "info", "success"]),
  feedbackText: PropTypes.string,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  inline: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
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
