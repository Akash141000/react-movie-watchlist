import { useContext, useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import Card from "../components/Card";
import CardLayout from "../layout/cardLayout";
import { Post } from "../util/types";
import FavContext from "../store/fav-context";
import { useSelector, useDispatch } from "react-redux";
import { favAction, initialStoreState } from "../store/store";

const Movies = () => {
  const favContext = useContext(FavContext);
  const dispatch = useDispatch();
  const movies = useSelector((state: initialStoreState) => state.movies);
  const [cards, setCards] = useState([]);
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
    console.log("movies changes");
    if (movies.length > 0) {
      setResponseData({ posts: movies });
      console.log("movies");
    }
  }, [movies]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(favAction.addMovies(responseData.posts));
    }
  }, [isLoading, error]);

  useEffect(() => {
    if (!isLoading) {
      const elements = responseData.posts.map((data) => {
        return (
          <CardLayout>
            <Card
              key={data._id}
              imgSrc={data.image}
              description={data.description}
              title={data.title}
              isFav={data.isFav}
              addOrRemoveFromFav={favContext.favAction.bind(
                null,
                data,
                data.isFav
              )}
            />
          </CardLayout>
        );
      });
      setCards(elements);
    }
  }, [responseData.posts, isLoading]);

  return isLoading && error ? (
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
