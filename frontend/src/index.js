import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Send httpOnly cookies with every cross-origin request
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
