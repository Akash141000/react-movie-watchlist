import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";

interface authData {
  token: string;
  user: string;
}

const AuthContext = createContext({
  isAuthenticated: false,
  setAuthentication: (authData: authData) => void {},
  removeAuthentication: () => void {},
  autoLogin: () => void {},
});

export const AuthContextProvider = (props) => {
  const history = useHistory();
  const { isLoading, error, sendResponse } = useHttp();
  const [responseData, setResponseData] = useState(null);
  const [authenticated, isAuthenticated] = useState(false);

  function setAuthentication(authData) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem("expiryDate", expiryDate.toISOString());
    history.push("/movies");
    isAuthenticated(true);
  }

  function tryAuthentication() {
    const token = localStorage.getItem("token");
    console.log('is true');
    if (token) {
      sendResponse(
        "/auth",
        {
          headers: {
            Authorization: token,
          },
        },
        setResponseData
      );
    }
  }

  useEffect(() => {
    if (!isLoading && !error && responseData.auth) {
      isAuthenticated(true);
      history.push("/movies");
    }
  }, [isLoading, error]);

  function removeAuthentication() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    isAuthenticated(false);
  }

  const context = {
    isAuthenticated: authenticated,
    setAuthentication: setAuthentication,
    removeAuthentication: removeAuthentication,
    autoLogin: tryAuthentication,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
