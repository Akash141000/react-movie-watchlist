import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useContext, useEffect } from "react";
import { initialStoreState } from "../store/store";
import AuthContext from "../store/auth-context";
import { Button } from "@mui/material";

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

const Navbar = () => {
  const context = useContext(AuthContext);
  useEffect(()=>{
    context.autoLogin();
  },[]);

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
        <NavLink to="/" onClick={context.removeAuthentication}>Logout</NavLink>
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

//   const navItems = (<NavHeader>
//   <NavIcons name="Movies" link="/"></NavIcons>
//   <NavIcons name="Add Movie" link="/Add_Movie"></NavIcons>
//   <NavIcons name="Favourites" link="/favourites"></NavIcons>
//   <li>
//     <button onClick={()=>console.log('Logout')}>logout</button>
//   </li>
// </NavHeader>);
