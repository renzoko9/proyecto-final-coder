import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Button, Divider } from "@mui/material";
import { useParams } from "react-router-dom";

import { db } from "../../firebase/firebaseConfig";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

const OrderPage = () => {
  const { userData } = useContext(CartContext);
  let { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);

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
      <h3>Datos de la compra</h3>
      <Divider></Divider>
      <div className="flex-column gap-16">
        <h3>Hola {userData.nombres}</h3>
        <p>¡Gracias por tu compra!. Tu orden ha sido generada</p>
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
      <Button variant="contained">Seguir comprando</Button>
    </div>
  );
};

export default OrderPage;
