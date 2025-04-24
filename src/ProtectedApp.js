// ProtectedApp.js
import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import App from "./App";

const ProtectedApp = withAuthenticationRequired(App, {
  onRedirecting: () => <div className="text-center mt-5">Loading...</div>,
});

export default ProtectedApp;
