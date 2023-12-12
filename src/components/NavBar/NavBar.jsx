import CartWidget from "../CartWidget/CartWidget";
import "./NavBar.css";
import logo from "../../assets/logo.png";

const NavBar = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" height={60}></img>
      <nav className="navbar">
        <a href="#" className="navbar_item">
          Inicio
        </a>
        <a href="#" className="navbar_item">
          Productos
        </a>
        <a href="#" className="navbar_item">
          Contacto
        </a>
      </nav>
      <CartWidget></CartWidget>
    </div>
  );
};

export default NavBar;
