import React from "react";
import DefinitionTooltip from "../lib/components/DefinitionTooltip/DefinitionTooltip.js";

const DefinitionTooltipPage = () => {
  return (
    <div>
      <h1>Definition Tooltip</h1>
      <div className="section">
        <ol>
          <li>
            <DefinitionTooltip
              definition="This is basic tooltip that does not link to anything."
              id="abolish-tooltip"
              term="abolish"
            />
          </li>
          <li>
            <DefinitionTooltip
              definition="This is a tooltip with a url prop. To be used when linking outside of the React app."
              explanation='You checked "I Know This" for this word on Jan 3, 2020.'
              id="abridge-tooltip"
              position="left"
              term="abridge"
              url="/mywords/abridge"
            />
          </li>
          <li>
            <DefinitionTooltip
              definition="This is a tooltip with an onClick prop. To be used when clicking the button should do something."
              id="abstract-tooltip"
              onClick={() => {
                console.log("Button Clicked!");
              }}
              position="bottom"
              term="abstract"
            />
          </li>
          <li>
            <DefinitionTooltip
              definition="This is a tooltip with a Link prop. To be used when linking with React Router."
              id="abstract-tooltip"
              link="/components/definition-tooltip"
              term="abstract"
            />
          </li>
        </ol>
      </div>
    </div>
  );
};

export default DefinitionTooltipPage;
