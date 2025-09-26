import React, { useEffect, useState } from "react";
import style from "./styles/Cart.module.css";
import axios from "axios";
import { fetchCart, deleteCart } from "../redux/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../components/config.js";

export default function Cart(props) {
  // const { setCountCart } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const allCart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const [totalSum, setTotalSum] = useState(0);
  const [openZoom, setOpenZoom] = useState(false);
  const [imgSelect, setImgSelect] = useState(null);
  const [alert, setAlert] = useState(false);

  // setCountCart(allCart.length);
  localStorage.setItem("carkt", allCart.length);
  console.log("here...", allCart);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/cart/${user.id}`)
      .then((res) => {
        dispatch(fetchCart(res.data));
        console.log("ojoo", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let sum = 0;
    allCart?.map((car) => {
      let price = parseInt(car?.product?.price);
      sum += price;
    });

    setTotalSum(sum);
  }, [allCart]);

  const handleDeleteCart = (id) => {
    dispatch(deleteCart(id));

    axios
      .delete(`${API_URL}/api/cart/${id}`)
      .then((res) => {
        console.log(res);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleZoom = (image) => {
    setOpenZoom(true);
    setImgSelect(image);
  };

  return (
    <div className="p-5 z-1">
      {alert && (
        <div
          className="alert alert-danger alert-dismissible fade show w-25 z-2 position-fixed top-0 end-0"
          role="alert"
        >
          Producto eliminado del carrito.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <h3 className={`${style.title} text-white text-center p-1 w-75 m-auto`}>
        Carrito de compras
      </h3>
      <div
        className="card bg-transparent border-success m-auto mt-5"
        style={{ maxWidth: "34rem" }}
      >
        <div className="card-header bg-success border-success  py-3">
          <h5 className="m-0 fw-bold">Mis Productos</h5>
        </div>
        <div className="card-body text-success">
          <ul className="list-unstyled ">
            {allCart?.map((cart, index) => (
              <li className="row mb-2 m-0" key={index}>
                <div className="col-md-2">
                  <img
                    src={`${API_URL}/uploads/${cart?.product?.image}`}
                    className="img-fluid rounded-1"
                    alt="..."
                    style={{
                      height: "70px",
                      width: "70px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleZoom(cart.product.image)}
                  />
                  {openZoom && (
                    <div className={`${style.containerImgZoom}`}>
                      <img
                        src={`${API_URL}/uploads/${imgSelect}`}
                        className={"img-fluid rounded-1 d-flex m-auto"}
                        style={{ height: "100%", width: "50%" }}
                        alt="..."
                      />
                      <button
                        className="position-absolute top-0 end-0 bg-transparent border-0"
                        onClick={() => setOpenZoom(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-x-lg text-white"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <p className="m-0">{cart?.product?.name}</p>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <p className="m-0">{cart?.product?.price}</p>
                </div>
                <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <button
                    className="bg-transparent border-0 d-block m-auto"
                    onClick={() => handleDeleteCart(cart.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-x-circle text-white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
            {allCart.length === 0 && (
              <h3 className="text-white text-center">El carrito esta vacio</h3>
            )}
          </ul>
        </div>
        <div className="card-footer bg-transparent border-success text-success">
          Total: $ {totalSum}.00
        </div>
      </div>
    </div>
  );
}
