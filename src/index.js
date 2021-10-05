import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

ReactDom.render(
  <BrowserRouter>
  <Navbar/>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
