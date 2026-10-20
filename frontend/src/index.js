import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/Context";
import { NurseContextProvider } from "./context/NurseContext";
import { PharmacistContextProvider } from "./context/PharmacistContext";

// Send httpOnly cookies with every cross-origin request
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <NurseContextProvider>
        <PharmacistContextProvider>
          <App />
        </PharmacistContextProvider>
      </NurseContextProvider>
    </ContextProvider>
  </React.StrictMode>
);
