export function ValidateNewPassword(newpassword) {
  const errors = {};

  const regex = /\d/;

  if (newpassword.includes(" ")) {
    errors.npassword = "La contraseña no puede tener espacios";
    errors.color = "red";
  } else if (newpassword.length > 0 && newpassword.length < 4) {
    errors.npassword = "La contraseña es muy corta";
    errors.color = "red";
  } else if (!regex.test(newpassword) && newpassword.length > 0) {
    errors.npassword = "La contraseña debe tener al menos un numero";
    errors.color = "yellow";
  } else {
    errors.npassword = "";
    errors.color = "lime";
  }

  return errors;
}
