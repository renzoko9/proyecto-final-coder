import { useContext } from "react";
import "./CartWidget.css";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

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
      <ShoppingCartIcon height={24} />
      <div className="cart_count">
        <span>{numeroItems}</span>
      </div>
    </div>
  );
};

export default CartWidget;
