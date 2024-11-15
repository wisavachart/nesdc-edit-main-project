import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppClient from "./AppClient";

createRoot(document.getElementById("rootclient")).render(
  <StrictMode>
    <AppClient />
  </StrictMode>
);
