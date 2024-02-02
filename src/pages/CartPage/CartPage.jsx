import { Button, Divider, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./CartPage.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import {
  AddCircleOutline,
  DeleteOutline,
  RemoveCircleOutline,
  SentimentDissatisfiedOutlined,
} from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export const CartPage = () => {
  const {
    numeroItems,
    itemsCart,
    costoTotal,
    agregarItem,
    quitarItem,
    eliminarItem,
    vaciarCarrito,
  } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <div className="flex-column gap-12">
      <div className="flex items-center gap-12">
        <ShoppingCartOutlinedIcon />
        <h3>Mi carrito de compras</h3>
        <span className="text-secondary">( {numeroItems} unidades )</span>
      </div>
      <Divider></Divider>
      <div className="flex gap-24">
        {itemsCart.length === 0 ? (
          <div className="flex gap-12 justify-center items-center w-100">
            <p>No tienes ningún producto en el carrito</p>
            <SentimentDissatisfiedOutlined />
          </div>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: '24px', backgroundColor: '#f0f0f0' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: 'lightgray'}}>
                <TableRow>
                  <TableCell align="left"><h4>Producto</h4></TableCell>
                  <TableCell align="center"><h4>Precio</h4></TableCell>
                  <TableCell align="center"><h4>Cantidad</h4></TableCell>
                  <TableCell align="center"><h4>Total</h4></TableCell>
                  <TableCell align="center"><h4>Eliminar</h4></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemsCart.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div className="flex items-center gap-24">
                        <img src={item.foto} height={80} />
                        <div className="flex-column gap-8">
                          <small className="category fw-600">{item.categoria.toUpperCase()}</small>
                          <p>{item.descripcion}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      $/. {item.precioUnitario}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex items-center gap-8 quantity">
                        <IconButton
                          onClick={() => {
                            quitarItem(item.id);
                          }}
                        >
                          <RemoveCircleOutline />
                        </IconButton>
                        <p>{item.cantidad}</p>
                        <IconButton
                          onClick={() => {
                            agregarItem(item.id);
                          }}
                        >
                          <AddCircleOutline />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      $/. {item.precioUnitario * item.cantidad}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => {
                          eliminarItem(item.id);
                        }}
                      >
                        <DeleteOutline className="delete-icon"></DeleteOutline>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div className="flex-column gap-12 card-resumen">
          <h3>Resumen de la compra</h3>
          <Divider></Divider>
          <div className="flex items-center gap-12 expanded">
            <p>Total:</p>
            <h2>$/. {costoTotal}</h2>
          </div>
          <Button
            variant="contained"
            disabled={itemsCart.length === 0}
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Ir a pagar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              vaciarCarrito();
            }}
          >
            Vaciar el carrito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
