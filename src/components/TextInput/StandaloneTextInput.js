import React, { useState } from "react";
import TextInput from "./TextInput.js";

const StandaloneTextInput = () => {
  const [textInputState, setTextInputState] = useState({
    helperText:
      "We use the <tt>onBlur</tt> event here to trigger an action. Best practice is to use <tt>onBlur</tt> for things like validation, since validating with <tt>onChange</tt> is noisy and un-intuitive to a non-sighted user. Enter a value to simulate a successful update, and remove the value to simulate an update failure.",
    id: "appt-text-input",
    label: "Standalone Control:",
    name: "appTextInput",
    value: ""
  });

  const handleBlur = (event, value) => {
    if (value !== textInputState.value) {
      setTextInputState({
        ...textInputState,
        disabled: true,
        feedbackContext: "busy",
        feedbackText: "Updating setting&hellip;",
        value: value
      });
      setTimeout(() => {
        const feedback = {
          disabled: false,
          feedbackContext: value ? "success" : "error",
          feedbackText: value
            ? `Setting updated successfully.`
            : 'Uh, oh! Something went wrong updating your setting. Please try again. If you continue to have problems, please <a href="mailto:support@membean.com">contact support</a> for assistance.',
          value: value
        };
        setTextInputState({ ...textInputState, ...feedback });
      }, 2000);
    }
  };

  return (
    <div className="section">
      <TextInput {...textInputState} onBlur={handleBlur} />
    </div>
  );
};

export default StandaloneTextInput;
