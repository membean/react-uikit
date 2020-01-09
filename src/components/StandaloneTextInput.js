import React, { useEffect, useRef, useState } from "react";
import TextInput from "../lib/components/TextInput/TextInput.js";

const StandaloneTextInput = () => {
  const inputEl = useRef(null);

  const [textInputState, setTextInputState] = useState({
    helperText:
      "We use the <tt>onBlur</tt> event here to trigger an action. Best practice is to use <tt>onBlur</tt> for things like validation, since validating with <tt>onChange</tt> is noisy and un-intuitive to a non-sighted user. Enter a value to simulate a successful update, and remove the value to simulate an update failure.",
    id: "appt-text-input",
    label: "Standalone Control:",
    name: "appTextInput",
    value: ""
  });

  useEffect(() => {
    if (textInputState.feedbackContext === "error") {
      inputEl.current.focus();
    }
  });

  const handleBlur = event => {
    setTextInputState({
      ...textInputState,
      disabled: true,
      feedbackContext: "busy",
      feedbackText: "Updating setting&hellip;"
    });
    setTimeout(() => {
      const inputHasContent = textInputState.value !== "";
      const feedback = {
        disabled: false,
        feedbackContext: inputHasContent ? "success" : "error",
        feedbackText: inputHasContent
          ? `Setting updated successfully.`
          : 'Uh, oh! Something went wrong updating your setting. Please try again. If you continue to have problems, please <a href="mailto:support@membean.com">contact support</a> for assistance.'
      };
      setTextInputState({ ...textInputState, ...feedback });
    }, 2000);
  };

  const handleChange = event => {
    const value = event.target.value;
    setTextInputState({
      ...textInputState,
      value
    });
  };

  return (
    <div className="section">
      <TextInput
        {...textInputState}
        onBlur={handleBlur}
        onChange={handleChange}
        ref={inputEl}
      />
    </div>
  );
};

export default StandaloneTextInput;
