const email_pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

export function validateEmail(email) {
  const error = {};

  if (email === "") {
    error.email = "El campo email no puede estar vacio";
  } else if (!email_pattern.test(email)) {
    error.email = "Email incorrecto";
  } else {
    error.email = "";
  }

  return error;
}
