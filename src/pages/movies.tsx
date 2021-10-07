import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

import Card from "../components/Card";
import createPalette from "@mui/material/styles/createPalette";
import CardLayout from "../layout/cardLayout";
import { Post } from "../util/types";

const Movies = () => {
  const [responseData, setResponseData] = useState<{
    posts: Post[];
    favourites: any[];
  }>(null);

  const [postResponseData, setPostResponseData] = useState(null);
  const { isLoading, error, sendResponse } = useHttp();

  useEffect(() => {
    sendResponse(
      "/posts",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
      setResponseData
    );
  }, []);

  const addOrRemoveFromFav = (post: Post, isFav: boolean) => {
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
          },
        },
      },
      setPostResponseData
    );
  };

  // useEffect(() => {
  //   const allPosts = responseData.posts;
  // }, [responseData.favourites]);

  let cards;
  if (!isLoading && !error) {
    cards = responseData.posts!.map((data) => {
      let isfav;
      responseData.favourites.forEach((fav) => {
        fav === data._id ? (isfav = true) : (isfav = false);
      });
      return (
        <CardLayout>
          <Card
            imgSrc={data.image}
            description={data.description}
            title={data.title}
            isFav={isfav}
            addOrRemoveFromFav={addOrRemoveFromFav.bind(null, data, isfav)}
          />
        </CardLayout>
      );
    });
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div
      style={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-around",
        padding: "3rem",
      }}
    >
      {cards}
    </div>
  );
};

export default Movies;
