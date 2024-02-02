import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Button, Divider } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useNavigate, useParams } from "react-router-dom";

import { db } from "../../firebase/firebaseConfig";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

const OrderPage = () => {
  const { userData } = useContext(CartContext);
  let { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrderData = async () => {
      try {
        // Obtener la orden de Firestore usando el ID de la orden
        const q = query(collection(db, "orders"));
        const docs = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
        });
        const orderDoc = docs.find((doc) => (doc.id === orderId))
        if (orderDoc !== null) {
          setOrderData(orderDoc);
        } else {
          console.log("No se encontró la orden en Firestore.");
        }
      } catch (error) {
        console.error("Error al obtener la orden de Firestore: ", error);
      }
    };

    getOrderData();
  }, [orderId]);

  if (!orderData) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex-column gap-24">
      <h3>Finalización de la compra</h3>
      <Divider></Divider>
      <div className="flex-column items-center gap-16">
        <CheckCircleOutlineOutlinedIcon style={{ fontSize: 124, color: "green" }}/>
        <h2>Hola {userData.nombres}</h2>
        <h4>¡Gracias por tu compra!. Tu orden ha sido generada con éxito</h4>
        <p>
          Tu orden ha sido procesada exitosamente con el siguiente número de
          orden: { orderData.id }
        </p>
        <p>
          Recibirás un correo electrónico de confirmación a{" "}
          <span className="fw-600">{userData.correo}</span> con todos los
          detalles de tu orden
        </p>
      </div>
      <Button variant="contained" onClick={() => {navigate('/')}}>Seguir comprando</Button>
    </div>
  );
};

export default OrderPage;
