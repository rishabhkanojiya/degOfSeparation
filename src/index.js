import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import {
  DataContextProvider,
  PopupContextProvider,
  SeparationContextProvider,
} from "./context/Providers";

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <PopupContextProvider>
        <SeparationContextProvider>
          <App />
        </SeparationContextProvider>
      </PopupContextProvider>
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
