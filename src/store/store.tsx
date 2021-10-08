import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { createStore } from "redux";
import useHttp from "../hooks/use-http";
import { Post } from "../util/types";

export interface initialStoreState {
  favourites: Post[];
  movies: Post[];
}

const initialState: initialStoreState = {
  favourites: [],
  movies: [],
};

const favReducer = createSlice({
  name: "FavouriteReducer",
  initialState,
  reducers: {
    addToFavourites(state, action) {
      state.favourites.push(action.payload);
    },
    removeFromFavourites(state, action: { payload: Post }) {
      state.movies.filter((movie) => movie._id !== action.payload._id);

      state.favourites = state.favourites.filter(
        (item) => item._id !== action.payload._id
      );
    },
    addToMovies(state, action) {
      state.movies.push(action.payload);
    },
  },
});

// export const favDispatch = (post: Post) => {
//   console.log('dispatch',post);
//   return (dispatch) => {
//     dispatch(favAction.addToFavourites(post));
//   };
// };

export const favAction = favReducer.actions;

const store = configureStore({
  reducer: favReducer.reducer,
});

export default store;
