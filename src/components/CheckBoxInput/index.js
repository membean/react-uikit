import React from "react";
import CheckBoxInput from "./CheckBoxInput.js";
import StandaloneCheckBoxInput from "./StandaloneCheckBoxInput.js";

const CheckBoxInputPage = () => {
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
      <StandaloneCheckBoxInput />
    </div>
  );
};

export default CheckBoxInputPage;
