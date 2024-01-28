/* eslint-disable react/jsx-no-target-blank */
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";

function App() {
  return (
    <div className="main-container">
      <NavBar />
      <div className="content">
      <Routes>
        <Route path="/" element={<ItemListContainer greeting="Inicio" />} />
        <Route
          path="/category/:id"
          element={<ItemListContainer greeting="Greetings for everybody" />}
        />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
