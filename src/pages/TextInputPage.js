import React from "react";
import TextInput from "../lib/components/TextInput/TextInput.js";
import StandaloneTextInput from "../lib/components/TextInput/StandaloneTextInput.js";

const TextInputPage = () => {
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
      <StandaloneTextInput />
    </div>
  );
};

export default TextInputPage;
