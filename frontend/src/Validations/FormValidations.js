const email_pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

export function ValidationRegister(name, email, password, repeatPassword) {
  const errors = {};

  if (name === "") {
    errors.name = "El campo nombre es requerido";
  } else {
    errors.name = "";
  }

  if (email === "") {
    errors.email = "El campo email es requerido";
  } else if (!email_pattern.test(email)) {
    errors.email = "Email incorrecto";
  } else {
    errors.email = "";
  }

  if (password === "") {
    errors.password = "Contraseña es requerida";
  } else if (password !== repeatPassword) {
    errors.password = "Contraseñas deben coincidir";
  } else {
    errors.password = "";
  }

  return errors;
}

export function ValidationLogin(email, password) {
  const errors = {};
  if (email === "") {
    errors.email = "El campo email es requerido";
  } else if (!email_pattern.test(email)) {
    errors.email = "Email incorrecto";
  } else {
    errors.email = "";
  }

  if (password === "") {
    errors.password = "Contraseña es requerida";
  } else {
    errors.password = "";
  }

  return errors;
}
