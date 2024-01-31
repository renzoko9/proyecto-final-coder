/* eslint-disable react/jsx-no-target-blank */
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartProvider } from "./context/CartContext";
import CartPage from "./components/CartPage/CartPage";
import CheckoutPage from "./components/Checkout/CheckoutPage";

function App() {
  return (
    <CartProvider>
      <div className="main-container">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route
              path="/category/:categoryId"
              element={<ItemListContainer />}
            />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route 
              path="/cart" 
              element={<CartPage />}
            />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* <Route 
          path="/order"
          element={<Order />} 
        /> */}
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
