import { createStore } from "redux";

const initalState = {
  favourties: [],
  isAuthenticated: false,
};

const reducer = (state = initalState, action) => {
  if (action.type === "ADD_TO_FAV") {
    state.favourties.push(action.val);
  }
  if (action.type === "AUTHENTICATION") {
    return {
      favourties: [],
      isAuthenticated: action.val,
    };
  }
};

const store = createStore(reducer);

export default store;
