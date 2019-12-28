import React, { useState } from "react";
import CheckBoxInput from "./CheckBoxInput.js";

const CheckBoxInputPage = () => {
  const [checkBoxState, setCheckBoxState] = useState({
    id: "checkbox-6",
    helperText:
      'When a checkbox triggers an action, a feedback context of <code>busy</code> provides a loading state. The feedback provided must communicate what action is occurring on which checkbox. When an action has completed, the feedback provided must identify which checkbox it is referring to. Updates to feedback will be read assertively by screen readers, unless the "polite" prop is passed.',
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
    <div>
      <h1>CheckBox</h1>
      <div className="section">
        <CheckBoxInput
          disabled={true}
          id="checkbox-1"
          label="Disabled check box"
          name="disabledCheckbox"
        />
      </div>
      <div className="section">
        <CheckBoxInput
          id="checkbox-2"
          label="Plain checkbox with label"
          name="plainCheckbox"
        />
      </div>
      <div className="section">
        <CheckBoxInput
          helperText="An optional text block used to provide context about the checkbox. It will be read by screen readers after the checkbox label, state, and role. "
          id="checkbox-3"
          label="Plain checkbox with label and description"
          name="fancyCheckbox"
        />
      </div>
      <div className="section">
        <CheckBoxInput
          feedbackText="You must agree to our terms and conditions."
          helperText="When feedback is present, it will be read  by screen readers. When feedback is updated, it will be read <strong>assertively</strong> by the screen reader <em>(it will interupt whatever is being spoken)</em>. Feedback text must contain enough information so that the user can easily identify which element is generating the feedback."
          id="checkbox-4"
          isValid={false}
          label="Invalid checkbox with feedback"
          name="invalidCheckbox"
        />
      </div>
      <div className="section">
        <CheckBoxInput
          feedbackContext="success"
          feedbackText="You have been subscribed to receive email updates."
          helperText="With the <code>polite</code> prop, feedback will be read <strong>politely</strong> by screen <em>(after the checkbox label, state, and role)</em>, Feedback text must contain enough information so that the user can easily identify which element is generating the feedback. Only use <code>polite</code> if you know what you're doing!"
          id="checkbox-5"
          label="I'd like to receive periodic updates via email"
          name="politeCheckbox"
          polite
          value={true}
        />
      </div>
      <div className="section">
        <CheckBoxInput {...checkBoxState} onChange={handleCheckboxChange} />
      </div>
    </div>
  );
};

export default CheckBoxInputPage;
