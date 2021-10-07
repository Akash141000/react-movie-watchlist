import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

import Card from "../components/Card";
import createPalette from "@mui/material/styles/createPalette";
import CardLayout from "../layout/cardLayout";
import { Post } from "../util/types";

const Movies = () => {
  const [responseData, setResponseData] = useState<Post[]>([]);
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

  let cards;
  if (!isLoading && !error) {
    cards = (
      <ul>
        {responseData.map((data) => {
          return (
            <CardLayout>
              <Card
                imgSrc={data.image}
                description={data.description}
                title={data.title}
              />
            </CardLayout>
          );
        })}
      </ul>
    );
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
