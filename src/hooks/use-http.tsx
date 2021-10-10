import { useState } from "react";
import { httpResponse, requestObj } from "../util/types";

const ErrorStatus: number[] = [400, 401, 402, 422, 500];
const SuccessStatus: number[] = [200, 201];

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
          throw new Error("Response timeout!");
        }
      }, 3000);
      if (ErrorStatus.includes(response.status)) {
        window.clearTimeout(responseTimer);
        throw new Error((response as httpResponse).error);
      } else if (SuccessStatus.includes(response.status)) {
        window.clearTimeout(responseTimer);
        const parsedData = await response.json();
        applyData(parsedData);
        setIsLoading(false);
      }
    } catch (err) {
      setError(true);
      setIsLoading(false);
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
