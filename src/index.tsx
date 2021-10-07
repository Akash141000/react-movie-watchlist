import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <Navbar />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
