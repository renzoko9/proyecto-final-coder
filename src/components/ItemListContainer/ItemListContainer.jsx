/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import "./ItemListContainer.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// FIREBASE
import { db } from "../../firebase/firebaseConfig";
import { query, collection, getDocs } from "firebase/firestore";

const ItemListContainer = (props) => {

  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    const getItems = async() => {
      const q = query(collection(db, "items"));
      const docs = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docs.push({...doc.data(), id: doc.id });
      });
      setItemsData(docs);
    };
    getItems();
  }, []);
  const arregloPrueba = [
    {
      id: 1,
      descripcion: "Laptop Lenovo IdeaPad 1 15.6",
      categoria: "Celular",
      categoriaId: 1,
      stock: 12,
      precioUnitario: 2300,
    },
    {
      id: 2,
      descripcion: "Xiaomi Redmi 12",
      categoria: "Celular",
      categoriaId: 1,
      stock: 5,
      precioUnitario: 1600,
    },
    {
      id: 3,
      descripcion: "Laptop Lenovo IdeaPad 1 15.6",
      categoria: "Laptop",
      categoriaId: 2,
      stock: 9,
      precioUnitario: 2800,
    },
    {
      id: 4,
      descripcion: "Laptop Lenovo IdeaPad 1 15.6",
      categoria: "Laptop",
      categoriaId: 2,
      stock: 6,
      precioUnitario: 1200,
    },
    {
      id: 5,
      descripcion: "Laptop Lenovo IdeaPad 1 15.6",
      categoria: "Televisor",
      categoriaId: 3,
      stock: 7,
      precioUnitario: 800,
    },
  ];

  let { id } = useParams();

  return (
    <div className="list-container">
      <h3>Lista de Productos</h3>
      <div className="list">
        {itemsData
          .filter((item) =>
            id === undefined ? true : item.categoria == id
          )
          .map((item, index) => {
            return (
              <Card sx={{ maxWidth: 345 }} key={index}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={item.foto}
                    alt="Laptop"
                  />
                  <Divider></Divider>
                  <CardContent>
                    <p className="fw-600">{item.categoria}</p>
                    <h2 className="description">{item.descripcion}</h2>
                    <div className="flex justify-space-between">
                      <h3>Precio</h3>
                      <h2>$/. {item.precioUnitario}</h2>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })} 
      </div>
    </div>
  );
};

export default ItemListContainer;
