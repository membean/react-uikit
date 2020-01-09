import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "../lib/components/ProgressBar/ProgressBar.js";

const StandaloneProgressBar = () => {
  const progressEl = useRef(null);

  const [progressState, setprogressState] = useState({
    description: "",
    value: 0
  });

  const { value } = progressState;

  useEffect(() => {
    const timer = setTimeout(() => {
      const completed = value === 100;
      if (value <= 100) {
        setprogressState({
          audibleFeedback: completed
            ? "Your file upload has completed"
            : "Your file is uploadings",
          description: completed
            ? "Your file has been uploaded"
            : `Your file is ${value}% uploaded`,
          value: completed ? 100 : value + 1
        });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [value]);

  console.log("Rendered");

  return (
    <div className="section">
      <ProgressBar
        audibleFeedback={progressState.audibleFeedback}
        description={progressState.description}
        id="progress-bar"
        label="Uploading"
        ref={progressEl}
        tooltip="bottom"
        value={progressState.value}
      />
    </div>
  );
};

export default StandaloneProgressBar;
