import React from "react";
import DatePickerInput from "../lib/components/DatePickerInput/DatePickerInput.js";
import moment from "moment-timezone";

const DatePickerInputPage = () => {
  const timezone = "America/Los_Angeles";
  const today = moment.tz(timezone);

  return (
    <div>
      <h1>DatePicker</h1>
      <div className="section">
        <DatePickerInput
          disabled={true}
          id="date-picker-1"
          label="Disabled:"
          name="disabledDP"
          timezone={timezone}
          value={today}
        />
      </div>
      <div className="section">
        <DatePickerInput
          id="date-picker-2"
          isValid={false}
          label="Invalid:"
          name="invalidDP"
          timezone="Europe/London"
          value={today}
        />
      </div>
      <div className="section">
        <DatePickerInput
          helperText="Select a date between now and 1 year from now."
          id="date-picker-3"
          label="Datepicker:"
          name="datepicker"
          onChange={console.log("Changed")}
          timezone={timezone}
          value="2020-02-24"
        />
      </div>
      <div className="section">
        <DatePickerInput
          feedbackContext="error"
          feedbackText="Lorem ipsum dolor sit amet."
          id="date-picker-4"
          label="Datepicker:"
          name="datepicker"
          onChange={console.log("Changed")}
          timezone={timezone}
          value="2020-02-24"
        />
      </div>
      <div className="section">
        <DatePickerInput
          feedbackContext="success"
          feedbackText="Lorem ipsum dolor sit amet."
          helperText="Select a date between now and 1 year from now."
          id="date-picker-4"
          label="Datepicker:"
          name="datepicker"
          onChange={console.log("Changed")}
          timezone={timezone}
          value="2020-02-24"
        />
      </div>
    </div>
  );
};

export default DatePickerInputPage;
