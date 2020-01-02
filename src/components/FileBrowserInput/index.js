import React, { useState } from "react";
import FileBrowserInput from "./FileBrowserInput.js";

const FileBrowserInputPage = () => {
  const initialState = {
    helperText: "Select a file between 1kb and 100GB to upload.",
    id: "browser-5",
    label: "Select multiple files and upload",
    multiple: true,
    name: "inlineFileBrowser"
  };

  const [browserState, setbrowserState] = useState(initialState);

  const getFileNames = files => {
    return Array.from(files)
      .map(file => {
        return `<li>${file.name}</li>`;
      })
      .join("");
  };

  const handleBrowserChange = (_event, files) => {
    const hasFiles = files.length > 0;
    setbrowserState({
      ...browserState,
      disabled: true,
      feedbackContext: "busy",
      feedbackText: "Uploading files..."
    });
    setTimeout(() => {
      const feedback = {
        disabled: false,
        feedbackContext: hasFiles ? "success" : "error",
        feedbackText: hasFiles
          ? `<p>Uploaded the following files successfully:</p>
              <ul>${getFileNames(files)}</ul>`
          : 'Uh, oh! No file was selected. Please try again. If you continue to have problems, please <a href="mailto:support@membean.com">contact support</a> for assistance.'
      };
      setbrowserState({ ...browserState, ...feedback });
    }, 2000);
  };

  return (
    <div>
      <h1>File Browser</h1>
      <div className="section">
        <FileBrowserInput
          disabled
          id="browser-1"
          label="Disabled file browser"
          name="disabledFileBrowser"
        />
      </div>
      <div className="section">
        <FileBrowserInput
          id="browser-2"
          label="Enabled file browser"
          name="invalidFileBrowser"
        />
      </div>
      <div className="section">
        <FileBrowserInput
          feedbackText="You must select a .pdf file."
          helperText="Maecenas sed diam eget risus varius blandit sit amet non magna. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit."
          id="browser-3"
          isValid={false}
          label="Invalid file browser"
          name="invalidFileBrowser"
        />
      </div>
      <div className="section">
        <FileBrowserInput
          helperText="Maecenas sed diam eget risus varius blandit sit amet non magna. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
          id="browser-4"
          label="File browser with description"
          name="invalidFileBrowser"
        />
      </div>
      <div className="section">
        <FileBrowserInput {...browserState} onChange={handleBrowserChange} />
      </div>
    </div>
  );
};

export default FileBrowserInputPage;
