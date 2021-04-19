import React from "react";
import Tooltip from "../lib/components/Tooltip/Tooltip.js";

const TooltipPage = () => {
  return (
    <div>
      <h1>Tooltip</h1>
      <div className="section">
        <ol>
          <li>
            <Tooltip
              tooltipBody="This is basic tooltip that does not link to anything."
              id="abolish-tooltip"
              text="abolish"
            />
          </li>
          <li>
            <Tooltip
              tooltipBody="This is a tooltip with a url prop. To be used when linking outside of the React app."
              explanation='You checked "I Know This" for this word on Jan 3, 2020.'
              id="abridge-tooltip"
              position="left"
              text="abridge"
              url="/mywords/abridge"
            />
          </li>
          <li>
            <Tooltip
              tooltipBody="This is a tooltip with an onClick prop. To be used when clicking the button should do something."
              id="abstract-tooltip"
              onClick={() => {
                console.log("Button Clicked!");
              }}
              position="bottom"
              text="abstract"
            />
          </li>
          <li>
            <Tooltip
              tooltipBody="This is a tooltip with a Link prop. To be used when linking with React Router."
              id="abstract-tooltip"
              link="/components/tooltip"
              text="abstract"
            />
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TooltipPage;
