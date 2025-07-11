import React, { useState } from "react";
import style from "./styles/ChangePassword.module.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../components/config.js";
import { ValidateChangePassword } from "../Validations/FrmValidatePasswordChange";

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

  console.log(email);
  console.log(user);
  console.log(error);

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
        //console.log(error.response.data.message);

        setError({
          ...error,
          password: "Contraseña no existe",
        });
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
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Escribe tu contraseña actual"
              onChange={handleChange}
            />
            {error.password && (
              <p style={{ color: "red", fontSize: "1rem", marginTop: "4px" }}>
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
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              className="form-control"
              placeholder="Escribe tu contraseña nueva"
              onChange={handleChange}
            />
            {error.newpassword && (
              <p style={{ color: "red", fontSize: "1rem", marginTop: "4px" }}>
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
            <input
              type="password"
              id="rptpassword"
              name="rptpassword"
              className="form-control"
              placeholder="Escribe nuevamente la contraseña"
              onChange={handleChange}
            />
            {error.rptpassword && (
              <p style={{ color: "red", fontSize: "1rem", marginTop: "4px" }}>
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
