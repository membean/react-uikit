import React, { useState } from "react";
import SelectInput from "./SelectInput.js";

const StandaloneSelectInput = () => {
  const options = [
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
    helperText:
      "We'll only send you emails once a day, but they'll seem like they are coming from someone you know, so we think that you'll really enjoy them.",
    id: "select-menu-5",
    label: "Select a newsletter to subscribe to:",
    name: "mySelectMenu",
    options: options
  });

  const handleSelectChange = (_event, value) => {
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
    <div className="section">
      <SelectInput {...selectState} onChange={handleSelectChange} />
    </div>
  );
};

export default StandaloneSelectInput;
