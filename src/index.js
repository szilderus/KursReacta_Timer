import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.css";

import {TimeboxList} from './components/TimeboxList';

function App() {
  return (
    <div className="App">
     <TimeboxList />
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <div>
    <App />
  </div>,
  rootElement
);
