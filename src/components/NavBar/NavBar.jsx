import CartWidget from "../CartWidget/CartWidget";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate();

  return (
    <div className="header">
      <img src={logo} alt="logo" height={60} onClick={ () => navigate("/")}></img>
      <nav className="navbar">
        <Link to="/" className="navbar_item">
          Inicio
        </Link>
        <Link to="/category/1" className="navbar_item">
          Celulares
        </Link>
        <Link to="/category/2" className="navbar_item">
          Laptops
        </Link>
        <Link to="/category/3" className="navbar_item">
          Televisores
        </Link>
      </nav>
      <CartWidget></CartWidget>
    </div>
  );
};

export default NavBar;
