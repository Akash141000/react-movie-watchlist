import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { dispatchType, Post } from "../util/types";
import FavContext from "../store/fav-context";
import { useDispatch, useSelector } from "react-redux";
import { favAction, initialStoreState } from "../store/store";
import useHttp from "../hooks/use-http";



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
  }, [isLoading, error,responseData]);

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
    }
  }, [isLoading,error,favourites]);

  return isLoading && error && favourites.length <=0  ?  (
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

export default Favourites;
