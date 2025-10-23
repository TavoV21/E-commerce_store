import React, { useState, useEffect } from "react";
import style from "./styles/ChangePassword.module.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ValidateChangePassword } from "../Validations/FrmValidatePasswordChange";
import { ValidateNewPassword } from "../Validations/FrmValidateNewPassword";

export default function ChangePassword() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    password: "",
    newpassword: "",
    rptpassword: "",
  });
  const [error, setError] = useState({});
  const [alert, setAlert] = useState(false);
  const [changeEye1, setChangeEye1] = useState(false);
  const [changeEye2, setChangeEye2] = useState(false);
  const [changeEye3, setChangeEye3] = useState(false);
  const [color, setColor] = useState("");
  const API_URL = import.meta.env.VITE_API_SERVER;

  console.log(email);
  console.log(error);
  console.log(color);

  useEffect(() => {
    const resultError = ValidateNewPassword(user.newpassword);

    console.log(resultError);

    setError(resultError);
    setColor(resultError.color);
  }, [user]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleValidateForm = () => {
    const getErrors = ValidateChangePassword(
      user.password,
      user.newpassword,
      user.rptpassword
    );

    setError(getErrors);

    if (
      getErrors.password === "" &&
      getErrors.newpassword === "" &&
      getErrors.rptpassword === ""
    ) {
      handleUpdatePassword();
    }
  };

  const handleUpdatePassword = () => {
    const data = {
      password: user.password,
      newpassword: user.newpassword,
    };

    axios
      .put(`${API_URL}/api/users/changePassword/${email}`, data)
      .then((res) => {
        console.log(res);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          setError({
            ...error,
            password: "Contraseña no existe",
          });
        }
      });
  };

  return (
    <>
      {alert && (
        <div
          className="alert alert-success alert-dismissible fade show w-25 z-2 position-fixed top-0 end-0"
          role="alert"
        >
          <h4 className="alert-heading">
            Contraseña actualizada exitosamente!!!
          </h4>
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
          <h2 className="text-center">Cambiar contraseña</h2>
        </div>
        <div className="px-3 my-3">
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white fw-bold">
              Contraseña actual:
            </label>

            <div className="input-group ">
              <input
                type={changeEye1 ? "text" : "password"}
                id="password"
                name="password"
                className="form-control"
                placeholder="Escribe tu contraseña actual"
                onChange={handleChange}
              />
              <span
                className={`${style.span} bg-light input-group-text`}
                onClick={() => setChangeEye1(!changeEye1)}
              >
                {changeEye1 ? (
                  <i className="bi bi-eye-fill text-dark"></i>
                ) : (
                  <i className="bi bi-eye-slash-fill text-dark"> </i>
                )}
              </span>
            </div>

            {error.password && (
              <p style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
                {error.password}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="newpassword"
              className="form-label text-white fw-bold"
            >
              Contraseña nueva:
            </label>

            <div className="input-group">
              <input
                type={changeEye2 ? "text" : "password"}
                id="newpassword"
                name="newpassword"
                className="form-control"
                placeholder="Escribe tu contraseña nueva"
                onChange={handleChange}
              />
              <span
                className={`${style.span} bg-light input-group-text`}
                onClick={() => setChangeEye2(!changeEye2)}
              >
                {changeEye2 ? (
                  <i className="bi bi-eye-fill text-dark"></i>
                ) : (
                  <i className="bi bi-eye-slash-fill text-dark"> </i>
                )}
              </span>
            </div>
            {user.newpassword !== "" && (
              <div
                className="mt-1"
                style={{
                  backgroundColor: color,
                  width: "100%",
                  height: "5px",
                  borderRadius: "1rem",
                }}
              ></div>
            )}

            {error.npassword && (
              <p style={{ color: color, fontSize: "0.8rem", marginTop: "4px" }}>
                {error.npassword}
              </p>
            )}

            {error.newpassword && (
              <p style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
                {error.newpassword}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="rptpassword"
              className="form-label text-white fw-bold"
            >
              Repite tu Contraseña Nueva:
            </label>
            <div className="input-group">
              <input
                type={changeEye3 ? "text" : "password"}
                id="rptpassword"
                name="rptpassword"
                className="form-control"
                placeholder="Escribe nuevamente la contraseña"
                onChange={handleChange}
              />
              <span
                className={`${style.span} bg-light input-group-text`}
                onClick={() => setChangeEye3(!changeEye3)}
              >
                {changeEye3 ? (
                  <i className="bi bi-eye-fill text-dark"></i>
                ) : (
                  <i className="bi bi-eye-slash-fill text-dark"> </i>
                )}
              </span>
            </div>
            {error.rptpassword && (
              <p style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
                {error.rptpassword}
              </p>
            )}
          </div>
          <button
            className="btn btn-dark border-light rounded-4 d-block m-auto"
            onClick={handleValidateForm}
          >
            Actualizar
          </button>
        </div>
      </div>
    </>
  );
}
