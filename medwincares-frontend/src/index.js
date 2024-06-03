import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/Context";
import { NurseContextProvider } from "./context/NurseContext";
import { PharmacistContextProvider } from "./context/PharmacistContext";


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
