import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//
import useHttp from "../hooks/use-http";
//
import Card from "../components/Card";
import { dispatchType, Post } from "../util/types";
import FavContext from "../store/fav-context";
import { favAction, initialStoreState } from "../store/store";

const Movies = () => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const favContext = useContext(FavContext);
  const movies = useSelector((state: initialStoreState) => state.movies);
  const [responseData, setResponseData] = useState<{
    posts: Post[];
  }>({ posts: null });
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


  useEffect(() => {
    if (!isLoading && !error) {
      dispatch(favAction.addMovies(responseData.posts));
    }
  }, [isLoading, error,responseData]);

  useEffect(() => {
    const length = movies.length > 0 ? true : false;
    if (!isLoading && !error && length) {
      const elements = movies.map((data) => {
        return (
          <Card
            key={data._id}
            imgSrc={data.image}
            description={data.description}
            title={data.title}
            isFav={data.isFav}
            addOrRemoveFromFav={favContext.favAction.bind(
              null,
              data,
              data.isFav,
              dispatchType.movies
            )}
          />
        );
      });
      setCards(elements);
    }
  }, [isLoading, error,movies]);

  return isLoading && error && cards.length <= 0 ? (
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

