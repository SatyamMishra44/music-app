import React from "react";
import ReactDOM from "react-dom/client";
import ProtectedApp from "./ProtectedApp";
import "./index.css";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-avispqusww8yi5aw.us.auth0.com"
      clientId="6CnUJYxMpgoSioc8sJcGxwM0o3Ho9m6h"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <BrowserRouter>
        <ContextProvider>
          <ProtectedApp/>
        </ContextProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
