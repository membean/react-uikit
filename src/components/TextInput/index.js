import React, { useState } from "react";
import TextInput from "./TextInput.js";

const TextInputPage = () => {
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
    <div>
      <h1>Text Input</h1>
      <div className="section">
        <TextInput
          disabled
          id="text-input-1"
          label="Disabled:"
          name="disabledInput"
          placeholder="Placeholder"
        />
      </div>
      <div className="section">
        <TextInput
          id="text-input-2"
          helperText="Passwords must be at least 8 characters."
          label="Password:"
          name="passwordInput"
          type="password"
        />
      </div>
      <div className="section">
        <TextInput
          feedbackContext="success"
          feedbackText="Your information has been updated."
          id="text-input-3"
          label="Valid text input with feedback:"
          name="validInput2"
        />
      </div>
      <div className="section">
        <TextInput
          feedbackText="You must enter a value."
          id="text-input-4"
          isValid={false}
          helperText="Lorem ipsum dolor sit amet. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
          label="Invalid text input with feedback and description:"
          name="invalidInput"
        />
      </div>
      <div className="section">
        <TextInput
          id="text-input-5"
          inline
          label="Inline text input:"
          name="inlineInput"
        />
      </div>
      <div className="section">
        <TextInput
          id="text-input-6"
          inline
          isValid={false}
          label="Invalid inline text input:"
          name="inlineInput2"
        />
      </div>
      <div className="section">
        <TextInput {...textInputState} onBlur={handleBlur} />
      </div>
    </div>
  );
};

export default TextInputPage;
