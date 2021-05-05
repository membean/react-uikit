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
    text [String] - The text to display. Hovering over it will reveal the tooltip.
    tooltipBody [String] - The text to be displayed in the tooltip

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
    position,
    text,
    tooltipBody,
    url,
    buttonType
  } = props;

  const tooltipElementId = `${id}-desc`;
  const tooltipRef = useRef(null);
  const triggerClass = classnames("dfn-tooltip-trigger", classes);

  const handleMouseEnter = (event) => {
    const currentTooltip = tooltipRef.current;
    positionTooltip(currentTooltip, position);
  };

  const renderTriggerElement = () => {
    if (link) {
      return renderLink();
    } else if (url) {
      return renderAnchor();
    } else {
      return renderButton();
    }
  };

  const renderAnchor = () => {
    return (
      <a
        aria-labelledby={tooltipElementId}
        className={triggerClass}
        href={url}
        onMouseEnter={handleMouseEnter}
      >
        {text}
      </a>
    );
  };

  const renderButton = () => {
    return (
      <button
        aria-labelledby={tooltipElementId}
        className={triggerClass}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        type={buttonType}
      >
        {text}
      </button>
    );
  };

  const renderLink = () => {
    return (
      <Link
        aria-labelledby={tooltipElementId}
        className={triggerClass}
        onMouseEnter={handleMouseEnter}
        to={link}
      >
        {text}
      </Link>
    );
  };

  return (
    <div className="dfn-tooltip">
      {renderTriggerElement()}
      <div
        className={classnames("dfn-tooltip-bubble", `tooltip-${position}`)}
        id={`${id}-desc`}
        ref={tooltipRef}
        role="tooltip"
      >
        <p id={`${id}-definition`}>{tooltipBody}</p>
      </div>
    </div>
  );
};

Tooltip.defaultProps = {
  position: "top",
  buttonType: "button"
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
