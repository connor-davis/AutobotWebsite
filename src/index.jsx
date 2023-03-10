import "./index.css";
import "tw-elements";

import App from "./App";
import { Router } from "@solidjs/router";
import { render } from "solid-js/web";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root")
);
