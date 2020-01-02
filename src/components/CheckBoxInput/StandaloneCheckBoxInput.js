import React, { useState } from "react";
import CheckBoxInput from "./CheckBoxInput.js";

const StandaloneCheckBoxInput = () => {
  const [checkBoxState, setCheckBoxState] = useState({
    id: "standalone-checkbox",
    helperText:
      "Checking this box will remove timers when you are answering questions during training and taking quizzes. You'll still be timed, but you won't see the timers.",
    isValid: true,
    label: "Hide timers during training and quizzes",
    name: "appCheckbox",
    value: false
  });

  const handleCheckboxChange = (_event, value) => {
    setCheckBoxState({
      ...checkBoxState,
      disabled: true,
      feedbackContext: "busy",
      feedbackText: "Updating timer settings&hellip;"
    });
    setTimeout(() => {
      const feedback = {
        disabled: false,
        feedbackContext: value ? "success" : "error",
        feedbackText: value
          ? `Timer settings updated successfully.`
          : 'Uh, oh! Something went wrong updating your timer settings. Please try again. If you continue to have problems, please <a href="mailto:support@membean.com">contact support</a> for assistance.'
      };
      setCheckBoxState({ ...checkBoxState, ...feedback });
    }, 2000);
  };

  return (
    <div className="section">
      <CheckBoxInput {...checkBoxState} onChange={handleCheckboxChange} />
    </div>
  );
};

export default StandaloneCheckBoxInput;