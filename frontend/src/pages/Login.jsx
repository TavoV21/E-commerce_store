import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Styled from "./styles/Login.module.css";
import axios from "axios";
import { ValidationLogin } from "../Validations/FormValidations";
import { useDispatch } from "react-redux";
import { API_URL } from "../components/config.js";

export default function Login(props) {
  const { setToken } = props;
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleValidateForm = () => {
    const respErr = ValidationLogin(user.email, user.password);
    console.log(respErr);
    setErrors(respErr);

    if (respErr.email === "" && respErr.password === "") {
      loggear();
    }
  };

  const loggear = () => {
    axios
      .post(`${API_URL}/api/loginUser`, user)
      .then((res) => {
        console.log(res);
        let token = res.data.token;
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setToken(token);
        if (res.data.user.id_rol === 1) {
          navigate("/listUsers");
        } else if (res.data.user.id_rol === 2) {
          navigate("/listProducts");
        }
      })
      .catch((error) => {
        console.log(error);

        if (error.status === 401) {
          setErrors({
            ...errors,
            email: "",
            password: error.response.data.message,
          });
        } else if (error.status === 404) {
          setErrors({
            ...errors,
            email: error.response.data.message,
            password: "",
          });
        }
      });
  };

  console.log(errors);

  return (
    <div className={`${Styled.container} d-flex flex-column  `}>
      <div className={Styled.containerTitle}>
        <h1 className="text-center">Iniciar Session</h1>
      </div>

      <div className={Styled.container2}>
        <div className="mb-3">
          <div className="input-group ">
            <span className="bg-light input-group-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope-at-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
              </svg>
            </span>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="ingrese su email"
              onChange={handleChange}
            />
          </div>

          {errors.email && (
            <p
              style={{
                color: "red",
                fontSize: "1rem",
                textAlign: "left",
                margin: 0,
              }}
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <div className="input-group ">
            <span className="bg-light input-group-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-key-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              </svg>
            </span>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="ingrese su contraseña"
              onChange={handleChange}
            />
          </div>

          {errors.password && (
            <p
              style={{
                color: "red",
                fontSize: "1rem",
                textAlign: "left",
                margin: 0,
              }}
            >
              {errors.password}
            </p>
          )}
        </div>

        <button className={Styled.boton} onClick={handleValidateForm}>
          iniciar Session
        </button>
        <div className="d-flex justify-content-between mt-3">
          <Link className="text-white" to="/frmSendEmail">
            olvido su contraseña?
          </Link>
          <Link className="text-white" to="/registerUser">
            ya te registraste?
          </Link>
        </div>
      </div>
    </div>
  );
}
