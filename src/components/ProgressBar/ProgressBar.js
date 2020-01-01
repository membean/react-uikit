import React, { useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*

  Generates an accessible, styleable progress bar with optional tooltip on hover.
  
  Usage:
    
    <ProgressBar
      description="Lorem ipsum dolor sit amet."
      id="my-progress-bar"
      label="Level 1"
      vale={75}
    />
  
  Props:

    classes [String] - Additional CSS classes that will be added to the control
      container div element.
    description [String] - (Required) Text that will be read by a screen reader
      explaining the progress information. For example, VoiceOver will read
      "Level 1, 75 percent, progress indicator. Lorem ipsum dolor sit amet."
      for the above example. This information will also be displayed in the
      optional tooltip if selected. However, this text should always be crafted
      to service non-sighted users.
    id [String] - (Required) The id attribute of the input element.
    label [String] - (required) Text that will be read by a screen reader.
    tooltip [String] - One of "bottom", "left", "right" and "top". Displays the description text as a tooltip on hover. The tooltip position will match
      the value given, but will be updated if the tooltip will not be visible.
      The "default" tooltip is a full-screen, mobile friendly version.
    value [Integer] - Expects an integer representing the percent complete (0-100).
      Defaults to 0.
*/

const ProgressBar = props => {
  const { classes, description, id, label, tooltip, value } = props;
  const tooltipRef = useRef(null);

  const controlClasses = classnames("progress", "control", classes);
  const descriptionClasses = classnames("progress-description", {
    tooltip,
    [`tooltip-${tooltip}`]: tooltip
  });
  const descriptionId = `${id}-label`;

  const handleMouseEnter = event => {
    const currentTooltip = tooltipRef.current;
    const bounds = currentTooltip.getBoundingClientRect();

    const spaceAbove = bounds.top > 1;
    const spaceBelow = bounds.bottom < window.innerHeight - 1;
    const spaceLeft = bounds.left > 1;
    const spaceRight = bounds.right < window.innerWidth - 1;

    const replacePosition = newPosition => {
      currentTooltip.classList.replace(
        `tooltip-${tooltip}`,
        `tooltip-${newPosition}`
      );
    };

    switch (tooltip) {
      case "bottom":
        if (!spaceBelow) {
          if (spaceAbove) {
            replacePosition("top");
          } else if (spaceLeft) {
            replacePosition("left");
          } else if (spaceRight) {
            replacePosition("right");
          } else {
            replacePosition("default");
          }
        }
        break;
      case "left":
        if (!spaceLeft) {
          if (spaceRight) {
            replacePosition("right");
          } else if (spaceAbove) {
            replacePosition("top");
          } else if (spaceBelow) {
            replacePosition("bottom");
          } else {
            replacePosition("default");
          }
        }
        break;
      case "right":
        if (!spaceRight) {
          if (spaceLeft) {
            replacePosition("left");
          } else if (spaceAbove) {
            replacePosition("top");
          } else if (spaceBelow) {
            replacePosition("bottom");
          } else {
            replacePosition("default");
          }
        }
        break;
      default:
        // NOTE: Defaults to "top"
        if (!spaceAbove) {
          if (spaceBelow) {
            replacePosition("bottom");
          } else if (spaceLeft) {
            replacePosition("left");
          } else if (spaceRight) {
            replacePosition("right");
          } else {
            replacePosition("default");
          }
        }
        break;
    }
  };

  return (
    <div className={controlClasses}>
      <div
        aria-describedby={descriptionId}
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value ? parseInt(value) : 0}
        className="progress-bar"
        onMouseEnter={handleMouseEnter}
        role="progressbar"
      >
        <div className="progress-meter" style={{ width: `${value}%` }}></div>
      </div>
      <span
        aria-hidden="true"
        className={descriptionClasses}
        id={descriptionId}
        ref={tooltipRef}
      >
        {description}
      </span>
    </div>
  );
};

ProgressBar.propTypes = {
  classes: PropTypes.string,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tooltip: PropTypes.oneOf(["bottom", "left", "right", "top"]),
  value: (props, propName, componentName) => {
    if (typeof props[propName] !== "number") {
      return new Error(
        `Validation failed. Invalid prop ${propName} supplied to ${componentName}. Expecting a number.`
      );
    } else if (props[propName] < 0 || props[propName] > 100) {
      return new Error(
        `Validation failed. Invalid type ${propName} supplied to ${componentName}. Expecting a number between 0 and 100.`
      );
    }
  }
};

export default ProgressBar;
