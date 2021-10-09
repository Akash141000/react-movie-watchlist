import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import React, {  useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";

const NavHeader: React.FC = (props) => {
  return (
    <div className={styles.header}>
      <div>
        <h1>WatchList</h1>
      </div>
      <nav className={styles.navItems}>
        <ul>{props.children}</ul>
      </nav>
    </div>
  );
};

const Navbar: React.FC = () => {
  const context = useContext(AuthContext);

  useEffect(() => {
    context.autoLogin();
  }, []);

  const loggedIn = (
    <>
      <li>
        <NavLink to="/movies">Movies</NavLink>
      </li>
      <li>
        <NavLink to="/add-movie">Add Movie</NavLink>
      </li>
      <li>
        <NavLink to="/favourites">Favourites</NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={context.removeAuthentication}>
          Logout
        </NavLink>
      </li>
    </>
  );

  const loggedOut = (
    <>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Signup</NavLink>
      </li>
    </>
  );

  const navItems = (
    <NavHeader>{context.isAuthenticated ? loggedIn : loggedOut}</NavHeader>
  );

  return navItems;
};
export default Navbar;
