import React, { useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import positionTooltip from "../../helpers/positionTooltip.js";

/*
  Renders an accessible element that displays a tooltip.
  Element can either be a link or not.

  Usage:
    
    <Tooltip
      tooltipBody="This is some helper text to display in a tooltip"
      id="forgot-tooltip"
      text="Forgot something?"
    />

  Props:
    --REQUIRED--
    text [String] - Visible text (also acts as accessible label)
    tooltipBody [String] - Tooltip content

    --OPTIONAL--
    classes [String] - Additional CSS classes that will be added to the control container div element.
    id [String] - (Required) The id attribute of the input element.
    link [String] - A path to be passed to React Router. Will take preference over onClick and url.
    onClick [Function] - A function to run when the button is clicked.
    position [String] - The tooltip position. One of "bottom", "left", "right", or "top".
    url [String] - A url to link to. Will take precedence over onClick.
    buttonType [String] - A valid html button type that will render if the Tooltip is showing a <button>
*/

const Tooltip = (props) => {
  const {
    classes,
    id,
    link,
    onClick,
    position = "top",
    text,
    tooltipBody,
    url,
    buttonType = "button",
  } = props;

  const tooltipElementId = `${id}-desc`;
  const tooltipRef = useRef(null);
  const triggerClass = classnames("dfn-tooltip-trigger", classes);

  const handleMouseEnter = () => {
    const currentTooltip = tooltipRef.current;
    if (currentTooltip) {
      positionTooltip(currentTooltip, position);
    }
  };

  const renderAnchor = () => (
    <a
      aria-describedby={tooltipElementId}
      className={triggerClass}
      href={url}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </a>
  );

  const renderButton = () => (
    <button
      aria-describedby={tooltipElementId}
      className={triggerClass}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      type={buttonType}
    >
      {text}
    </button>
  );

  const renderLink = () => (
    <Link
      aria-describedby={tooltipElementId}
      className={triggerClass}
      onMouseEnter={handleMouseEnter}
      to={link}
    >
      {text}
    </Link>
  );

  const renderTriggerElement = () => {
    if (link) return renderLink();
    if (url) return renderAnchor();
    return renderButton();
  };

  return (
    <div className="dfn-tooltip">
      {renderTriggerElement()}
      <div
        className={classnames("dfn-tooltip-bubble", `tooltip-${position}`)}
        id={tooltipElementId}
        ref={tooltipRef}
        role="tooltip"
      >
        <p id={`${id}-definition`}>{tooltipBody}</p>
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  classes: PropTypes.string,
  tooltipBody: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(["bottom", "left", "right", "top"]),
  text: PropTypes.string.isRequired,
  url: PropTypes.string,
  buttonType: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Tooltip;
