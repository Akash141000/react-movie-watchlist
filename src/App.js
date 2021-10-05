import Login from "./pages/login";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./pages/signup";
import Navbar from "./components/Navbar";
import Movies from "./pages/movies";
import { useSelector } from "react-redux";

const initialStoreState = {
  isAuthenticated: false,
};

const App = () => {
  const storeState = useSelector(
    (state = initialStoreState) => state.isAuthenticated
  );
  const path = storeState ? "/movies" : "login";
  const loggedIn = (
    <>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
    </>
  );
  const loggedOut = (
    <>
      {loggedIn}
      <Route path="/movies">
        <Movies />
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
