import React from "react";
import ProgressBar from "../lib/components/ProgressBar/ProgressBar.js";
import StandaloneProgressBar from "../lib/components/ProgressBar/StandaloneProgressBar.js";

const ProgressBarPage = () => {
  return (
    <div>
      <h1>Progress Bar</h1>
      <div className="section" style={{ display: "flex" }}>
        <div style={{ flex: 1, margin: "0 0.25rem" }}>
          <ProgressBar
            description="You have encountered 75 out of 100 words in Level 1."
            id="pb1"
            label="Level 1"
            tooltip="left"
            value={75}
          />
        </div>
        <div style={{ flex: 1, margin: "0 0.25rem" }}>
          <ProgressBar
            description="You have encountered 55 of 100 words in Level 2."
            id="pb2"
            label="Level 2"
            tooltip="bottom"
            value={55}
          />
        </div>
        <div style={{ flex: 1, margin: "0 0.25rem" }}>
          <ProgressBar
            description="You have encountered 25 out of 100 words in Level 3."
            id="pb3"
            label="Level 3"
            tooltip="top"
            value={25}
          />
        </div>
        <div style={{ flex: 1, margin: "0 0.25rem" }}>
          <ProgressBar
            description="You have encountered 10 out of 100 words in Level 4."
            id="pb4"
            label="Level 4"
            tooltip="bottom"
            value={10}
          />
        </div>
        <div style={{ flex: 1, margin: "0 0.25rem" }}>
          <ProgressBar
            description="You have encountered 3 out of 100 words in Level 5."
            id="pb5"
            label="Level 5"
            tooltip="right"
            value={3}
          />
        </div>
      </div>
      <StandaloneProgressBar />
    </div>
  );
};

export default ProgressBarPage;
