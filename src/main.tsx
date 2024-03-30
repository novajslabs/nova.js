import React from "react";
import ReactDOM from "react-dom/client";
import AppTs from "./App.tsx";
import AppJs from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppTs />
  </React.StrictMode>
);
