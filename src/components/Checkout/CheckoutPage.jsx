import { ShoppingCartIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Button, Divider, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

import { db } from "../../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const CheckoutPage = () => {
  const { numeroItems, itemsCart, costoTotal, userData, setUserData } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePagar = async () => {
    try {
      // Guardar el pedido en Firestore
      const orderRef = await addDoc(collection(db, "orders"), {
        items: itemsCart,
        costoTotal: costoTotal,
        fecha: new Date(),
        estado: "Generada",
      });

      // Redireccionar a la página de pedido con el ID de la orden
      navigate(`/order/${orderRef.id}`);
    } catch (error) {
      console.error("Error al guardar el pedido en Firestore: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className="flex-column gap-12">
      <div className="flex items-center gap-12">
        <CheckIcon height={24} />
        <h3>Complete y verifique los datos para la compra</h3>
      </div>
      <div className="flex-column gap-12 card-form">
        <p>Datos personales</p>
        <div className="flex-column gap-24"></div>
        <div className="flex gap-24">
          <TextField
            id="outlined-basic"
            fullWidth
            label="Nombres"
            variant="outlined"
            name="nombres"
            value={userData.nombres}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label="Apellidos"
            variant="outlined"
            name="apellidos"
            value={userData.apellidos}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label="Telefono"
            variant="outlined"
            name="telefono"
            value={userData.telefono}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-24">
          <TextField
            id="outlined-basic"
            fullWidth
            label="Correo"
            variant="outlined"
            name="correo"
            value={userData.correo}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic"
            fullWidth
            label="Repetir Correo"
            variant="outlined"
            name="repetirCorreo"
            value={userData.repetirCorreo}
            onChange={handleInputChange}
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
            onClick={handlePagar}
          >
            Pagar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
