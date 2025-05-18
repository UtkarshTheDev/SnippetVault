import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./lib/prism-theme.css"; // Import Prism.js theme
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="dark">
      <App />
    </div>
  </StrictMode>
);
