import React, { useState } from "react";
import FileBrowserInput from "../lib/components/FileBrowserInput/FileBrowserInput.js";

const StandaloneFileBrowserInput = () => {
  const emptyPrompt = "Choose file(s)...";

  const initialState = {
    helperText: "Select a file between 1kb and 100GB to upload.",
    id: "browser-5",
    label: "Select multiple files and upload",
    multiple: true,
    name: "inlineFileBrowser",
    prompt: emptyPrompt
  };

  const [browserState, setbrowserState] = useState(initialState);

  const getFileNames = files => {
    return Array.from(files)
      .map(file => {
        return `<li>${file.name}</li>`;
      })
      .join("");
  };

  const setPrompt = files => {
    if (files.length === 1) {
      return files[0].name;
    } else if (files.length > 1) {
      return `${files.length} files selected...`;
    } else {
      return emptyPrompt;
    }
  };

  const handleBrowserChange = event => {
    const files = event.target.files;
    const hasFiles = files.length > 0;
    setbrowserState({
      ...browserState,
      disabled: true,
      feedbackContext: "busy",
      feedbackText: "Uploading files...",
      prompt: setPrompt(files)
    });
    setTimeout(() => {
      const feedback = {
        disabled: false,
        feedbackContext: hasFiles ? "success" : "error",
        feedbackText: hasFiles
          ? `<p>Uploaded the following files successfully:</p>
              <ul>${getFileNames(files)}</ul>`
          : 'Uh, oh! No file was selected. Please try again. If you continue to have problems, please <a href="mailto:support@membean.com">contact support</a> for assistance.',
        prompt: emptyPrompt
      };
      setbrowserState({ ...browserState, ...feedback });
    }, 2000);
  };

  return (
    <div className="section">
      <FileBrowserInput {...browserState} onChange={handleBrowserChange} />
    </div>
  );
};

export default StandaloneFileBrowserInput;
