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
          className="bg-dark text-warning border border-warning border-2 rounded-3"
          onClick={handleClickMenuOpen}
        >
          <i className="bi bi-list fs-4"></i>
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
            className="bg-transparent border-0 position-absolute top-0 end-0 mt-2 me-2"
            onClick={handleClickMenuClose}
          >
            <i className="bi bi-x-lg fs-4 text-warning "></i>
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
                  <i className="bi bi-cart4 me-1"></i> Carrito
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
            <i className="bi bi-box-arrow-left me-2 mt-2"></i> Cerrar Sesion
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
