import { useState } from "react";
import { requestObj } from "../util/types";

const useHttp = () => {
  const { REACT_APP_DOMAIN } = process.env;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const sendResponse = async (
    appendUrl: string,
    requestObj: requestObj,
    applyData: any
  ) => {
    let ContentType = {
      "Content-Type": "application/json",
    };
    const DOMAIN = REACT_APP_DOMAIN!.concat(appendUrl);

    const method = requestObj.method ? requestObj.method : "GET";
    const headers = requestObj.headers
      ? { ...ContentType, ...requestObj.headers }
      : { ...ContentType };
    const body = method === "POST" ? { ...requestObj.body } : null;
    let requestBody = {
      method: method,
      headers: headers,
      body: null,
    };
    requestBody =
      method === "POST"
        ? {
            ...requestBody,
            body: JSON.stringify({ ...body }),
          }
        : { ...requestBody };
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${DOMAIN}`, { ...requestBody });
    
      const responseTimer = setTimeout(() => {
        if (!response) {
          throw new Error("Error fetching data");
        }
      }, 5000);
      if (response.status === 401 && 422 && 500) {
 
        window.clearTimeout(responseTimer);
        throw new Error("Error fetching data");
      } else if (response.status === 200 || 201) {

        window.clearTimeout(responseTimer);
        const parsedData = await response.json();
        applyData(parsedData);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError(true);
      console.log(err);
    }
  };

  return {
    isLoading,
    error,
    sendResponse,
  };
};
export default useHttp;
