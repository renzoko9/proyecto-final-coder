import { CheckIcon } from "@heroicons/react/24/outline";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { Alert, Button, Divider, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
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
import { ErrorOutlineOutlined } from "@mui/icons-material";

const CheckoutPage = () => {
  const {
    numeroItems,
    itemsCart,
    costoTotal,
    userData,
    setUserData,
    vaciarCarrito,
  } = useContext(CartContext);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showErrorAlertForm, setShowErrorAlertForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePagar = async () => {
    try {
      if (
        userData.nombres === "" ||
        userData.apellidos === "" ||
        userData.telefono === "" ||
        userData.correo === "" ||
        userData.repetirCorreo === ""
      ) {
        setShowErrorAlertForm(true);
        return;
      } else {
        setLoading(true);
        // Validar que los correos ingresados sean iguales
        if (userData.correo !== userData.repetirCorreo) {
          setShowErrorAlert(true);
          return;
        }

        // Guardar el pedido en Firestore
        const orderRef = await addDoc(collection(db, "orders"), {
          items: itemsCart,
          costoTotal: costoTotal,
          fecha: new Date(),
          estado: "Generada",
        });

        setLoading(false);
        // Vacia el carrito
        vaciarCarrito();

        // Redireccionar a la página de pedido con el ID de la orden
        navigate(`/order/${orderRef.id}`);
      }
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
      {showErrorAlert && (
        <Alert
          icon={<ErrorOutlineOutlined fontSize="inherit" />}
          severity="error"
          onClose={() => setShowErrorAlert(false)}
        >
          Los correos no coinciden. Verifica que sean los correctos.
        </Alert>
      )}
      {showErrorAlertForm && (
        <Alert
          icon={<ErrorOutlineOutlined fontSize="inherit" />}
          severity="error"
          onClose={() => setShowErrorAlertForm(false)}
        >
          Complete todos los campos del formulario porfavor.
        </Alert>
      )}
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
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "24px", backgroundColor: "#f0f0f0" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "lightblue" }}>
              <TableRow>
                <TableCell align="left">
                  <h4>Producto</h4>
                </TableCell>
                <TableCell align="center">
                  <h4>Precio</h4>
                </TableCell>
                <TableCell align="center">
                  <h4>Cantidad</h4>
                </TableCell>
                <TableCell align="center">
                  <h4>Total</h4>
                </TableCell>
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
          <h3>Resumen total</h3>
          <Divider></Divider>
          <div className="flex items-center gap-12">
            <p>Cantidad Items:</p>
            <h2>{numeroItems}</h2>
          </div>
          <div className="flex items-center gap-12">
            <p>Precio total:</p>
            <h2>$/. {costoTotal}</h2>
          </div>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            variant="contained"
            onClick={handlePagar}
            startIcon={<CreditCardOutlinedIcon />}
          >
            <span>Pagar</span>
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
