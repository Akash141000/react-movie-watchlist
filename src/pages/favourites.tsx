import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { dispatchType, Post } from "../util/types";
import FavContext from "../store/fav-context";
import { useDispatch, useSelector } from "react-redux";
import { favAction, initialStoreState } from "../store/store";
import useHttp from "../hooks/use-http";
import Spinner from "../components/Spinner";
import Main from "../layout/Main";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Favourites = () => {
  const favContext = useContext(FavContext);
  const dispatch = useDispatch();
  const favourites = useSelector(
    (state: initialStoreState) => state.favourites
  );
  const [cards, setCards] = useState([]);
  const [responseData, setResponseData] = useState<Post[]>([]);

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

  useEffect(() => {
    if (!isLoading) {
      dispatch(favAction.addFavourites(responseData));
    }
  }, [isLoading, error, responseData]);

  useEffect(() => {
    if (!isLoading && !error) {
      const elements = favourites.map((data) => {
        return (
          <Card
            key={data._id}
            imgSrc={data.image}
            description={data.description}
            title={data.title}
            isFav={true}
            addOrRemoveFromFav={favContext.favAction.bind(
              null,
              data,
              true,
              dispatchType.favourites
            )}
          />
        );
      });
      setCards(elements);
    } else if (!isLoading && error) {
      console.log("Error fetching resource from fav");
    }
  }, [isLoading, error, favourites]);

  return isLoading || error ? (
    <Spinner />
  ) : (
    <Main>
      {favourites.length <= 0 ? <Main><Button variant="text"><Link to="/movies">Add movies to favourites</Link> </Button> </Main> : cards}
    </Main>
  );
};

export default Favourites;
