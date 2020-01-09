import React, { useState } from "react";
import RadioGroupInput from "../lib/components/RadioGroupInput/RadioGroupInput.js";

const StandaloneRadioGroupInput = () => {
  const options = [
    {
      helperText:
        "An explanation of what difficult means exactly, and what will happen if someone selects this option.",
      label: "Difficult",
      value: "difficult"
    },
    {
      helperText:
        "An explanation of what regular means exactly, and what will happen if someone selects this option.",
      label: "Regular",
      value: "regular"
    },
    {
      helperText:
        "An explanation of what easy means exactly, and what will happen if someone selects this option.",
      label: "Easy",
      value: "easy"
    }
  ];

  const [radioGroupState, setradioGroupState] = useState({
    id: "radio-group-6",
    label: "Please select a difficulty:",
    name: "appRadioGroup",
    options: options
  });

  const handleRadioGroupChange = event => {
    const value = event.target.value;
    setradioGroupState({
      ...radioGroupState,
      disabled: true,
      feedbackContext: "busy",
      feedbackText: "Updating difficulty settings&hellip;"
    });
    setTimeout(() => {
      let feedback;
      if (value === "difficult") {
        feedback = {
          disabled: false,
          feedbackContext: "success",
          feedbackText: "Difficulty settings updated successfully."
        };
      } else if (value === "regular") {
        feedback = {
          disabled: false,
          feedbackContext: "error",
          feedbackText:
            "Uh, oh! Something went wrong updating your difficulty settings. Please try again."
        };
      } else {
        feedback = {
          disabled: false,
          feedbackContext: "info",
          feedbackText:
            "People that chose this setting also benefit from this information."
        };
      }
      setradioGroupState({ ...radioGroupState, ...feedback });
    }, 2000);
  };

  return (
    <div className="section">
      <RadioGroupInput {...radioGroupState} onChange={handleRadioGroupChange} />
    </div>
  );
};

export default StandaloneRadioGroupInput;
