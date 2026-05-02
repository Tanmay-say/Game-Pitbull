import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// ============================================
// Global handler: suppress MetaMask / wallet provider object rejections
// MetaMask injects window.ethereum which can fire internal unhandled
// promise rejections as plain objects ({code, message, data}).
// react-error-overlay catches these and shows [object Object].
// This handler intercepts them before the overlay does.
// ============================================
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;

  // If the rejection is a plain object (not an Error instance),
  // it's almost certainly from a wallet provider or browser extension.
  // Suppress it so react-error-overlay doesn't show [object Object].
  if (reason && typeof reason === 'object' && !(reason instanceof Error)) {
    // Log it for debugging but prevent the overlay from showing
    console.warn('[Wallet/Extension] Suppressed non-Error rejection:', reason);
    event.preventDefault();
    return;
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
