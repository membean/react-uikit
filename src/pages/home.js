import React, { useEffect, useState } from "react";
import CheckBoxInput from "../lib/components/CheckBoxInput/CheckBoxInput.js";
import FileBrowserInput from "../lib/components/FileBrowserInput/FileBrowserInput.js";
import ProgressBar from "../lib/components/ProgressBar/ProgressBar.js";
import RadioGroupInput from "../lib/components/RadioGroupInput/RadioGroupInput.js";
import SelectInput from "../lib/components/SelectInput/SelectInput.js";
import StandaloneCheckBoxInput from "../lib/components/CheckBoxInput/StandaloneCheckBoxInput.js";
import StandaloneFileBrowserInput from "../lib/components/FileBrowserInput/StandaloneFileBrowserInput.js";
import StandaloneRadioGroupInput from "../lib/components/RadioGroupInput/StandaloneRadioGroupInput.js";
import StandaloneSelectInput from "../lib/components/SelectInput/StandaloneSelectInput.js";
import StandaloneTextInput from "../lib/components/TextInput/StandaloneTextInput.js";
import TextInput from "../lib/components/TextInput/TextInput.js";

const HomePage = () => {
  /* Form */
  const initialState = {
    antiCheat: {
      isValid: true,
      value: false
    },
    difficulty: {
      isValid: true,
      value: "regular"
    },
    files: {
      isValid: true,
      value: ""
    },
    name: {
      isValid: true,
      value: ""
    },
    targetStudents: {
      isValid: true,
      value: null
    },
    valid: true
  };

  const [formState, setformState] = useState(initialState);

  const handleInputChange = input => (event, value) => {
    setformState({ ...formState, [input]: { value: value } });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    let newState = initialState;

    if (formState.valid) {
      const antiCheat = {
        ...formState.antiCheat,
        feedbackText: "You must enable cheating detection.",
        isValid: false,
        value: false
      };

      const files = {
        ...formState.files,
        feedbackText: "You must select a file to upload.",
        isValid: false
      };

      const name = {
        ...formState.name,
        feedbackText: "You must enter a name for this quiz.",
        isValid: false,
        value: ""
      };

      const difficulty = {
        ...formState.difficulty,
        feedbackText: "Hard quizzes can cause problems for some students.",
        isValid: false,
        value: "hard"
      };

      const targetStudents = {
        ...formState.targetStudents,
        feedbackText: "You must select students to assign this quiz to.",
        isValid: false,
        value: null
      };

      newState = {
        ...formState,
        antiCheat,
        files,
        name,
        difficulty,
        targetStudents,
        valid:
          antiCheat.isValid &&
          difficulty.isValid &&
          files.isValid &&
          name.isValid &&
          targetStudents.isValid
      };
    }

    setformState(newState);
  };

  /* Radio Group */
  const radioOptions = [
    {
      helperText:
        "Assign this quiz to all students in this class, regardless of whether or not they are prepared for it.",
      label: "All students",
      value: "all-students"
    },
    {
      helperText:
        "Assign this quiz only to prepared students. Currently, 15 students are prepared for a 25 question quiz in this class. Links should be avoided in these descriptions, as they mess with the tab order for non-sighted users.",
      label: "Prepared students only",
      value: "prepared"
    },
    {
      helperText: "Assign this quiz only to specific students from this class.",
      label: "Specific students",
      value: "specific"
    }
  ];

  /* Select Menu */
  const selectOptions = [
    { label: "Hard", value: "hard" },
    { label: "Normal", value: "regular" },
    { label: "Easy", value: "easy" }
  ];

  /* Progress Bar */
  const [progressState, setprogressState] = useState({
    message: "",
    progress: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const progress = progressState.progress;
      if (progress < 100) {
        setprogressState({
          message: `Your file is ${progress}% uploaded.`,
          progress: progress + 1
        });
      } else {
        setprogressState({
          message: "Your file has been uploaded."
        });
        clearTimeout(timer);
      }
    }, 100);
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Sample Form</h1>
      <p>
        All components comply with{" "}
        <a
          href="https://www.w3.org/TR/WCAG21/"
          target="_blank"
          rel="noopener noreferrer"
        >
          WCAG 2.1
        </a>
        , and are consistent with the{" "}
        <a
          href="https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex"
          target="_blank"
          rel="noopener noreferrer"
        >
          ARIA design patterns
        </a>
        . Care must be taken when working with forms, as each input component
        can also be used as a standalone control. In this example form,
        validation is done when the form is submitted, so each control is set to{" "}
        <tt>polite</tt> to ensure that each live region does not interupt each
        other.
      </p>
      <div className="section">
        <TextInput
          feedbackContext={formState.name.feedbackContext}
          feedbackText={formState.name.feedbackText}
          id="text-input-1"
          isValid={formState.name.isValid}
          label="Quiz name:"
          name="name"
          onChange={handleInputChange("name")}
          polite
          value={formState.name.value}
        />
      </div>
      <div className="section">
        <RadioGroupInput
          feedbackContext={formState.targetStudents.feedbackContext}
          feedbackText={formState.targetStudents.feedbackText}
          id="radio-group-1"
          isValid={formState.targetStudents.isValid}
          label="Which students would you like to assign this quiz to?"
          name="targetStudents"
          onChange={handleInputChange("targetStudents")}
          options={radioOptions}
          polite
          value={formState.targetStudents.value}
        />
      </div>
      <div className="section">
        <SelectInput
          feedbackContext={formState.difficulty.feedbackContext}
          feedbackText={formState.difficulty.feedbackText}
          helperText="Here we have a chance to explain what it means when selecting a difficulty. If absolutesly necessary, we can link to a support article here, but that should be considered a failure, since it will mess with the tab order for sight impaired users."
          id="select-menu-1"
          isValid={formState.difficulty.isValid}
          label="How difficult would you like this quiz to be?"
          name="difficulty"
          onChange={handleInputChange("difficulty")}
          options={selectOptions}
          polite
          value={formState.difficulty.value}
        />
      </div>
      <div className="section">
        <CheckBoxInput
          feedbackContext={formState.antiCheat.feedbackContext}
          feedbackText={formState.antiCheat.feedbackText}
          helperText="Here we have a chance to briefly explain what cheating detection is, and what will happen if someone selects this option."
          id="checkbox-1"
          isValid={formState.antiCheat.isValid}
          label="Enable cheating detection?"
          name="antiCheat"
          onChange={handleInputChange("antiCheat")}
          polite
          value={formState.antiCheat.value}
        />
      </div>
      <div className="section">
        <FileBrowserInput
          feedbackContext={formState.files.feedbackContext}
          feedbackText={formState.files.feedbackText}
          helperText="Explain what file the user is expected to upload, including any requirements like file size, file type, etc."
          id="file-browser-1"
          isValid={formState.files.isValid}
          label="Would you like to upload a file?"
          name="fileUpload"
          onChange={handleInputChange("files")}
          polite
          value={formState.files.value}
        />
      </div>
      <div className="section">
        <label
          style={{
            display: "block",
            fontWeight: "bold",
            marginBottom: "0.5rem"
          }}
        >
          Progress Bar:
        </label>
        <ProgressBar
          description={progressState.message}
          id="progress-bar-1"
          label="Uploading File"
          tooltip="bottom"
          value={parseInt(progressState.progress)}
        />
      </div>
      <div className="section">
        <button className="btn control" type="submit">
          {`${formState.valid ? "Show validation" : "Reset form"}`}
        </button>
      </div>
      <h2>Standalone Controls</h2>
      <p>
        When using each input as a standalone control, do <strong>not</strong>{" "}
        use the <tt>polite</tt> option to ensure that feedback is read right
        away by screen reader. For example, this control simulates updating a
        setting. Check the box to simulate a successful update, and uncheck the
        box to simulate a failure to update the setting.
      </p>
      <StandaloneCheckBoxInput />
      <StandaloneFileBrowserInput />
      <StandaloneRadioGroupInput />
      <StandaloneSelectInput />
      <StandaloneTextInput />
    </form>
  );
};

export default HomePage;
