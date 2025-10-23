import React from "react";
import style from "./styles/ListUsers.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { initAxiosInterceptors } from "../components/auth-helper.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/userSlice";
import DataTable from "react-data-table-component";
import ModalUpdateUser from "../components/ModalUpdateUser.jsx";

initAxiosInterceptors();
export default function ListUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.data);
  const [id, setId] = useState(null);
  const [alert, setAlert] = useState(false);
  const API_URL = import.meta.env.VITE_API_SERVER;

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-id={row.id}
            onClick={handleModal}
          >
            Editar
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleDelete(row.id)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get(`${API_URL}/api/users`)
      .then((res) => {
        dispatch(fetchUsers(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleModal = (e) => {
    const data_id = e.target.dataset.id;
    setId(data_id);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    axios
      .delete(`${API_URL}/api/users/${id}`)
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
          className="alert alert-danger alert-dismissible fade show w-25 z-2 position-fixed top-0 end-0"
          role="alert"
        >
          Se elimino el usuario exitosamente!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="py-5 d-flex flex-column align-items-center gap-4 ">
        <h3 className={`${style.title} text-center text-white p-1  w-75 `}>
          Lista de Usuarios
        </h3>
        <DataTable
          className="w-75"
          columns={columns}
          data={allUsers}
          pagination
          paginationPerPage={4}
        />
      </div>
      <ModalUpdateUser id={id} allUsers={allUsers} />
    </>
  );
}
