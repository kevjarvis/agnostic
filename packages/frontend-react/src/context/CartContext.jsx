import { createContext, useEffect, useRef, useState } from "react";

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(localStorage.getItem("cart_id") || null);
  const [products, setProducts] = useState([]);
  const firstRender = useRef(true);

  const loadProductsOfCart = () => {
    const req = fetch(`http://localhost:8080/api/carrito/${cartId}/productos`)
      .then((res) => res.json())
      .then((products) => setProducts(products.body));
  };

  const checkIfCartExist = () => {
    if (cartId !== null) {
      return new Promise((resolve, reject) => {
        resolve(cartId);
      });
    }

    return new Promise((resolve, reject) => {
      fetch("http://localhost:8080/api/carrito", {
        method: "post",
      })
        .then((req) => req.json())
        .then((res) => {
          if (res.body.id) {
            setCartId(res.body.id);
            localStorage.setItem("cart_id", res.body.id);
            resolve(res.body.id);
          } else {
            reject("Error al crear el carrito");
          }
        })
        .catch((err) => reject(err));
    });
  };

  const removeProduct = (product_id) => {
    const req = fetch(
      `http://localhost:8080/api/carrito/${cartId}/productos/${product_id}`,
      {
        method: "DELETE",
      }
    );
    setProducts(products.filter((product) => product.id !== product_id));
  };

  useEffect(() => {
    if (cartId !== null) {
      console.log("actualizando carrito...");
      loadProductsOfCart();
    }
  }, [cartId]);

  return (
    <CartContext.Provider
      value={{
        products,
        checkIfCartExist,
        removeProduct,
        cartId,
        setProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
