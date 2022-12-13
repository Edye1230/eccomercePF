import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import Auth0ProviderWithHistory from "./components/auth/auth0-provider-with-history.js";

axios.defaults.baseURL = "http://54.233.210.211:3001";
//axios.defaults.baseURL = "http://54.232.133.202:3001"; 

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <Auth0ProviderWithHistory>
          <App />
        </Auth0ProviderWithHistory>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
