import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";

export default function ModalUpdateUser(props) {
  const { id, allUsers } = props;
  const [user, setUser] = useState({ name: "", email: "" });
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_SERVER;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id) {
      setUser(allUsers.find((us) => us.id == id));
    }
  }, [id]);

  const handleUpdateUser = () => {
    const data = {
      name: user.name,
      email: user.email,
    };

    dispatch(updateUser({ ...data, id }));
    axios
      .put(`${API_URL}/api/users/${id}`, data)
      .then((res) => {
        console.log(res);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {alert && (
        <div
          className="alert alert-primary alert-dismissible fade show w-25 position-fixed top-0 end-0"
          role="alert"
          style={{ zIndex: "1080" }}
        >
          Se actualizo el usuario exitosamente!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header d-flex justify-content-between">
              <h1
                className="modal-title fs-3 text-white"
                id="exampleModalLabel"
              >
                Editar Usuario
              </h1>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
                aria-label="Close"
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
            <div className="modal-body">
              <div className="px-1 py-2 row ">
                <div className="col-md-6 ">
                  <label
                    htmlFor="name"
                    className="form-label fw-bold text-white"
                  >
                    Nombre:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    className="form-control"
                    placeholder="Ingrese su nombre"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 ">
                  <label
                    htmlFor="email"
                    className="form-label fw-bold text-white"
                  >
                    Correo Electronico:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    className="form-control"
                    placeholder="Ingrese su email"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleUpdateUser}
              >
                Actualizar Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
