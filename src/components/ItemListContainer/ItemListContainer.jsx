/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Divider } from "@mui/material";
import "./ItemListContainer.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// FIREBASE
import { db } from "../../firebase/firebaseConfig";
import { query, collection, getDocs } from "firebase/firestore";

const ItemListContainer = () => {
  const [itemsData, setItemsData] = useState([]);

  let { categoryId } = useParams();

  const navigate = useNavigate();

  const itemsDataFiltered = itemsData.filter((item) =>
    categoryId === undefined ? true : item.categoria === categoryId
  );

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

  return (
    <div className="list-container">
      <div className="flex justify-space-between">
        <h3>Lista de Productos</h3>
        <div className="flex gap-16 items-center">
          <h4>Categoria:</h4>
          <div className="tag-category">
            <h4>
              {categoryId === undefined ? "TODOS" : categoryId.toUpperCase()}
            </h4>
          </div>
        </div>
      </div>
      <div className="list">
        {itemsDataFiltered ? (
          itemsDataFiltered.map((item, index) => {
            return (
              <div
                className="card"
                key={index}
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <img height={220} src={item.foto} alt="Laptop" />
                <Divider></Divider>
                <div className="card_description">
                  <p className="fw-600 category">
                    {item.categoria.toUpperCase()}
                  </p>
                  <h3 className="description">{item.descripcion}</h3>
                  <div className="flex justify-space-between">
                    <h4>Precio</h4>
                    <h3 className="precio">$/. {item.precioUnitario}</h3>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
