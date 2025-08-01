import React, { useState } from "react";
import style from "./styles/FormSendEmail.module.css";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../Validations/FormValidateEmail.js";
import { API_URL } from "../components/config.js";
import axios from "axios";

export default function FormSendEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const handleValidateEmail = () => {
    const getError = validateEmail(email);
    setError(getError);

    if (getError.email === "") {
      handleSendEmail();
    }
  };

  const handleSendEmail = () => {
    const data = {
      email: email,
    };

    axios
      .post(`${API_URL}/api/sendEmail`, data)
      .then((res) => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {alert && (
        <div
          className="alert alert-success alert-dismissible fade show w-25 z-2 position-fixed top-0 end-0"
          role="alert"
        >
          <h4 className="alert-heading">Correo enviado exitosamente!!!</h4>
          <p>Te hemos enviado un correo para cambiar tu contraseña</p>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className={`${style.container}`}>
        <div className={`${style.containerTitle}`}>
          <h2 className="text-center ">Cambiar contraseña</h2>
        </div>

        <div className="px-2 mt-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white fw-bold">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingrese su correo electronico"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <p style={{ color: "red", fontSize: "1rem", marginTop: "4px" }}>
                {error.email}
              </p>
            )}
          </div>
          <button
            className="btn btn-dark border-light d-block m-auto w-50 "
            onClick={handleValidateEmail}
          >
            Continuar
          </button>
        </div>

        <div className="my-3 ms-2">
          <Link to="/" className="text-decoration-none text-white">
            <i className="bi bi-arrow-return-left me-1"></i> Volver
          </Link>
        </div>
      </div>
    </>
  );
}
