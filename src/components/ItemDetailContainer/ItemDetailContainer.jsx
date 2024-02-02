/* eslint-disable no-unused-vars */
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// FIREBASE
import { db } from "../../firebase/firebaseConfig";
import { query, collection, getDocs } from "firebase/firestore";
import { CartContext } from "../../context/CartContext";
import {
  AddCircleOutline,
  AddShoppingCartOutlined,
  RemoveCircleOutline,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";

import "./ItemDetailContainer.css";
import { CheckIcon } from "@heroicons/react/24/outline";

const ItemDetailContainer = () => {
  const [itemsData, setItemsData] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  let { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, buscarItemEnCarrito } = useContext(CartContext);

  const item = itemsData.find((item) => {
    return item.id === id;
  });

  useEffect(() => {
    const getItems = async () => {
      const q = query(collection(db, "items"));
      const docs = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setItemsData(docs);
    };
    getItems();
  }, []);

  const agregarItem = () => {
    setCantidad(cantidad + 1);
  };

  const quitarItem = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarItemACarrito = () => {
    const itemCart = {
      id: id,
      foto: item.foto,
      descripcion: item.descripcion,
      categoria: item.categoria,
      precioUnitario: item.precioUnitario,
      cantidad: cantidad,
    };
    addToCart(itemCart);
  };

  return (
    <div className="flex justify-center items-center h-100">
      <div className="flex gap-24">
        {item ? (
          <>
            <img src={item.foto} height={320} alt="item" />
            <div className="flex-column gap-16">
              <div className="flex-column gap-8">
                <h5 className="category">{item.categoria.toUpperCase()}</h5>
                <h3>{item.descripcion}</h3>
                <h2 className="precio">$/.{item.precioUnitario}</h2>
              </div>
              <Divider></Divider>

              {buscarItemEnCarrito(item.id) ? (
                <Alert severity="success">
                  Producto agregado al carrito
                </Alert>
              ) : (
                <div className="flex items-center gap-8 quantity">
                  <IconButton
                    onClick={() => {
                      quitarItem();
                    }}
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                  <p>{cantidad}</p>
                  <IconButton
                    onClick={() => {
                      agregarItem();
                    }}
                  >
                    <AddCircleOutline />
                  </IconButton>
                </div>
              )}
              {buscarItemEnCarrito(item.id) ? (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<ShoppingCartCheckoutOutlined />}
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  Ir al carrito
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartOutlined />}
                  disabled={cantidad === 0}
                  onClick={() => {
                    agregarItemACarrito();
                  }}
                >
                  Agregar al carrito
                </Button>
              )}
            </div>
          </>
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
};

export default ItemDetailContainer;
