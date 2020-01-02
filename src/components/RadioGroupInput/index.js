import React, { useState } from "react";
import RadioGroupInput from "./RadioGroupInput.js";

const RadioGroupInputPage = () => {
  const HELPTEXT =
    "An optional text block used to provide context about this radio group option. It will be read by screen readers after the option label, state, and role.";

  const simpleOptions = [
    {
      label: "First radio option",
      value: "1"
    },
    {
      label: "Second radio option",
      value: "2"
    }
  ];

  const enabledOptions = [
    {
      helperText: HELPTEXT,
      label: "First radio option",
      value: "1"
    },
    {
      helperText: HELPTEXT,
      label: "Second radio option",
      value: "2"
    }
  ];

  const mixedOptions = [
    {
      disabled: true,
      label: "First radio option",
      value: "1"
    },
    {
      label: "Second radio option",
      value: "2"
    }
  ];

  const moreOptions = [
    {
      helperText: HELPTEXT,
      label: "First radio option",
      value: "1"
    },
    {
      helperText: HELPTEXT,
      label: "Second radio option",
      value: "2"
    },
    {
      helperText: HELPTEXT,
      label: "Third radio option",
      value: "3"
    }
  ];

  const appOptions = [
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
    options: appOptions
  });

  const handleRadioGroupChange = (_event, value) => {
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
    <div>
      <h1>RadioGroup</h1>
      <div className="section">
        <RadioGroupInput
          disabled={true}
          id="radio-group-1"
          label="Disabled radio group"
          name="disabledRadioGroup"
          options={simpleOptions}
        />
      </div>
      <div className="section">
        <RadioGroupInput
          id="radio-group-2"
          label="Radio group with disabled item:"
          name="mixedRadioGroup"
          options={mixedOptions}
          value="1"
        />
      </div>
      <div className="section">
        <RadioGroupInput
          id="radio-group-3"
          label="Radio group with label and description:"
          name="labeledRadioGroup"
          options={enabledOptions}
        />
      </div>
      <div className="section">
        <RadioGroupInput
          feedbackText="You must select one of these options."
          id="radio-group-4"
          isValid={false}
          label="Invalid radio group with feedback:"
          name="invalidRadioGroup"
          options={enabledOptions}
        />
      </div>
      <div className="section">
        <RadioGroupInput
          feedbackContext="success"
          feedbackText="Your settings have been updated."
          id="radio-group-5"
          label="Valid radio group with feedback and preselected option:"
          name="validRadioGroup"
          options={moreOptions}
          value="2"
        />
      </div>
      <div className="section">
        <RadioGroupInput
          {...radioGroupState}
          onChange={handleRadioGroupChange}
        />
      </div>
    </div>
  );
};

export default RadioGroupInputPage;
