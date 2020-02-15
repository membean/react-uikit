import React, { useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import positionTooltip from "../../helpers/positionTooltip.js";

/*
  Renders an accessible element that displays a definition tooltip.
  Element can either be a link or not.
  
  Usage:
    
    <DefinitionTooltip
      definition="When you abolish someone, you make them donec id elit non mi porta gravida at eget metus."
      id="abolish-tooltip"
      term="abolish"
    />
  
  Props:

    classes [String] - Additional CSS classes that will be added to the control
      container div element.
    definition [String] - (Required) The definition of the term.
    explanation [String] - Additional text to be displayed in the tooltip, after the definition.
    id [String] - (Required) The id attribute of the input element.
    link [String] - A path to be passed to React Router. Will take preference over onClick and url.
    onClick [Function] - A function to run when the button is clicked.
    position [String] - The tooltip position. One of "bottom", "left", "right", or "top".
    term [String] - (Required) The term to display. Hovering over it will reveal the tooltip.
    url [String] - A url to link to. Will take precedence over onClick.
*/

const DefinitionTooltip = props => {
  const {
    classes,
    definition,
    explanation,
    id,
    link,
    onClick,
    position,
    term,
    url
  } = props;

  const tooltipElementId = `${id}-desc`;
  const tooltipRef = useRef(null);
  const triggerClass = classnames("dfn-tooltip-trigger", classes);

  const handleMouseEnter = event => {
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
        dangerouslySetInnerHTML={{
          __html: term
        }}
        href={url}
        onMouseEnter={handleMouseEnter}
      />
    );
  };

  const renderButton = () => {
    return (
      <button
        aria-labelledby={tooltipElementId}
        className={triggerClass}
        dangerouslySetInnerHTML={{
          __html: term
        }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
      />
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
        <span
          dangerouslySetInnerHTML={{
            __html: term
          }}
        />
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
        <p
          dangerouslySetInnerHTML={{
            __html: `<dfn>${term}:</dfn> ${definition}`
          }}
          id={`${id}-definition`}
        />
        {explanation && (
          <p
            className="dfn-tooltip-explanation"
            dangerouslySetInnerHTML={{ __html: explanation }}
            id={`${id}-explanation`}
          />
        )}
      </div>
    </div>
  );
};

DefinitionTooltip.defaultProps = {
  position: "top"
};

DefinitionTooltip.propTypes = {
  classes: PropTypes.string,
  definition: PropTypes.string.isRequired,
  explanation: PropTypes.string,
  id: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(["bottom", "left", "right", "top"]),
  term: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default DefinitionTooltip;
