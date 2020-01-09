import React from "react";
import FileBrowserInput from "../lib/components/FileBrowserInput/FileBrowserInput.js";
import StandaloneFileBrowserInput from "../components/StandaloneFileBrowserInput.js";

const FileBrowserInputPage = () => {
  return (
    <div>
      <h1>File Browser</h1>
      <div className="section">
        <FileBrowserInput
          disabled
          id="browser-1"
          label="Disabled file browser"
          name="disabledFileBrowser"
          prompt="Choose a file..."
        />
      </div>
      <div className="section">
        <FileBrowserInput
          id="browser-2"
          label="Enabled file browser"
          name="invalidFileBrowser"
          prompt="Choose a file..."
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
          prompt="Choose a file..."
        />
      </div>
      <div className="section">
        <FileBrowserInput
          helperText="Maecenas sed diam eget risus varius blandit sit amet non magna. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
          id="browser-4"
          label="File browser with description"
          name="invalidFileBrowser"
          prompt="Choose a file..."
        />
      </div>
      <StandaloneFileBrowserInput />
    </div>
  );
};

export default FileBrowserInputPage;
