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
              definition="When you abolish someone, you make them donec id elit non mi porta gravida at eget metus."
              explanation="You saw this word on Jan 3, 2020."
              id="abolish-tooltip"
              position="left"
              term="abolish"
            />
          </li>
          <li>
            <DefinitionTooltip
              definition="When you abridge someone, you make them donec id elit non mi porta gravida at eget metus."
              explanation='You checked "I Know This" for this word on Jan 3, 2020.'
              id="abridge-tooltip"
              position="right"
              term="abridge"
              url="/mywords/abridge"
            />
          </li>
          <li>
            <DefinitionTooltip
              definition="Someone who has an abstract manner is donec id elit non mi porta gravida at eget metus."
              id="abstract-tooltip"
              onClick={() => {
                console.log("Button Clicked!");
              }}
              term="abstract"
            />
          </li>
          <li>
            <DefinitionTooltip
              definition="Someone who has an abstract manner is donec id elit non mi porta gravida at eget metus."
              id="abstract-tooltip"
              position="bottom"
              term="abstract"
            />
          </li>
        </ol>
      </div>
    </div>
  );
};

export default DefinitionTooltipPage;
