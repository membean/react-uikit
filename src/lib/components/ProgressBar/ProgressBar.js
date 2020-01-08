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
  
    audibleFeedback [String] - This component has a hidden live region that will report
      audibleFeedback audibly when it changes. WARNING: Do not update this every time
      the progress bar is updated, or it will be noisy for screen readers. Instead,
      only pass this prop when progress starts (if started by a user action) or when it
      hits 100 to avoid unusable noise.
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
    polite [Boolean] - Set the audibleFeedback live region to be "polite" instead of
      "assertive" (default).
    tooltip [String] - One of "bottom", "left", "right" and "top". Displays the description text as a tooltip on hover. The tooltip position will match
      the value given, but will be updated if the tooltip will not be visible.
      The "default" tooltip is a full-screen, mobile friendly version.
    value [Integer] - Expects an integer representing the percent complete (0-100).
      Defaults to 0.

    NOTE: Progress state and subsequent information is not made available via
      aria-live regions. Instead, the onus is on the developer to make sure that
      any updates are provided to the user in an accessible manner.
*/

const ProgressBar = React.forwardRef((props, ref) => {
  const {
    audibleFeedback,
    classes,
    description,
    id,
    label,
    polite,
    tooltip,
    value
  } = props;

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
        id={id}
        onMouseEnter={handleMouseEnter}
        ref={ref}
        role="progressbar"
        tabIndex="-1"
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
      <div
        aria-live={polite ? "polite" : "assertive"}
        className="visually-hidden"
        dangerouslySetInnerHTML={{ __html: audibleFeedback || null }}
        role="alert"
      />
    </div>
  );
});

ProgressBar.propTypes = {
  audibleFeedback: PropTypes.string,
  classes: PropTypes.string,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  polite: PropTypes.bool,
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
