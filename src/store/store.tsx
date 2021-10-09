import { configureStore, createSlice } from "@reduxjs/toolkit";
import { dispatchType, Post } from "../util/types";

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
    addToFavourites(
      state,
      action: { payload: { post: Post; type: dispatchType } }
    ) {
      if (action.payload.type === dispatchType.movies) {
        const movies = [...state.movies];
        const postIdx = movies.findIndex(
          (movie) => movie._id === action.payload.post._id
        );
        const post = movies[postIdx];
        post.isFav = true;
        movies[postIdx] = post;
        state.movies = movies;
      } else if (action.payload.type === dispatchType.favourites) {
        state.favourites = state.favourites;
      }
    },
    removeFromFavourites(
      state,
      action: { payload: { post: Post; type: dispatchType } }
    ) {
      if (action.payload.type === dispatchType.movies) {
        const movies = state.movies;
        const postIdx = movies.findIndex(
          (movie) => movie._id === action.payload.post._id
        );
        const post = movies[postIdx];

        post.isFav = false;
        movies[postIdx] = post;
        state.movies = movies;
      } else if (action.payload.type === dispatchType.favourites) {
        const fav = state.favourites;
        const favRemoved = fav.filter(
          (fav) => fav._id !== action.payload.post._id
        );

        state.favourites = favRemoved;
      }
    },
    addMovies(state, action: { payload: Post[] }) {
      state.movies = [...action.payload];
    },
    addFavourites(state, action: { payload: Post[] }) {
      state.favourites = [...action.payload];
    },
  },
});


export const favAction = favReducer.actions;

const store = configureStore({
  reducer: favReducer.reducer,
});

export default store;
