import React from "react";
import TextArea from "../lib/components/TextArea/TextArea.js";

const TextAreaPage = () => {
  return (
    <div>
      <h1>Text Area</h1>
      <div className="section">
        <TextArea
          id="text-aria-1"
          label="Message:"
          name="textArea"
          placeholder="Placeholder"
        />
      </div>
      <div className="section">
        <TextArea disabled id="text-aria-2" label="Disabled:" name="textArea" />
      </div>
      <div className="section">
        <TextArea
          feedbackContext="success"
          feedbackText="Your message has been sent."
          id="text-aria-3"
          label="Message:"
          name="textArea"
        />
      </div>
      <div className="section">
        <TextArea
          feedbackContext="error"
          feedbackText="Please enter at least 10 characters."
          id="text-aria-4"
          isValid={false}
          label="Message:"
          name="textArea"
        />
      </div>
      <div className="section">
        <TextArea
          helperText="Some text to help you fill out this input."
          id="text-aria-5"
          label="Message:"
          name="textArea"
        />
      </div>
    </div>
  );
};

export default TextAreaPage;
