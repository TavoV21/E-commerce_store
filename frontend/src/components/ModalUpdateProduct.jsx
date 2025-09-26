import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/productsSlice";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config.js";

export default function ModalUpdateProduct(props) {
  const { id, allProducts } = props;
  const [image, setImage] = useState(null);
  const [file, setFile] = useState();
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    id_categorie: "",
  });

  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(id);

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
    setImage(e.target.files[0]); //files[0] trae el formato file de la imagen
    setProduct({ ...product, image: e.target.files[0].name }); //actualiza el state con el nombre de la imagen
    setFile(URL.createObjectURL(e.target.files[0])); //esta linea hace una vista previa de la imagen que se esta seleccionando y crea una URL
  };

  useEffect(() => {
    if (id) {
      setProduct(allProducts.find((pro) => pro.id == id));
    }
  }, [id]);

  const handleUpdateProduct = () => {
    const imageCurrent = new File([Blob], product.image, {
      //esta linea convierte la imagen a un archivo
      type: "image/jpeg",
    });

    const formData = new FormData();
    formData.append("name", product.name);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", imageCurrent);
    }
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("id_categorie", product.id_categorie);

    dispatch(updateProduct({ ...product, id }));

    axios
      .put(`${API_URL}/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
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
          Se actualizo el producto exitosamente!
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
        id="modalProduct"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-dark">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title fs-3 text-white">Editar Producto</h5>
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
            <div className="modal-body ">
              <div className="px-1 py-2 row m-0">
                <div className="col-md-6 mb-2">
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
                    value={product.name}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label
                    htmlFor="image"
                    className="form-label fw-bold text-white"
                  >
                    Imagen:
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    onChange={handleImage}
                  />
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
                    value={product.description}
                    onChange={handleChange}
                    rows="5"
                  ></textarea>
                </div>
                <div className="col-md-6 mb-2">
                  <img
                    src={
                      file === undefined
                        ? `${API_URL}/uploads/${product.image}`
                        : file
                    }
                    className="img-fluid rounded-3"
                    alt={product.image}
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="price"
                    className="form-label fw-bold text-white"
                  >
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
                      value={product.price}
                      onChange={handleChange}
                      className="form-control"
                      aria-label="Amount (to the nearest dollar)"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="categorie"
                    className="form-label fw-bold text-white"
                  >
                    Categoria:
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="categorie"
                    name="id_categorie"
                    onChange={handleChange}
                    required
                    value={product.id_categorie}
                  >
                    {/*                   <option value="">Seleccione la categoria</option>
                     */}
                    {categories.map((cat, index) => (
                      <option value={cat.id} key={index}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateProduct}
              >
                Actualizar Producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
