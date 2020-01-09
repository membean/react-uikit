import React from "react";
import SelectInput from "../lib/components/SelectInput/SelectInput.js";
import StandaloneSelectInput from "../components/StandaloneSelectInput.js";

const SelectInputPage = () => {
  const HELPER_TEXT =
    "An optional text block used to provide context about this select menu. It will be read by screen readers after the select label, state, and role.";

  const selectOptions = [
    { label: "First Option", value: "1" },
    { label: "Second Option", value: "2" },
    { label: "Third Option", value: "3" }
  ];

  return (
    <div>
      <h1>Select Menu</h1>
      <div className="section">
        <SelectInput
          blankOption="Disabled select menu with no label"
          disabled
          id="select-menu-1"
          name="mySelectMenu"
          options={selectOptions}
        />
      </div>
      <div className="section">
        <SelectInput
          blankOption="Enabled select menu with no label"
          id="select-menu-2"
          name="mySelectMenu"
          options={selectOptions}
        />
      </div>
      <div className="section">
        <SelectInput
          blankOption="Invalid select menu with no label and feedback"
          feedbackText="You must make a selection."
          id="select-menu-3"
          isValid={false}
          name="mySelectMenu"
          options={selectOptions}
        />
      </div>
      <div className="section">
        <SelectInput
          blankOption="Valid select menu with no label, feedback and description"
          feedbackContext="success"
          feedbackText="Your setting has been updated."
          helperText={HELPER_TEXT}
          id="select-menu-4"
          name="mySelectMenu"
          options={selectOptions}
        />
      </div>
      <div className="section">
        <SelectInput
          blankOption="Select an option..."
          disabled
          id="select-menu-6"
          inline
          label="Disabled select menu with inline label:"
          name="mySelectMenu"
          options={selectOptions}
        />
      </div>
      <div className="section">
        <SelectInput
          blankOption="Select an option..."
          id="select-menu-7"
          inline
          label="Select menu with inline label:"
          name="mySelectMenu"
          options={selectOptions}
        />
      </div>
      <div className="section">
        <SelectInput
          blankOption="Select an option..."
          disabled
          id="select-menu-6"
          label="Disabled select menu with block label:"
          name="mySelectMenu"
          options={selectOptions}
        />
      </div>
      <div className="section">
        <SelectInput
          blankOption="Select an option..."
          id="select-menu-8"
          label="Select menu with block label:"
          name="mySelectMenu"
          options={selectOptions}
        />
      </div>
      <div className="section">
        <SelectInput
          blankOption="Select an option..."
          feedbackText="You must select an option."
          id="select-menu-8"
          isValid={false}
          label="Select menu with block label and feedback:"
          name="mySelectMenu"
          options={selectOptions}
        />
      </div>
      <div className="section">
        <SelectInput
          blankOption="Select an option..."
          feedbackContext="success"
          feedbackText="Your settings have been updated."
          helperText={HELPER_TEXT}
          id="select-menu-8"
          label="Select menu with block label, feedback, and description:"
          name="mySelectMenu"
          options={selectOptions}
        />
      </div>
      <StandaloneSelectInput />
    </div>
  );
};

export default SelectInputPage;
