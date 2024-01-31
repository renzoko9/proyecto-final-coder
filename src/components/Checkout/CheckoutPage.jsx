import { ShoppingCartIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Button, Divider, TextField } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CheckoutPage = () => {
  const { numeroItems, itemsCart, costoTotal } = useContext(CartContext);

  return (
    <div className="flex-column gap-12">
      <div className="flex items-center gap-12">
        <CheckIcon height={24} />
        <h3>Complete y verifique los datos para la compra</h3>
      </div>
      <div className="flex-column gap-12 card-form">
        <p>Datos personales</p>
        <div className="flex gap-24">
          <TextField
            id="outlined-basic"
            fullWidth
            label="Nombres"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label="Apellidos"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label="Telefono"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label="Correo"
            variant="outlined"
          />
        </div>
      </div>
      <p>Datos de la compra</p>
      <div className="flex gap-24">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Producto</TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Total</TableCell>
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
                  <TableCell align="center">{item.cantidad}</TableCell>
                  <TableCell align="center">
                    $/. {item.precioUnitario * item.cantidad}
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
          <Button
            variant="contained"
            onClick={() => {
              navigate("/order");
            }}
          >
            Pagar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
