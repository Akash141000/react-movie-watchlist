import Login from "./pages/login";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./pages/signup";
import Movies from "./pages/movies";
import AddMovie from "./pages/addMovie";
import Favourites from "./pages/favourites";
import { useContext } from "react";
import AuthContext from "./store/auth-context";


const App = () => {
  const context = useContext(AuthContext);
  const path = context.isAuthenticated ? "/movies" : "login";
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
        <Movies />
      </Route>
      <Route path="/add-movie">
        <AddMovie />
      </Route>
      <Route path="/favourites">
        <Favourites />
      </Route>
    </>
  );
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to={path} />
      </Route>
      {context.isAuthenticated ? loggedIn : loggedOut}
    </Switch>
  );
};

export default App;
