import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import KventaSite from "../../components/site";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KventaSite />
  </StrictMode>,
);
