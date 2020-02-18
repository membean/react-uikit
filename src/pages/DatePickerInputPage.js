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
          feedbackContext="error"
          feedbackText="Lorem ipsum dolor sit amet."
          helperText="Select a date between now and 1 year from now."
          id="date-picker-3"
          label="Datepicker:"
          name="datepicker"
          onChange={date => {
            // NOTE: Validator needs to verify the format with a regex
            //       How can we get the raw value of the input?
            const value = document.getElementById("date-picker-3").value;
            console.log(
              "Valid: ",
              value.match(
                /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2})+,\s+(\d{4})/
              )
                ? true
                : false
            );
            const dateIsMoment = moment.isMoment(date);
            if (dateIsMoment) {
              console.log("Date: ", date.tz(timezone).format("MMM D, YYYY"));
            } else {
              console.log("Value: ", date);
            }
          }}
          timezone={timezone}
          value={today}
        />
      </div>
    </div>
  );
};

export default DatePickerInputPage;
