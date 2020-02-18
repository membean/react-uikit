import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CheckBoxInputPage from "./pages/CheckBoxInputPage.js";
import DatePickerInputPage from "./pages/DatePickerInputPage.js";
import DefinitionTooltipPage from "./pages/DefinitionTooltipPage.js";
import FileBrowserInput from "./pages/FileBrowserInputPage.js";
import HomePage from "./pages/home.js";
import ProgressBarPage from "./pages/ProgressBarPage.js";
import RadioGroupInputPage from "./pages/RadioGroupInputPage.js";
import SelectInputPage from "./pages/SelectInputPage.js";
import TextAreaPage from "./pages/TextAreaPage.js";
import TextInputPage from "./pages/TextInputPage.js";
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
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/components/checkbox">
            <CheckBoxInputPage />
          </Route>
          <Route exact path="/components/datepicker">
            <DatePickerInputPage />
          </Route>
          <Route exact path="/components/definition-tooltip">
            <DefinitionTooltipPage />
          </Route>
          <Route exact path="/components/file-browser">
            <FileBrowserInput />
          </Route>
          <Route exact path="/components/progress">
            <ProgressBarPage />
          </Route>
          <Route exact path="/components/radiogroup">
            <RadioGroupInputPage />
          </Route>
          <Route exact path="/components/select">
            <SelectInputPage />
          </Route>
          <Route exact path="/components/text-area">
            <TextAreaPage />
          </Route>
          <Route exact path="/components/text-input">
            <TextInputPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
