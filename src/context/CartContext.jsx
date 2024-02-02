import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [itemsCart, setItemsCart] = useState([]);
  const [numeroItems, setNumeroItems] = useState(0);
  const [costoTotal, setCostoTotal] = useState(0);
  const [userData, setUserData] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    correo: "",
    repetirCorreo: "",
  });

  const addToCart = (item) => {
    const existingItemIndex = itemsCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // El producto ya está en el carrito, aumentar la cantidad
      const updatedItemsCart = [...itemsCart];
      updatedItemsCart[existingItemIndex].cantidad += item.cantidad;
      setItemsCart(updatedItemsCart);
    } else {
      // El producto no está en el carrito, añadirlo
      setItemsCart((prevItemsCart) => [...prevItemsCart, item]);
    }
  };

  const buscarItemEnCarrito = (itemId) => {
    // Verificar si el item está en el carrito
    return itemsCart.some((item) => item.id === itemId);
  };

  const quitarItem = (id) => {
    const updatedItemsCart = itemsCart.map((item) => {
      if (item.id === id && item.cantidad > 1) {
        return { ...item, cantidad: item.cantidad - 1 };
      }
      return item;
    });
    setItemsCart(updatedItemsCart);
  };

  const agregarItem = (id) => {
    const updatedItemsCart = itemsCart.map((item) => {
      if (item.id === id) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });
    setItemsCart(updatedItemsCart);
  };

  const eliminarItem = (id) => {
    const updatedItemsCart = itemsCart.filter((item) => item.id !== id);
    setItemsCart(updatedItemsCart);
  };

  const vaciarCarrito = () => {
    setItemsCart([]);
    setNumeroItems(0);
    setCostoTotal(0);
  };

  useEffect(() => {
    let totalItems = 0;
    let costoTotalItems = 0;
    itemsCart.forEach((item) => {
      totalItems += item.cantidad;
      costoTotalItems += item.precioUnitario * item.cantidad;
    });
    setNumeroItems(totalItems);
    setCostoTotal(costoTotalItems);
  }, [itemsCart]);

  return (
    <CartContext.Provider
      value={{
        itemsCart,
        addToCart,
        numeroItems,
        costoTotal,
        agregarItem,
        quitarItem,
        eliminarItem,
        vaciarCarrito,
        userData,
        setUserData,
        buscarItemEnCarrito
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
