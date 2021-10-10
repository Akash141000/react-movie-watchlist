import Login from "./pages/login";
import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./pages/signup";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Spinner from "./components/Spinner";

const App = () => {
  const context = useContext(AuthContext);
  const path = context.isAuthenticated ? "/movies" : "/login";

  const Movies = React.lazy(()=>import("./pages/movies"));
  const AddMovie = React.lazy(()=>import("./pages/addMovie"));
  const Favourites = React.lazy(()=>import("./pages/favourites"));

  const loggedOut = (
    <>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
    </>
  );
  const loggedIn = (
    <>
      {loggedOut}
      <Route path="/movies">
        <Movies/>
      </Route>
      <Route path="/add-movie">
        <AddMovie/>
      </Route>
      <Route path="/favourites">
        <Favourites/>
      </Route>
    </>
  );
  return (
    <Suspense fallback={<Spinner/>}>
    <Switch>
      {context.isAuthenticated ? loggedIn : loggedOut}
      <Route path="/">
        <Redirect to={path} />
      </Route>
    </Switch>
    </Suspense>
  );
};

export default App;
