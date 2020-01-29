export default function positionTooltip(currentTooltip, defaultPosition) {
  /*
    Checks to see if the tooltip will be visible, or will be off the screen.
    If the tooltip will be off the screen, then it will replace the CSS
    classes of the tooltip to change it's position.

    This is best used as a onMouseEnter function.

    currentTooltip (Ref.current) - A ref to the tooltip.
    defaultPosition (String) - The default position of the tooltip. One of
                               "bottom", "left", "right" or "top".

    TODO:
      - More advanced visibility checking.

  */

  if (currentTooltip === null) {
    // TODO: There's probably a better way to handle this for devs.
    //       Maybe use throw to enforce that these work properly.
    console.log("Tooltip ref not defined.");
    return;
  }

  const tooltipBounds = currentTooltip.getBoundingClientRect();
  const hasSpaceAbove = tooltipBounds.top > 1;
  const hasSpaceBelow = tooltipBounds.bottom < window.innerHeight - 1;
  const hasSpaceLeft = tooltipBounds.left > 1;
  const hasSpaceRight = tooltipBounds.right < window.innerWidth - 1;

  const replacePosition = newPosition => {
    currentTooltip.classList.replace(
      `tooltip-${defaultPosition}`,
      `tooltip-${newPosition}`
    );
  };

  switch (defaultPosition) {
    case "bottom":
      if (!hasSpaceBelow) {
        if (hasSpaceAbove) {
          replacePosition("top");
        } else if (hasSpaceLeft) {
          replacePosition("left");
        } else if (hasSpaceRight) {
          replacePosition("right");
        } else {
          replacePosition("default");
        }
      }
      break;
    case "left":
      if (!hasSpaceLeft) {
        if (hasSpaceRight) {
          replacePosition("right");
        } else if (hasSpaceAbove) {
          replacePosition("top");
        } else if (hasSpaceBelow) {
          replacePosition("bottom");
        } else {
          replacePosition("default");
        }
      }
      break;
    case "right":
      if (!hasSpaceRight) {
        if (hasSpaceLeft) {
          replacePosition("left");
        } else if (hasSpaceAbove) {
          replacePosition("top");
        } else if (hasSpaceBelow) {
          replacePosition("bottom");
        } else {
          replacePosition("default");
        }
      }
      break;
    default:
      // defaultPosition is "top"
      if (!hasSpaceAbove) {
        if (hasSpaceBelow) {
          replacePosition("bottom");
        } else if (hasSpaceLeft) {
          replacePosition("left");
        } else if (hasSpaceRight) {
          replacePosition("right");
        } else {
          replacePosition("default");
        }
      }
      break;
  }
}
