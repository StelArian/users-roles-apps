import React from "react";
import ReactDOM from "react-dom";

const App = () => (
  <h1>hello</h1>
);

const root = document.getElementById("root");

if (root !== null) {
  ReactDOM.render(<App />, root);
}
