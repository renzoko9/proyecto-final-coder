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

const ItemListContainer = (props) => {
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
        {arregloPrueba
          .filter((value) =>
            id === undefined ? true : value.categoriaId == id
          )
          .map((value, index) => (
            <Card sx={{ maxWidth: 345 }} key={index}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="https://coolboxpe.vtexassets.com/arquivos/ids/292488-800-auto?v=638265159325630000&width=800&height=auto&aspect=true"
                  alt="Laptop"
                />
                <Divider></Divider>
                <CardContent>
                  <p className="fw-600">{value.categoria}</p>
                  <h2 className="description">{value.descripcion}</h2>
                  <div className="flex justify-space-between">
                    <h3>Precio</h3>
                    <h2>$/. {value.precioUnitario}</h2>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
