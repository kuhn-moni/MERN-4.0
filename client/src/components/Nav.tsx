import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Nav() {
  const { user, logout } = useContext(AuthContext);

  const navContainerStyles: React.CSSProperties = {
    width: "100%",
    height: "50px",
    border: "solid 1px black",
    display: "flex",
    gap: "1em",
    alignItems: "center",
    padding: "0 1em",
  };

  const linksContainerStyles: React.CSSProperties = {
    display: "flex",
    gap: "1em",
  };

  const activeLink: React.CSSProperties = {
    color: "red",
    fontWeight: "bold",
  };

  return (
    <nav style={navContainerStyles}>
      <div style={linksContainerStyles}>
        <NavLink to="/" style={({ isActive }) => (isActive ? activeLink : {})}>
          Homepage
        </NavLink>
        <NavLink to="/users" style={({ isActive }) => (isActive ? activeLink : {})}>
          Users
        </NavLink>
        <NavLink to="/login" style={({ isActive }) => (isActive ? activeLink : {})}>
          Login
        </NavLink>
      </div>
      <p>{user ? <button onClick={logout}>Logout</button> : "User is logged out"}</p>
    </nav>
  );
}

export default Nav;
