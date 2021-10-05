import Login from "./pages/login";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./pages/signup";
import Navbar from "./components/Navbar";
import Movies from "./pages/movies";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/movies">
        <Movies />
      </Route>
    </Switch>
  );
};

export default App;
