import { ProductCard } from "../components/ProductCard";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "react";
import CartContext from "../context/CartContext";

export const Admin = () => {
  const { products, createCart, removeProducti, setProducts } =
    useContext(CartContext);
  const [productList, setProductList] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    //  Lista de productos
    const req = fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((products) => setProductList(products.body));
  }, []);

  const onEdit = (product) => {
    //  Carga los datos del producto en el formulario
    setSelectedProduct(product);
    setNombre(product.nombre);
    setPrecio(product.precio);
    setDescripcion(product.descripcion);
    setImage(product.picture.url);
    setCodigo(product.codigo);
    setStock(product.stock);
  };

  const updateProduct = async (product_id) => {
    const req = await fetch(
      `http://localhost:8080/api/productos/${product_id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-is-admin": true,
        },
        body: JSON.stringify({
          nombre,
          precio,
          descripcion,
          picture: {
            url: image,
          },
          stock,
          codigo,
        }),
      }
    );

    const a = products.filter;
  };

  const addProduct = async (product_object) => {
    console.log(JSON.stringify(product_object));
    const req = await fetch(`http://localhost:8080/api/productos`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-is-admin": true,
      },
      body: JSON.stringify(product_object),
    });
  };

  const removeProduct = async (product_id) => {
    await fetch(`http://localhost:8080/api/productos/${product_id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "x-is-admin": true,
      },
    });
  };

  return (
    <div className="flex justify-between gap-40">
      <div className="relative w-2/3">
        <h1 className="text-3xl font-bold my-10 dark:text-gray-100 font-display">
          Productos
        </h1>

        <ul className={"flex flex-col gap-8 "}>
          {productList.map((product) => (
            <li className={"flex items-center justify-between"}>
              <div className={"flex items-center gap-6"}>
                <img
                  src={product.picture.url}
                  alt={product.picture["alt_text"]}
                  className={"w-20 h-20 rounded-xl"}
                />
                <div>
                  <strong className={"font-display font-bold text-gray-100"}>
                    {product.nombre}
                  </strong>
                  <p className={"font-display text-gray-500 text-sm"}>
                    {product.descripcion}
                  </p>

                  <strong className={"font-display font-bold text-green-400"}>
                    $ {product.precio}
                  </strong>
                </div>
              </div>
              <div className={"flex gap-7"}>
                <button className={"p-2"} onClick={() => onEdit(product)}>
                  <PencilSquareIcon className={"w-5 h-5 text-white"} />
                </button>

                <button
                  className={"bg-red-700 p-2 rounded-lg hover:bg-red-900"}
                  onClick={() => removeProduct(product.id)}
                >
                  <TrashIcon className={"w-5 h-5 text-white"} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="grow-2 w-1/3">
        <h1 className="text-3xl font-bold my-10 dark:text-gray-100 font-display">
          Administrador
        </h1>
        <div>
          <form className={"flex flex-col gap-3"}>
            <label
              className={"font-display text-gray-100 text-sm"}
              htmlFor="nombre_producto"
            >
              Nombre producto
            </label>
            <input
              type="text"
              id={"nombre_producto"}
              value={nombre}
              className={
                "bg-transparent border-b border-b-gray-100 focus-visible:outline-none focus-visible:border-b-blue-500 focus-visible:border-b-2 text-gray-400 py-2"
              }
              onChange={(e) => setNombre(e.target.value)}
            />
            <label
              className={"font-display text-gray-100 text-sm"}
              htmlFor="descripcion_producto"
            >
              Descripcion producto
            </label>
            <textarea
              name="descripcion_producto"
              id="descripcion_producto"
              className={
                "bg-transparent border-b border-b-gray-100 focus-visible:outline-none focus-visible:border-b-blue-500 focus-visible:border-b-2 text-gray-400 py-2"
              }
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <label
              className={"font-display text-gray-100 text-sm"}
              htmlFor="precio"
            >
              Precio
            </label>
            <input
              type="text"
              id={"precio"}
              className={
                "bg-transparent border-b border-b-gray-100 focus-visible:outline-none focus-visible:border-b-blue-500 focus-visible:border-b-2 text-gray-400 py-2"
              }
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
            <label
              className={"font-display text-gray-100 text-sm"}
              htmlFor="picture_url"
            >
              Imagen
            </label>
            <input
              type="text"
              id={"picture_url"}
              className={
                "bg-transparent border-b border-b-gray-100 focus-visible:outline-none focus-visible:border-b-blue-500 focus-visible:border-b-2 text-gray-400 py-2"
              }
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <label
              className={"font-display text-gray-100 text-sm"}
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              type="text"
              id={"stock"}
              className={
                "bg-transparent border-b border-b-gray-100 focus-visible:outline-none focus-visible:border-b-blue-500 focus-visible:border-b-2 text-gray-400 py-2"
              }
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <label
              className={"font-display text-gray-100 text-sm"}
              htmlFor="codigo"
            >
              Código
            </label>
            <input
              type="text"
              id={"codigo"}
              className={
                "bg-transparent border-b border-b-gray-100 focus-visible:outline-none focus-visible:border-b-blue-500 focus-visible:border-b-2 text-gray-400 py-2"
              }
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            {/*Revisa si hay algún producto seleccionado*/}
            {Object.keys(selectedProduct).length === 0 ? (
              <button
                className={
                  "bg-blue-600 text-white font-display font-bold p-3 rounded-md hover:bg-blue-800"
                }
                onClick={() =>
                  addProduct({
                    nombre,
                    descripcion,
                    precio,
                    picture: image,
                    stock,
                    codigo,
                  })
                }
              >
                Agregar Producto
              </button>
            ) : (
              <button
                className={
                  "bg-blue-600 text-white font-display font-bold p-3 rounded-md hover:bg-blue-800"
                }
                onClick={() => updateProduct(selectedProduct.id)}
              >
                Actualizar producto
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
