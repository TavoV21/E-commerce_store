export function ValidateChangePassword(password, newpassword, rptpassword) {
  const errors = {};

  if (password === "") {
    errors.password = "El campo no puede estar vacio";
  } else {
    errors.password = "";
  }

  if (newpassword === "") {
    errors.newpassword = "El campo no puede estar vacio";
  } else if (newpassword !== rptpassword) {
    errors.newpassword = "Campos de nueva contraseña no coinciden";
  } else if (newpassword === password) {
    errors.newpassword = "La nueva contraseña no puede ser igual a la anterior";
  } else {
    errors.newpassword = "";
  }

  if (rptpassword === "") {
    errors.rptpassword = "El campo no puede estar vacio";
  } else if (rptpassword !== newpassword) {
    errors.rptpassword = "Campos de nueva contraseña no coinciden";
  } else {
    errors.rptpassword = "";
  }

  return errors;
}
