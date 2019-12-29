import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CheckBoxInputPage from "./components/CheckBoxInput/index.js";
import FileBrowserInput from "./components/FileBrowserInput/index.js";
import HomePage from "./components/home.js";
import RadioGroupInputPage from "./components/RadioGroupInput/index.js";
import SelectInputPage from "./components/SelectInput/index.js";
import TextInputPage from "./components/TextInput/index.js";
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
            <Link to="/components/file-browser">File Browser Input</Link>
          </li>
          <li>
            <Link to="/components/radiogroup">RadioGroup Input</Link>
          </li>
          <li>
            <Link to="/components/select">Select Input</Link>
          </li>
          <li>
            <Link to="/components/text">Text Input</Link>
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
          <Route exact path="/components/file-browser">
            <FileBrowserInput />
          </Route>
          <Route exact path="/components/radiogroup">
            <RadioGroupInputPage />
          </Route>
          <Route exact path="/components/select">
            <SelectInputPage />
          </Route>
          <Route exact path="/components/text">
            <TextInputPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
