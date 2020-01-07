import React from "react";
import RadioGroupInput from "../lib/components/RadioGroupInput/RadioGroupInput.js";
import StandaloneRadioGroupInput from "../lib/components/RadioGroupInput/StandaloneRadioGroupInput.js";

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
      <StandaloneRadioGroupInput />
    </div>
  );
};

export default RadioGroupInputPage;
