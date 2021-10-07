import { createStore } from "redux";
import { Post } from "../util/types";

export interface initialStoreState {
  isAuthenticated: boolean;
  favourites: Post[];
}

const initalState: initialStoreState = {
  isAuthenticated: false,
  favourites: [],
};

const reducer = (state = initalState, action) => {
  if (action.type === "ADD_TO_FAV") {
    const fav: Post[] = [...state.favourites];
    fav.push(action.val);
    return {
      isAuthenticated: state.isAuthenticated,
      favourites: fav,
    };
  }
  if (action.type === "AUTHENTICATION") {
    return {
      isAuthenticated: action.val,
      favourites: state.favourites,
    };
  }

  return state;
};

const store = createStore(reducer);

export default store;
