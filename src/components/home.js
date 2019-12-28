import React, { useState } from "react";
import CheckBoxInput from "./CheckBoxInput/CheckBoxInput.js";
import RadioGroupInput from "./RadioGroupInput/RadioGroupInput.js";
import SelectInput from "./SelectInput/SelectInput.js";
import TextInput from "./TextInput/TextInput.js";

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
        name,
        difficulty,
        targetStudents,
        valid:
          antiCheat.isValid &&
          difficulty.isValid &&
          name.isValid &&
          targetStudents.isValid
      };
    }
    // TODO: Focus on the first element with an error (should not be polite)
    // TODO: Why don't inputs reset back to their original values?
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
        'Assign this quiz only to prepared students. Currently, <a href="#">15 students are prepared for a 25 question quiz</a> in this class.',
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

  /* Standalone Checkbox */
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
        <tt>polite</tt> to ensure that each live region is read.
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
          helperText='Here we have a chance to explain what it means when selecting a difficulty, and someone can <a href="#" target="_blank" rel="noopener noreferrer">learn more about quiz difficulty settings</a> by reading a support article.'
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
          helperText='Here we have a chance to briefly explain what cheating detection is, and someone can <a href="#" target="_blank" rel="noopener noreferrer">learn more about cheating detection on quizzes</a> by reading a support article.'
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
      <div className="section">
        <CheckBoxInput {...checkBoxState} onChange={handleCheckboxChange} />
      </div>
    </form>
  );
};

export default HomePage;
