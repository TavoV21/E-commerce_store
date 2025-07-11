export function ValidationProduct(
  name,
  image,
  description,
  price,
  id_categorie
) {
  const errors = {};

  if (name === "") {
    errors.name = "El campo nombre es requerido";
  } else {
    errors.name = "";
  }

  if (image === "") {
    errors.image = "El campo imagen es requerido";
  } else {
    errors.image = "";
  }

  if (description === "") {
    errors.description = "El campo descripcion es requerido";
  } else {
    errors.descripcion = "";
  }

  if (price === "") {
    errors.price = "El campo precio es requerido";
  } else {
    errors.price = "";
  }

  if (id_categorie === 0 || id_categorie === "") {
    errors.id_categorie = "El campo categoria es requerido";
  } else {
    errors.id_categorie = "";
  }

  return errors;
}
