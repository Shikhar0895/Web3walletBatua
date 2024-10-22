import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BlockchainProvider } from "./contexts/BlockchainContext";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <BlockchainProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BlockchainProvider>
  </AuthProvider>
  // </StrictMode>
);
