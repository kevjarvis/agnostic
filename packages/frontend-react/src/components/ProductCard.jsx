import { useContext } from "react";
import CartContext from "../context/CartContext";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export const ProductCard = ({ product }) => {
  const { cartId, setProducts, products, checkIfCartExist } =
    useContext(CartContext);

  const onAdd = (product_id) => {
    checkIfCartExist().then((cartId) => {
      fetch(`http://localhost:8080/api/carrito/${cartId}/productos`, {
        method: "post",
        body: JSON.stringify({ product_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(products);

      setProducts([...products, product]);
    });
  };

  const isAdded = () => {
    return products.some((article) => article.id === product.id);
  };

  return (
    <div className="w-full md:max-w-xs bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-gray-900 flex flex-col duration-300 hover:-translate-y-1 group">
      <picture className="p-3 max-h-52">
        <img
          className="rounded-md object-cover h-full w-full group-hover:shadow-2xl group-hover:shadow-violet-700 duration-700"
          src={product.picture.url}
          alt={product.picture["alt_text"]}
        />
      </picture>
      <div className="p-3 flex flex-col gap-3">
        <strong className="text-xl font-bold text-gray-900 dark:text-gray-100 font-display">
          {product.nombre}
        </strong>
        <p className="line-clamp-2 dark:text-gray-300 font-display">
          {product.descripcion}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-black dark:text-gray-100 font-display">
            $ {product.precio}
          </span>
        </div>

        {!isAdded() ? (
          <button
            className={
              "bg-blue-600 text-white font-display font-bold p-3 rounded-md hover:bg-blue-800"
            }
            onClick={() => onAdd(product.id)}
          >
            Agregar al carrito
          </button>
        ) : (
          <button
            className={
              "flex gap-3 items-center justify-center bg-green-600 text-white font-display font-bold p-3 rounded-md"
            }
          >
            <CheckCircleIcon className={"h-6 w-6 text-white"} />
            Agregado!
          </button>
        )}
      </div>
    </div>
  );
};
