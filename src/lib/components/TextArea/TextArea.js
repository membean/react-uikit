import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*
  Generates an accessible text area element.
  
  Usage:
    
    
  Props:
    
*/

const TextArea = React.forwardRef((props, ref) => {
  const {
    autoComplete,
    classes,
    cols,
    disabled,
    feedbackContext,
    feedbackText,
    id,
    isValid,
    helperText,
    label,
    maxLength,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    polite,
    readOnly,
    required,
    rows,
    value,
    wrap
  } = props;

  const controlClasses = classnames("text", "control", classes, {
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

  return (
    <div className={controlClasses}>
      <label htmlFor={id}>{label}</label>
      <textarea
        aria-describedby={getDescribedByIds()}
        autoComplete={autoComplete || "off"}
        className={inputClasses}
        cols={cols || null}
        disabled={disabled}
        id={id}
        name={name}
        maxLength={maxLength || null}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder || null}
        readOnly={readOnly || null}
        required={required}
        ref={ref}
        rows={rows || null}
        value={value}
        wrap={wrap || null}
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

TextArea.propTypes = {
  autoComplete: PropTypes.string,
  classes: PropTypes.string,
  cols: PropTypes.number,
  disabled: PropTypes.bool,
  feedbackContext: PropTypes.oneOf(["busy", "error", "info", "success"]),
  feedbackText: PropTypes.string,
  id: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  polite: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
  value: PropTypes.string,
  wrap: PropTypes.oneOf(["hard", "soft"])
};

export default TextArea;
