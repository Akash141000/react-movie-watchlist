import { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/use-http";
import { Post } from "../util/types";
import { favAction, initialStoreState } from "./store";

const FavContext = createContext({
  favAction: (post: Post, isFav: boolean) => {},
});

export const FavContextProvider = (props) => {
  const dispatch = useDispatch();
  const [responseData, setResponseData] = useState(null);
  const { isLoading, error, sendResponse } = useHttp();
  const movies = useSelector((state: initialStoreState) => state.movies);
  const addOrRemoveFromFav = (post: Post, isFav: boolean) => {
    console.log("fav context");
    if (isFav) {
      console.log("is fav");
      dispatch(favAction.removeFromFavourites(post));
    } else {
      console.log("not fav");
      dispatch(favAction.addToFavourites(post));
    }
    sendResponse(
      isFav ? "/removeFromFavourites" : "/addToFavourites",
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: {
          post: {
            ...post,
            isFav: null,
          },
        },
      },
      setResponseData
    );
  };

  const context = {
    favAction: addOrRemoveFromFav,
  };

  return (
    <FavContext.Provider value={context}>{props.children}</FavContext.Provider>
  );
};

export default FavContext;
