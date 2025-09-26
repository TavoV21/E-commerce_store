import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Style from "./Menu.module.css";

function MenuSide(props) {
  const { setToken /* , setCountCart, countCart  */ } = props;

  const [openMenu, setOpenMenu] = useState(false);

  const [position, setPosition] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const countCart = localStorage.getItem("carkt");

  const navigate = useNavigate();

  // console.log(countCart);
  // console.log(localStorage.getItem("carkt"));

  const handleClickMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleClickMenuClose = () => {
    setPosition("translateX(-300px");
    setTimeout(() => {
      setOpenMenu(false);
      setPosition("translateX(0%");
    }, 1000);
  };

  const handleLogOut = () => {
    setToken(null);
    // setCountCart(null);
    localStorage.removeItem("carkt");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <header
        className={`${Style.header} p-3 d-flex align-items-center`}
        style={{ height: "12%" }}
      >
        <button
          className="bg-dark text-warning border border-warning border-2 rounded-3 p-1"
          onClick={handleClickMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-list "
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
      </header>
      {openMenu ? (
        <div
          id="menu"
          className="bg-dark position-fixed top-0 start-0 z-1"
          style={{
            width: "300px",
            height: "100%",
            transform: position,
            transition: "1s",
          }}
        >
          <button
            className="bg-transparent text-warning border-0 position-absolute top-0 end-0 mt-2 me-2"
            onClick={handleClickMenuClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>

          <ul className={`${Style.ul} list-unstyled`}>
            {user.id_rol === 1 && (
              <li className={`${Style.li} p-3 `}>
                <Link
                  className="text-warning text-decoration-none"
                  to="/listUsers"
                >
                  Lista Usuarios
                </Link>
              </li>
            )}

            <li className={`${Style.li} p-3 `}>
              <Link
                className="text-warning text-decoration-none"
                to="/listProducts"
              >
                Productos
              </Link>
            </li>

            {user.id_rol === 2 && (
              <li className={`${Style.li} p-3`}>
                <Link className="text-warning text-decoration-none" to="/cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-cart4 me-2 mb-1 "
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                  </svg>
                  Carrito
                  <span className="badge text-bg-primary ms-2">
                    {countCart}
                  </span>
                </Link>
              </li>
            )}
          </ul>

          <button
            className=" position-absolute bottom-0 ms-3 mb-3 text-warning border-none bg-transparent border-0"
            onClick={handleLogOut}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-box-arrow-left me-2 "
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
              />
              <path
                fillRule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
              />
            </svg>
            Cerrar Sesion
          </button>
        </div>
      ) : (
        <div className="d-none"></div>
      )}
      <Outlet />
    </>
  );
}

export { MenuSide };
