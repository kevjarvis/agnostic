import CartContext, { CartProvider } from "../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ProductCard } from "../components/ProductCard";

export const Home = () => {
  const { products, createCart, removeProduct } = useContext(CartContext);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    //  Lista de productos
    const req = fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((products) => setProductList(products.body));
  }, []);

  return (
    <div className="flex justify-between gap-40">
      <div className="relative w-2/3">
        <h1 className="text-3xl font-bold my-10 dark:text-gray-100 font-display">
          Productos
        </h1>
        <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2">
          {productList.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
      <div className="grow-2 w-1/3">
        <h1 className="text-3xl font-bold my-10 dark:text-gray-100 font-display">
          Carrito
        </h1>
        <div className={"flex flex-col gap-6"}>
          {products !== undefined &&
            products.map((product) => (
              <div className={"flex items-center justify-between"}>
                <div className={"flex gap-6 items-center"}>
                  <img
                    className={"w-12 h-12 rounded-full"}
                    src={product.picture.url}
                    alt={product.picture["alt_text"]}
                  />

                  <strong className={"dark:text-gray-100"}>
                    {product.nombre}
                  </strong>
                </div>
                <button
                  className={"bg-red-700 p-2 rounded-lg hover:bg-red-900"}
                  onClick={() => removeProduct(product.id)}
                >
                  <TrashIcon className={"w-6 h6 text-white"} />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
