import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*
  Generates an accessible file browser for selecting files.
  
  Usage:
    
    <FileBrowserInput
      id="my-browser"
      label="Upload an image:"
      name="myFileUpload"
    />
  
  Props:

    classes [String] - Additional CSS classes that will be added to the control
      container div element.
    disabled [Boolean] - Disable the input element.
    feedbackContext [String] - One of "busy", "error", "info", or "success".
      Defaults to "error". Class will be added to the feedback div element.
    feedbackText [String] - Text that will be displayed as feedback. In order
      to be useful for non-sighted users, this text must identify the input
      that it refers to and a  clear message. By default, his text will be read
      by screen readers assertively when it is updated, such as when providing
      a loading message and then updating it with a confirmation message.
    id [String] - (Required) The id attribute of the input element.
    inline [Boolean] - Do not show the text label.
    isValid [Boolean] - Show the invalid state for the control.
    helperText [String] - Additional text that will be displayed to help the user
      get an idea of what this input is used for. This text will be read by
      screen readers when the input receives focus.
    label [String] - (required) The text label associated with the input.
    multiple [Boolean] - Allow multiple files to be selected.
    name [String] - (required) The name attribute of the input element.
    onBlur [Function] - A callback to be fired when the input element loses focus.
      Receives the event and input value as arguments.
    onChange [Function] - A callback to be fired when the input element is changed.
      Receives the event and input value as arguments.
    onFocus [Function] - A callback to be fired when the input element receives focus.
      Receives the event and input value as arguments.
    polite [Boolean] - Set the aria-live attribute of the feedback element to
      "polite". This will allow a screen reader to finish reading whatever it is reading, then read the feedback, as opposed to interupting.
*/

const FileBrowserInput = React.forwardRef((props, ref) => {
  const {
    classes,
    disabled,
    feedbackContext,
    feedbackText,
    id,
    inline,
    isValid,
    helperText,
    label,
    multiple,
    name,
    onBlur,
    onChange,
    onFocus,
    polite
  } = props;

  const [state, setState] = useState({
    prompt: "Choose file...",
    files: null
  });

  const controlClasses = classnames("file", "control", classes, {
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

  const handleBlur = event => {
    const files = event.target.files;
    onBlur && onBlur(event, files);
  };

  const handleChange = event => {
    const files = event.target.files;
    setState({ ...state, files: files, prompt: setPrompt(files) });
    onChange && onChange(event, files);
  };

  const handleFocus = event => {
    const files = event.target.files;
    onFocus && onFocus(event, files);
  };

  const setPrompt = files => {
    if (files.length > 1) {
      return `${files.length} files selected...`;
    } else if (files.length === 1) {
      return files[0].name;
    } else {
      return "Choose file(s)...";
    }
  };

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
          multiple={multiple || null}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          ref={ref}
          type="file"
          value={state.value}
        />
        <span aria-hidden="true" className="file-browser"></span>
        <span aria-hidden="true" className="file-browser-prompt">
          {state.prompt}
        </span>
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
});

FileBrowserInput.propTypes = {
  classes: PropTypes.string,
  disabled: PropTypes.bool,
  feedbackContext: PropTypes.oneOf(["busy", "error", "info", "success"]),
  feedbackText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  isValid: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  polite: PropTypes.bool
};

export default FileBrowserInput;
