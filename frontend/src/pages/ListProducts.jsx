import React, { useEffect, useState } from "react";
import style from "./styles/ListProducts.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../redux/productsSlice.js";
import { createCart } from "../redux/cartSlice";
import { initAxiosInterceptors } from "../components/auth-helper.js";
import ModalUpdateProduct from "../components/ModalUpdateProduct.jsx";
import { fetchCart } from "../redux/cartSlice.js";

initAxiosInterceptors();

export default function ListProducts(props) {
  // const { setCountCart } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.products.data);
  const allCarkt = useSelector((state) => state.cart.data);
  const [id, setId] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(false);
  const API_URL = import.meta.env.VITE_API_SERVER;

  console.log(allProducts);

  const user = JSON.parse(localStorage.getItem("user"));

  localStorage.setItem("carkt", allCarkt.length);

  console.log(cart);

  useEffect(() => {
    if (user.id_rol === 2) {
      axios
        .get(`${API_URL}/api/cart/${user.id}`)
        .then((res) => {
          console.log(res.data);
          setCart(res.data);

          dispatch(fetchCart(res.data));
          // setCountCart(res.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => {
        dispatch(fetchProducts(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteProduct = (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
    axios
      .delete(`${API_URL}/api/products/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddCart = (id) => {
    const data = {
      id_product: id,
      id_user: user.id,
    };
    dispatch(createCart(data));

    axios
      .post(`${API_URL}/api/cart`, data)
      .then((res) => {
        console.log(res);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          navigate("/cart");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let results = [];

  if (!search) {
    results = allProducts;
  } else {
    results = allProducts.filter((data) =>
      data.name.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  console.log(results);

  return (
    <div className="p-5 z-1">
      {alert && (
        <div
          className="alert alert-success alert-dismissible fade show w-25 z-2 position-fixed top-0 end-0"
          role="alert"
        >
          Se añadio tu producto al carrito.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <h3 className={`${style.title} text-white text-center  p-1 w-75 m-auto`}>
        ListProducts
      </h3>

      {user.id_rol === 1 && (
        <button
          className="btn btn-outline-light rounded-5 d-block m-auto mt-4 px-3 d-flex align-items-center"
          onClick={() => navigate("/createProduct")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-circle-fill me-2"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
          </svg>
          Añadir Producto
        </button>
      )}

      <div className="input-group flex-nowrap w-50 m-auto mt-4">
        <span
          className="input-group-text rounded-start-5 border-primary bg-primary "
          id="visible-addon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-search text-white"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </span>
        <input
          type="text"
          className={`form-control rounded-end-5  border-primary bg-transparent text-light ${style.inputSearch}`}
          placeholder="Buscar..."
          aria-label="Username"
          aria-describedby="visible-addon"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div
        className={`w-100 mt-3 p-4 m-auto d-flex flex-wrap justify-content-center gap-4`}
      >
        {results.map((products, index) => (
          <div
            key={index}
            className={`card bg-transparent border-1 border-white text-white`}
            style={{ width: "500px" }}
          >
            <div className="row g-0 m-0 h-100 ">
              <div className="col-md-7 " style={{ height: "300px" }}>
                <img
                  src={`${API_URL}/uploads/${products.image}`}
                  className="img-fluid  rounded  h-100 w-100"
                  alt="image"
                />
              </div>
              <div className={`${style.container} col-md-5 rounded-3`}>
                <div className="card-body ">
                  <h5 className="card-title ">{products.name}</h5>
                  <div
                    className={`${style.scrollContainer} overflow-auto pe-2`}
                    style={{ height: "150px" }}
                  >
                    {products.description}
                  </div>
                  <p className="card-text my-2 ">${products.price}</p>

                  {user.id_rol === 1 ? (
                    <div className="d-flex justify-content-start gap-2">
                      <button
                        className="btn btn-outline-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#modalProduct"
                        onClick={() => setId(products.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                        </svg>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteProduct(products.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-trash3-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>{" "}
                      </button>
                    </div>
                  ) : (
                    <div>
                      {cart.find(
                        (item) =>
                          item.id_product === products.id &&
                          item.id_user === user.id
                      ) ? (
                        <button className="btn btn-secondary" disabled>
                          Ya agregado
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handleAddCart(products.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-cart4 me-2 mb-1"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                          </svg>
                          Agregar al carrito
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {results.length === 0 && (
          <h1 className="text-white">No existen resultados</h1>
        )}
      </div>
      <ModalUpdateProduct id={id} allProducts={allProducts} />
    </div>
  );
}
