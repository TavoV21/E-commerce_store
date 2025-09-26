import React, { useState, useEffect } from "react";
import style from "./styles/FormProducts.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/productsSlice.js";
import { useNavigate, Link } from "react-router-dom";
import { ValidationProduct } from "../Validations/FormProductValidations.js";
import { API_URL } from "../components/config.js";

export default function FormProducts() {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    id_categorie: 0,
  });
  const [error, setError] = useState({});
  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(product);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setProduct({ ...product, image: e.target.files[0].name });
  };

  const handleValidateForm = () => {
    const getError = ValidationProduct(
      product.name,
      product.image,
      product.description,
      product.price,
      product.id_categorie
    );
    setError(getError);
    console.log(getError);
    if (
      getError.name === "" &&
      getError.image === "" &&
      getError.descripcion === "" &&
      getError.price === "" &&
      getError.id_categorie === ""
    ) {
      handleAddProduct();
    }
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("image", image);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("id_categorie", product.id_categorie);

    dispatch(createProduct(product));

    axios
      .post(`${API_URL}/api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          navigate("/listProducts");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-5 z-1">
      {alert && (
        <div
          className="alert alert-success alert-dismissible fade show w-25 z-2 position-fixed top-0 end-0"
          role="alert"
        >
          Se agrego un nuevo producto!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <h3 className={`${style.title} text-white text-center p-1 w-75 m-auto `}>
        Create Product
      </h3>

      <div
        className={`${style.form} row border border-1 border-white rounded-3 mt-5 p-4 m-auto `}
      >
        <div className="col-md-6 mb-2">
          <label htmlFor="name" className="form-label fw-bold text-white">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            onChange={handleChange}
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
          <label htmlFor="image" className="form-label fw-bold text-white">
            Imagen:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleImage}
          />

          {error.image && (
            <p
              style={{
                color: "red",
                fontSize: "1rem",
                margin: 0,
              }}
            >
              {error.image}
            </p>
          )}
        </div>

        <div className="col-md-6 mb-2">
          <label
            htmlFor="description"
            className="form-label fw-bold text-white"
          >
            Descripcion:
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="2"
            onChange={handleChange}
          ></textarea>
          {error.description && (
            <p
              style={{
                color: "red",
                fontSize: "1rem",
                margin: 0,
              }}
            >
              {error.description}
            </p>
          )}
        </div>
        <div className="col-md-6 mb-2">
          <label htmlFor="price" className="form-label fw-bold text-white">
            Precio:
          </label>
          <div className="input-group">
            <span className="input-group-text  bg-transparent text-white">
              $
            </span>
            <input
              type="text"
              id="price"
              name="price"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
              onChange={handleChange}
            />
          </div>

          {error.price && (
            <p
              style={{
                color: "red",
                fontSize: "1rem",
                margin: 0,
              }}
            >
              {error.price}
            </p>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="categoria" className="form-label fw-bold text-white">
            Categoria:
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="categoria"
            name="id_categorie"
            onChange={handleChange}
            required
          >
            <option value="">Seleccione la categoria</option>
            {categories.map((cat, index) => (
              <option value={cat.id} key={index}>
                {cat.name}
              </option>
            ))}
          </select>

          {error.id_categorie && (
            <p
              style={{
                color: "red",
                fontSize: "1rem",
                margin: 0,
              }}
            >
              {error.id_categorie}
            </p>
          )}
        </div>

        <div className="col-md-12 d-flex align-items-center justify-content-between">
          <Link to="/ListProducts" className="text-decoration-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-return-left me-2"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"
              />
            </svg>
            Volver a productos
          </Link>
          <button
            className="btn btn-primary float-end"
            onClick={handleValidateForm}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
