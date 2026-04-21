import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <NavLink to="/activities">Activities</NavLink>
      <NavLink to="/filter">Filter</NavLink>
      <NavLink to="/stats">Stats</NavLink>
    </nav>
  );
};

export default NavBar;
