import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*
  TODO: Verify props and proptypes
  
  Usage:
    
    <FileBrowserInput
      id="my-browser"
      label="Upload a file"
      name="fileUpload"
    />
  
  Props:

    disabled [Boolean] - Checkbox is disabled if true.
    feedbackContext [String] - One of "busy", "error", "info", or "success".
                               Defaults to "error".
    feedbackText [String] - Feedback text that will be read assertively.
    id [String] - (required) The HTML id attribute of the checkbox input.
    isValid [Boolean] - Displays invalid state if false.
    helperText [String] - Additional text to describe the checkbox.
    label [String] - (required) The checkbox text label.
    name [String] - (required) The HTML name attribute of the checkbox input.
    onChange [Function] - Fired when the checkbox changes, and receives the
                          event and value of the checkbox. 
    polite [Boolean] - Causes a screen reader to read the feedbackText politely.
    value [Boolean] - (required) The checkbox is checked if true.
*/

const FileBrowserInput = props => {
  const {
    disabled,
    feedbackContext,
    feedbackText,
    id,
    inline,
    isValid,
    helperText,
    label,
    name,
    onChange,
    polite,
    value
  } = props;

  const [state, setState] = useState({});

  useEffect(() => {
    setState({});
  }, [value]);

  const controlClasses = classnames("file", "control", {
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

  const handleChange = event => {
    const newValue = event.target.value;
    setState({ value: newValue });
    onChange && onChange(event, newValue);
  };

  /*
    TODO: Get the selected file name and display it instead of "Choose file...",
          or perhaps just change it to reflect that a file was selected. Ideally
          show the file name. Possible to say something like "2 files..."
  */

  return (
    <div className={controlClasses}>
      {!inline && (
        <label className="file-label" htmlFor={id}>
          {label}
        </label>
      )}
      <label className="file-browser-label">
        <input
          aria-describedby={getDescribedByIds()}
          aria-label={inline ? label : null}
          disabled={disabled}
          id={id}
          name={name}
          onChange={handleChange}
          type="file"
        />
        <span className="file-browser"></span>
      </label>
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
};

FileBrowserInput.propTypes = {
  disabled: PropTypes.bool,
  feedbackContext: PropTypes.oneOf(["busy", "error", "info", "success"]),
  feedbackText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  isValid: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  polite: PropTypes.bool,
  value: PropTypes.bool
};

export default FileBrowserInput;
