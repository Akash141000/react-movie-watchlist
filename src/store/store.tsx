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
      if (!action.payload.isFav) {
        const movies = [...state.movies];
        const postIdx = movies.findIndex(
          (movie) => movie._id === action.payload._id
        );
        const post = movies[postIdx];
        post.isFav = true;
        movies[postIdx] = post;
        state.movies = movies;
      }
    },
    removeFromFavourites(state, action: { payload: Post }) {
      if (action.payload.isFav) {
        const movies = state.movies;
        const postIdx = movies.findIndex(
          (movie) => movie._id === action.payload._id
        );
        const post = movies[postIdx];
        post.isFav = false;
        movies[postIdx] = post;
        state.movies = movies;
      }
    },
    addMovies(state, action: { payload: Post[] }) {
      state.movies = [...action.payload];
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

// import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { useState } from "react";
// import { createStore } from "redux";
// import useHttp from "../hooks/use-http";
// import { Post } from "../util/types";

// export interface initialStoreState {
//   favourites: Post[];
//   movies: Post[];
// }

// const initialState: initialStoreState = {
//   favourites: [],
//   movies: [],
// };

// const favReducer = createSlice({
//   name: "FavouriteReducer",
//   initialState,
//   reducers: {
//     addToFavourites(state, action) {
//       console.log("working");
//       // if (!action.payload.isFav) {
//       //   const movies = [...state.movies];
//       //   const postIdx = movies.findIndex(
//       //     (movie) => movie._id === action.payload._id
//       //   );
//       //   const post = movies[postIdx];
//       //   post.isFav = true;
//       //   console.log(post);
//       //   movies[postIdx] = post;
//       //   return {
//       //     favourites: state.favourites,
//       //     movies: [...movies],
//       //   };
//       // }

//         const postIdx = state.movies.findIndex(
//           (movie) => movie._id === action.payload._id
//         );
//         const post = state.movies[postIdx];
//         state.movies[postIdx] = {...post,isFav:true};
//         // return {
//         //   favourites: state.favourites,
//         //   movies: [...movies],
//         // };
//       //
//     },
//     removeFromFavourites(state, action: { payload: Post }) {
//       // if (action.payload.isFav) {
//       //   const movies = [...state.movies];
//       //   const postIdx = movies.findIndex(
//       //     (movie) => movie._id === action.payload._id
//       //   );
//       //   const post = movies[postIdx];
//       //   post.isFav = false;
//       //   console.log(post);
//       //   movies[postIdx] = post;
//       //   return {
//       //     favourites: state.favourites,
//       //     movies: [...movies],
//       //   };
//       // }
//     },
//   },
// });

// // export const favDispatch = (post: Post) => {
// //   console.log('dispatch',post);
// //   return (dispatch) => {
// //     dispatch(favAction.addToFavourites(post));
// //   };
// // };

// export const favAction = favReducer.actions;

// const store = configureStore({
//   reducer: favReducer.reducer,
// });

// export default store;
