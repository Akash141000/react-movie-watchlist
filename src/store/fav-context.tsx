import { createContext, useState } from "react";
import useHttp from "../hooks/use-http";
import { Post } from "../util/types";
import { favAction } from "./store";

const FavContext = createContext({
  favAction: (post: Post, isFav: boolean) => {},
});

export const FavContextProvider = (props) => {
  const [responseData, setResponseData] = useState(null);
  const { isLoading, error, sendResponse } = useHttp();
  const addOrRemoveFromFav = (post: Post, isFav: boolean) => {
    if(isFav){
      console.log('fav context');
      favAction.removeFromFavourites(post);
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
            isFav:null
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
