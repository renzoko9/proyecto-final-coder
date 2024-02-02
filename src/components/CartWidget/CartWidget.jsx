import { useContext } from "react";
import "./CartWidget.css";

import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";

const CartWidget = () => {
  const { numeroItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div
      className="cart_wrapper"
      onClick={() => {
        navigate("/cart");
      }}
    >
      <ShoppingCart />
      <div className="cart_count">
        <span>{numeroItems}</span>
      </div>
    </div>
  );
};

export default CartWidget;
