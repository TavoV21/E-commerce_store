import React, { useEffect, useState } from "react";
import style from "./styles/ListProducts.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../redux/productsSlice.js";
import { createCart } from "../redux/cartSlice";
import { initAxiosInterceptors } from "../components/auth-helper.js";
import ModalUpdateProduct from "../components/ModalUpdateProduct.jsx";
import { API_URL } from "../components/config.js";
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
          <i className="bi bi-plus-circle-fill me-2 fs-5"></i>
          Añadir Producto
        </button>
      )}

      <div className="input-group flex-nowrap w-50 m-auto mt-4">
        <span
          className="input-group-text rounded-start-5 border-primary bg-primary "
          id="visible-addon"
        >
          <i className="bi bi-search text-white"></i>
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
                        <i className="bi bi-pencil-fill "></i>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteProduct(products.id)}
                      >
                        <i className="bi bi-trash"></i>
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
                          <i className="bi bi-cart4 me-1"></i>
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
