import React from "react";
import ProgressBar from "./ProgressBar.js";

const ProgressBarPage = () => {
  return (
    <div>
      <h1>Progress Bar</h1>
      <div className="section" style={{ display: "flex" }}>
        <div style={{ flex: 1, margin: "0 0.25rem" }}>
          <ProgressBar
            description="You have encountered 75 out of 100 words in Level 1."
            id="pb2"
            label="Level 1"
            value={75}
            max={100}
          />
        </div>
        <div style={{ flex: 1, margin: "0 0.25rem" }}>
          <ProgressBar
            description="You have encountered 55 of 100 words in Level 2."
            id="pb2"
            label="Level 2"
            tooltip
            value={55}
            max={100}
          />
        </div>
        <div style={{ flex: 1, margin: "0 0.25rem" }}>
          <ProgressBar
            description="You have encountered 25 out of 100 words in Level 3."
            id="pb2"
            label="Level 3"
            value={25}
            max={100}
          />
        </div>
        <div style={{ flex: 1, margin: "0 0.25rem" }}>
          <ProgressBar
            description="You have encountered 10 out of 100 words in Level 4."
            id="pb2"
            label="Level 4"
            value={10}
            max={100}
          />
        </div>
        <div style={{ flex: 1, margin: "0 0.25rem" }}>
          <ProgressBar
            description="You have encountered 3 out of 100 words in Level 5."
            id="pb2"
            label="Level 5"
            value={3}
            max={100}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBarPage;
