import { createStore } from "redux";

export interface initialStoreState {
  isAuthenticated: boolean;
}

const initalState: initialStoreState = {
  isAuthenticated: false,
};

const reducer = (state = initalState, action) => {
  // if (action.type === "ADD_TO_FAV") {
  //   state.favourties.push(action.val);
  // }
  if (action.type === "AUTHENTICATION") {
    return {
      isAuthenticated: action.val,
    };
  }

  return state;
};

const store = createStore(reducer);

export default store;
