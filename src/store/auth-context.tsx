import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

interface authData {
  token: string;
  user: string;
}

const AuthContext = createContext({
  isAuthenticated: false,
  setAuthentication: (authData: authData) => void {},
  removeAuthentication: () => void {},
});

export const AuthContextProvider = (props) => {
  const history = useHistory();
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
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
