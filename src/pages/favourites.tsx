import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import CardLayout from "../layout/cardLayout";
import React from "react";
import { dispatchType, Post } from "../util/types";
import FavContext from "../store/fav-context";
import { useDispatch, useSelector } from "react-redux";
import { favAction, initialStoreState } from "../store/store";
import useHttp from "../hooks/use-http";

// const Favourites: React.FC = (props) => {
//   const favourites = useSelector<initialStoreState, Post[]>(
//     (state) => state.favourites
//   );
//   const favContext = useContext(FavContext);
//   const dispatch = useDispatch();
//   const movies = useSelector((state: initialStoreState) => state.movies);
//   const [cards, setCards] = useState([]);
//   const [responseData, setResponseData] = useState<{
//     posts: Post[];
//   }>({ posts: null });
//   ////
//   const [responseData, setResponseData] = useState(null);
//   const { isLoading, error, sendResponse } = useHttp();

//   useEffect(() => {
//     sendResponse(
//       "/favourites",
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       },
//       setResponseData
//     );
//   }, []);
//   ///

//   useEffect(() => {
//     if (!isLoading) {
//       dispatch(favAction.addMovies(responseData.posts));
//     }
//   }, [isLoading, error]);

//   let cards: Post[];
//   if (!isLoading && !error) {
//     cards = responseData.map((data) => {
//       return (
//         <Card
//           key={data._id}
//           imgSrc={data.image}
//           description={data.description}
//           title={data.title}
//           isFav={true}
//           addOrRemoveFromFav={favContext.favAction.bind(null, data, true)}
//         />
//       );
//     });
//   }

//   return isLoading && error ? (
//     <div>Add Favourites</div>
//   ) : (
//     <div
//       style={{
//         display: "flex",
//         flexFlow: "row nowrap",
//         justifyContent: "space-around",
//         padding: "3rem",
//       }}
//     >
//       {cards}
//     </div>
//   );
// };
// export default Favourites;

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
    console.log("fav changes");
    setResponseData(favourites);
  }, [favourites]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(favAction.addFavourites(responseData));
    }
  }, [isLoading, error]);

  useEffect(() => {
    if (!isLoading) {
      const elements = responseData.map((data) => {
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
  }, [responseData, isLoading]);

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

export default Favourites;
