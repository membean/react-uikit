import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CheckBoxInputPage from "./pages/CheckBoxInputPage.js";
import DatePickerPage from "./pages/DatePickerPage.js";
import DefinitionTooltipPage from "./pages/DefinitionTooltipPage.js";
import FileBrowserInput from "./pages/FileBrowserInputPage.js";
import HomePage from "./pages/home.js";
import ProgressBarPage from "./pages/ProgressBarPage.js";
import RadioGroupInputPage from "./pages/RadioGroupInputPage.js";
import SelectInputPage from "./pages/SelectInputPage.js";
import TextAreaPage from "./pages/TextAreaPage.js";
import TextInputPage from "./pages/TextInputPage.js";
import TooltipPage from "./pages/TooltipPage.js";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/components/checkbox">CheckBox Input</Link>
          </li>
          <li>
            <Link to="/components/datepicker">DatePicker Input</Link>
          </li>
          <li>
            <Link to="/components/definition-tooltip">Definition Tooltip</Link>
          </li>
          <li>
            <Link to="/components/file-browser">File Browser Input</Link>
          </li>
          <li>
            <Link to="/components/progress">Progress Bar</Link>
          </li>
          <li>
            <Link to="/components/radiogroup">RadioGroup Input</Link>
          </li>
          <li>
            <Link to="/components/select">Select Input</Link>
          </li>
          <li>
            <Link to="/components/text-area">Text Area</Link>
          </li>
          <li>
            <Link to="/components/text-input">Text Input</Link>
          </li>
          <li>
            <Link to="/components/tooltip">Tooltip</Link>
          </li>
        </ul>
        <hr />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/components/checkbox"
            element={<CheckBoxInputPage />}
          />
          <Route
            exact
            path="/components/datepicker"
            element={<DatePickerPage />}
          />
          <Route
            exact
            path="/components/definition-tooltip"
            element={<DefinitionTooltipPage />}
          />
          <Route
            exact
            path="/components/file-browser"
            element={<FileBrowserInput />}
          />
          <Route
            exact
            path="/components/progress"
            element={<ProgressBarPage />}
          />
          <Route
            exact
            path="/components/radiogroup"
            element={<RadioGroupInputPage />}
          />
          <Route
            exact
            path="/components/select"
            element={<SelectInputPage />}
          />
          <Route
            exact
            path="/components/text-area"
            element={<TextAreaPage />}
          />
          <Route
            exact
            path="/components/text-input"
            element={<TextInputPage />}
          />
          <Route exact path="/components/tooltip" element={<TooltipPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
