import Login from "./pages/login";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./pages/signup";
import Navbar from "./components/Navbar";
import Movies from "./pages/movies";
import { useSelector } from "react-redux";
import AddMovie from "./pages/addMovie";
import Favourites from "./pages/favourites";

const initialStoreState = {
  isAuthenticated: false,
};

const App = () => {
  const storeState = useSelector(
    (state = initialStoreState) => state.isAuthenticated
  );
  const path = storeState ? "/movies" : "login";
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
        <AddMovie/>
      </Route>
      <Route path="/favourites">
        <Favourites/>
      </Route>
    </>
  );
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to={path} />
      </Route>
      {storeState ? loggedIn : loggedOut}
    </Switch>
  );
};

export default App;
