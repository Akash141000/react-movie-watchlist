import { useState } from "react";

const useHttp = () => {
  const { REACT_APP_DOMAIN } = process.env;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const sendResponse = async (appendUrl, requestObj, applyData) => {
    let headers = {
      "Content-Type": "application/json",
    };
    const DOMAIN = REACT_APP_DOMAIN.concat(appendUrl);
    const method = requestObj.method ? requestObj.method : "GET";
    headers = requestObj.headers
      ? { ...headers, ...requestObj.headers }
      : { ...headers };
    const body = method === "POST" ? { ...requestObj.body } : null;
    let requestBody = {
      method: method,
      headers: headers,
      body: null,
    };
    requestBody = method === "POST" && {
      ...requestBody,
      body: JSON.stringify({ ...body }),
    };

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${DOMAIN}`, { ...requestBody });

      if (response.status === 401) {
        setError(true);
      } else if (response.status === 422) {
        setError(true);
      } else if (response.status === 500) {
        setError(true);
      } else if (response.status === 200) {
        const parsedData = await response.json();
        applyData(parsedData);
      }
    } catch (err) {
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
