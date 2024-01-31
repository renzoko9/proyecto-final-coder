import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
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

export const CartPage = () => {
  const { numeroItems, itemsCart, costoTotal, agregarItem, quitarItem, eliminarItem } = useContext(CartContext);

  const navigate = useNavigate();

  return (
    <div className="flex-column gap-12">
      <div className="flex items-center gap-12">
        <ShoppingCartIcon height={24} />
        <h3>Mi carrito de compras</h3>
        <span className="text-secondary">( {numeroItems} unidades )</span>
      </div>
      <Divider></Divider>
      <div className="flex gap-24">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Producto</TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Eliminar</TableCell>
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
                        <small>{item.categoria.toUpperCase()}</small>
                        <p>{item.descripcion}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    $/. {item.precioUnitario}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex gap-8">
                      <button
                        onClick={() => {
                          quitarItem(item.id);
                        }}
                      >
                        -
                      </button>
                      <p>{item.cantidad}</p>
                      <button
                        onClick={() => {
                          agregarItem(item.id);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    $/. {item.precioUnitario * item.cantidad}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="delete" size="large" onClick={() => { eliminarItem(item.id) }}>
                        <TrashIcon height={24} className="delete-icon"></TrashIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex-column gap-12 card-resumen">
          <h3>Resumen de la compra</h3>
          <Divider></Divider>
          <div className="flex items-center gap-12">
            <p>Total:</p>
            <h2>$/. {costoTotal}</h2>
          </div>
          <Button variant="contained" onClick={() => {navigate('/checkout')}}>Continuar</Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
