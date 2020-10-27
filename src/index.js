import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";
import App from "./App";
import Inicio from "./Inicio";
import {Auth0Provider} from'@auth0/auth0-react';
import Autenticar from "./Components/Auth";

const domain = "dev-ltlbj9i6.auth0.com";
const clientId = "HXUs3zkUaAZViZfL0ls2a1uYBCNsCtZ9";
ReactDOM.render(
  <Auth0Provider
  domain={domain}
  clientId={clientId}
  redirectUri={window.location.origin}>
    <Autenticar/>
  </Auth0Provider>,
  document.getElementById("root")
);
