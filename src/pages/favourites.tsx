import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import CardLayout from "../layout/cardLayout";
import React from "react";
import { Post } from "../util/types";
import FavContext from "../store/fav-context";
import { useSelector } from "react-redux";
import { initialStoreState } from "../store/store";
import useHttp from "../hooks/use-http";

const Favourites: React.FC = (props) => {
  const favourites = useSelector<initialStoreState, Post[]>(
    (state) => state.favourites
  );
  const favContext = useContext(FavContext);

  ////
  const [responseData, setResponseData] = useState(null);
  const { isLoading, error, sendResponse } = useHttp();

  useEffect(() => {
    sendResponse(
      "/favourites",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
      setResponseData
    );
  }, []);
  ///

  let cards: Post[];
  if (!isLoading && !error) {
    cards = responseData.map((data) => {
      return (
        <CardLayout>
          <Card
            imgSrc={data.image}
            description={data.description}
            title={data.title}
            isFav={true}
            addOrRemoveFromFav={favContext.favAction.bind(null, data, true)}
          />
        </CardLayout>
      );
    });
  }

  return isLoading && error ? (
    <div>Add Favourites</div>
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
export default Favourites;
