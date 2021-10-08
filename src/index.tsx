import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";
import { AuthContextProvider } from "./store/auth-context";
import { FavContextProvider } from "./store/fav-context";

ReactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthContextProvider>
        <FavContextProvider>
        <Navbar />
        <App />
        </FavContextProvider>
      </AuthContextProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
