import React, { useState, useEffect } from "react";
import styles from "./styles/Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ValidationRegister } from "../Validations/FormValidations.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/userSlice.js";

export default function Register(props) {
  const { setToken } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_SERVER;

  const handleValidateform = (e) => {
    e.preventDefault();

    const resError = ValidationRegister(name, email, password, repeatPassword);
    setError(resError);

    if (
      resError.name === "" &&
      resError.email === "" &&
      resError.password === ""
    ) {
      handleAddUser();
    }
  };

  const handleAddUser = () => {
    const data = {
      name: name,
      email: email,
      password: password,
      id_rol: 2,
    };

    dispatch(createUser(data));

    axios
      .post(`${API_URL}/api/registerUsers`, data)
      .then((res) => {
        console.log(res);
        let token = res.data.token;
        setToken(token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        if (res.data.user.id_rol === 1) {
          navigate("/listUsers");
        } else if (res.data.user.id_rol === 2) {
          navigate("/listProducts");
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          setError({
            ...error,
            name: "",
            email: err.response.data.message,
            password: "",
          });
        } else {
          console.log(err);
        }
      });
  };

  console.log(error);

  return (
    <div className={`${styles.container} d-flex flex-column `}>
      <div className={styles.containerTitle}>
        <h1 className="text-center">Registro Usuario</h1>
      </div>

      <div className={`${styles.containerForm}  row w-100 m-0 `}>
        <div className="col-md-6 mb-2">
          <label htmlFor="name" className="form-label fw-bold text-white">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            className="form-control "
            placeholder="Ingrese su nombre"
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && (
            <p
              style={{
                color: "red",
                fontSize: "1rem",
                margin: 0,
              }}
            >
              {error.name}
            </p>
          )}
        </div>

        <div className="col-md-6 mb-2">
          <label htmlFor="email" className="form-label fw-bold text-white">
            Correo Electronico:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="form-control"
            placeholder="Ingrese su email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && (
            <p
              style={{
                color: "red",
                fontSize: "1rem",
                margin: 0,
              }}
            >
              {error.email}
            </p>
          )}
        </div>
        <div className="col-md-6 mb-2">
          <label htmlFor="password" className="form-label fw-bold text-white">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="form-control"
            placeholder="Ingrese su contraseña"
            onChange={(e) => setPassword(e.target.value)}
            minLength="5"
            maxLength="8"
          />
          {error.password && (
            <p
              style={{
                color: "red",
                fontSize: "1rem",
                margin: 0,
              }}
            >
              {error.password}
            </p>
          )}
        </div>
        <div className="col-md-6 mb-2">
          <label
            htmlFor="repeatpassword"
            className="form-label fw-bold text-white"
          >
            Confirmar Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="repeatpassword"
            value={repeatPassword}
            placeholder="Ingrese nuevamente la contraseña"
            onChange={(e) => setRepeatPassword(e.target.value)}
            minLength="5"
            maxLength="8"
          />
        </div>
        <div className="col-md-12 text-center mt-3">
          <button
            type="submit"
            className={styles.boton}
            onClick={handleValidateform}
          >
            Registrarse
          </button>
        </div>
        <Link className="text-white" to="/">
          volver a inicio
        </Link>
      </div>
    </div>
  );
}
