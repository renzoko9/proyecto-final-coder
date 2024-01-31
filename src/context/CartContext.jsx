import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [itemsCart, setItemsCart] = useState([]);
  const [numeroItems, setNumeroItems] = useState(0);
  const [costoTotal, setCostoTotal] = useState(0);

  const addToCart = (item) => {
    setItemsCart((prevItemsCart) => [...prevItemsCart, item]);
  };

  const quitarItem = (id) => {
    const updatedItemsCart = itemsCart.map(item => {
      if (item.id === id && item.cantidad > 1) {
        return { ...item, cantidad: item.cantidad - 1 };
      }
      return item;
    });
    setItemsCart(updatedItemsCart);
  };

  const agregarItem = (id) => {
    const updatedItemsCart = itemsCart.map(item => {
      if (item.id === id) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });
    setItemsCart(updatedItemsCart);
  };

  const eliminarItem = (id) => {
    const updatedItemsCart = itemsCart.filter(item => item.id !== id);
    setItemsCart(updatedItemsCart);
  };

  useEffect(() => {
    let totalItems = 0;
    let costoTotalItems = 0;
    itemsCart.forEach((item) => {
      totalItems += item.cantidad;
      costoTotalItems += (item.precioUnitario * item.cantidad)
    });
    setNumeroItems(totalItems);
    setCostoTotal(costoTotalItems);
  }, [itemsCart]);

  return (
    <CartContext.Provider value={{ itemsCart, addToCart, numeroItems, costoTotal, agregarItem, quitarItem, eliminarItem }}>
      {children}
    </CartContext.Provider>
  );
};
