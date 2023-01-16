import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./index.css";

import { Home } from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Admin } from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <div className="main-layout">
        <Navbar />
        <CartProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/admin" element={<Admin />} />
          </Routes>
        </CartProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
