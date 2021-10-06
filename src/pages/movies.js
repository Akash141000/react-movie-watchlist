import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";

const Movies = () => {
  const [responseData, setResponseData] = useState();

  useEffect(() => {
    sendResponse(
      "/posts",
      {
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      },
      setResponseData
    );
  }, []);
  const { isLoading, error, sendResponse } = useHttp();
  return <div>Movies</div>;
};

export default Movies;
