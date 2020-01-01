import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar.js";

const ProgressBarPage = () => {
  const [progressState, setprogressState] = useState({
    message: "",
    progress: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const progress = progressState.progress;
      if (progress < 100) {
        setprogressState({
          message: `Your file is ${progress}% uploaded.`,
          progress: progress + 1
        });
      } else {
        setprogressState({
          message: "Your file has been uploaded."
        });
        clearTimeout(timer);
      }
    }, 500);
  });

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
            tooltip="right"
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
      <div className="section">
        <ProgressBar
          description={progressState.message}
          id="pb6"
          label="Uploading"
          tooltip="bottom"
          value={parseInt(progressState.progress)}
        />
      </div>
    </div>
  );
};

export default ProgressBarPage;
