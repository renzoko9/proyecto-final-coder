import CartWidget from "../CartWidget/CartWidget";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate();

  return (
    <div className="header">
      <img id="logo" src={logo} alt="logo" height={60} onClick={ () => navigate("/")}></img>
      <nav className="navbar">
        <Link to="/category/celular" className="navbar_item">
          Celulares
        </Link>
        <Link to="/category/laptop" className="navbar_item">
          Laptops
        </Link>
        <Link to="/category/televisor" className="navbar_item">
          Televisores
        </Link>
      </nav>
      <CartWidget></CartWidget>
    </div>
  );
};

export default NavBar;
