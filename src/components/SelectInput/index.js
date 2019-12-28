import React, { useState } from "react";
import SelectInput from "./SelectInput.js";

const SelectInputPage = () => {
  const HELPER_TEXT =
    "An optional text block used to provide context about this select menu. It will be read by screen readers after the select label, state, and role.";

  const selectOptions = [
    { label: "First Option", value: "1" },
    { label: "Second Option", value: "2" },
    { label: "Third Option", value: "3" }
  ];

  const subscribeOptions = [
    {
      label: "Get special offers from us every hour, on the hour",
      value: "special-offers"
    },
    {
      label:
        "Find out about new releases literally the second they are announced",
      value: "new-releases"
    },
    {
      label: "Learn about upcoming events that you can attend",
      value: "upcoming-events"
    }
  ];

  const [selectState, setSelectState] = useState({
    blankOption: "Choose wisely...",
    fullWidth: true,
    helperText:
      "We'll only send you emails once a day, but they'll seem like they are coming from someone you know, so we think that you'll really enjoy them.",
    id: "select-menu-5",
    label: "Select a newsletter to subscribe to:",
    name: "mySelectMenu",
    options: subscribeOptions
  });

  const handleSelectChange = (_event, value) => {
    console.log("Value: ", value);
    setSelectState({
      ...selectState,
      disabled: true,
      feedbackContext: "busy",
      feedbackText: "Updating subscription settings&hellip;"
    });
    setTimeout(() => {
      let feedback = {
        disabled: false
      };

      if (value === "special-offers") {
        feedback = {
          ...feedback,
          feedbackContext: "success",
          feedbackText: "We're going to really hammer you with special offers!"
        };
      } else if (value === "new-releases") {
        feedback = {
          ...feedback,
          feedbackContext: "error",
          feedbackText:
            'Uh, oh! Something went wrong updating your newsletter subsription settings. Please try again. If you continue to have problems, please <a href="mailto:support@membean.com">contact support</a> for assistance.'
        };
      } else if (value === "upcoming-events") {
        feedback = {
          ...feedback,
          feedbackContext: "info",
          feedbackText: "Special events are our specialty."
        };
      } else {
        console.log("Trapped");
        feedback = {
          ...feedback,
          feedbackContext: null,
          feedbackText: null
        };
      }
      setSelectState({ ...selectState, ...feedback });
    }, 2000);
  };

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
      <div className="section">
        <SelectInput {...selectState} onChange={handleSelectChange} />
      </div>
    </div>
  );
};

export default SelectInputPage;
