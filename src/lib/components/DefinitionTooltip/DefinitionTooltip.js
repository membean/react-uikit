import React, { useRef } from "react";
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

    TODO:
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

  const tooltipRef = useRef(null);

  const handleMouseEnter = event => {
    const currentTooltip = tooltipRef.current;
    positionTooltip(currentTooltip, position);
  };

  const renderTriggerElement = () => {
    const triggerClass = classnames("definition-tooltip-trigger", classes);
    const triggerDescription = `${id}-desc`;
    if (link) {
      // Render a Link component to navigate within the React app.
      return renderLinkComponent();
    } else if (url) {
      // Render an HTML link to navigate to another URL.
      return renderHtmlLink(triggerClass, triggerDescription);
    } else if (onClick) {
      // Render an HTML button that will do something when clicked.
      return renderHtmlButton(triggerClass, triggerDescription);
    } else {
      // Render a span that acts like a definition tooltip.
      return renderHtmlSpan(triggerClass, triggerDescription);
    }
  };

  const renderHtmlButton = (classes, describeBy) => {
    return (
      <button
        aria-describedby={describeBy}
        className={classes}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
      >
        {term}
      </button>
    );
  };

  const renderHtmlLink = (classes, describeBy) => {
    return (
      <a
        aria-describedby={describeBy}
        className={classes}
        href={url}
        onMouseEnter={handleMouseEnter}
      >
        {term}
      </a>
    );
  };

  const renderHtmlSpan = (classes, describeBy) => {
    return (
      <span
        aria-describedby={describeBy}
        className={classes}
        onMouseEnter={handleMouseEnter}
      >
        {term}
      </span>
    );
  };

  const renderLinkComponent = () => {
    // TODO: Render a passed in Link component.
    // TODO: Need to somehow add the onMouseEnter event for positioning.
    return { link };
  };

  return (
    <div className="definition-tooltip">
      {renderTriggerElement()}
      <div
        className={classnames(
          "definition-tooltip-bubble",
          `tooltip-${position}`
        )}
        id={`${id}-desc`}
        ref={tooltipRef}
        role="tooltip"
      >
        <p>
          <dfn aria-hidden="true">{term}:</dfn> {definition}
        </p>
        {explanation && (
          <p
            className="definition-tooltip-explanation"
            dangerouslySetInnerHTML={{ __html: explanation }}
          />
        )}
      </div>
    </div>
  );
};

DefinitionTooltip.defaultProps = {
  position: "top"
};

// TODO: Should not be able to have link, onClick, or url at the same time, or
//       we need to decide which one would take precedent. Currenlty
//       orders by link, url, then onClick.
//       Can have link (<Link>) OR onClick (<button>) OR url (<a>) OR none.
//       Cannot have more than one, though.
//       Link must be a Link component.
DefinitionTooltip.propTypes = {
  classes: PropTypes.string,
  definition: PropTypes.string.isRequired,
  explanation: PropTypes.string,
  id: PropTypes.string.isRequired,
  // link: PropTypes.instanceOf(Link),
  link: PropTypes.node,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(["bottom", "left", "right", "top"]),
  term: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default DefinitionTooltip;
