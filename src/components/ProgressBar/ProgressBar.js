import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*

  TODO: Verify props and proptypes

  TODO: Must always have description and label.
  
  Usage:
    
    <ProgressBar />
  
  Props:

*/

const ProgressBar = props => {
  const { classes, description, id, label, max, tooltip, value } = props;

  const controlClasses = classnames("progress", "control", classes);
  const descriptionClasses = classnames("progress-description", { tooltip });
  const descriptionId = `${id}-label`;

  // TODO: Lots of calculations around the tooltip based on screen size, position,
  //       size of the progress bar, etc.

  return (
    <div className={controlClasses}>
      <div
        aria-describedby={descriptionId}
        aria-label={label}
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={value}
        className="progress-bar"
        role="progressbar"
      >
        <div className="progress-meter" style={{ width: `${value}%` }}></div>
      </div>
      <div aria-hidden="true" className={descriptionClasses} id={descriptionId}>
        {description}
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  classes: PropTypes.string,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  tooltip: PropTypes.bool,
  value: PropTypes.number.isRequired
};

export default ProgressBar;
