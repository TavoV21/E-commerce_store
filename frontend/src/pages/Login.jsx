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
              <i className="bi bi-envelope-fill"></i>
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
              <i className="bi bi-key-fill"></i>
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
