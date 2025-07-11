import { pool } from "../db.js";
import { encrypt, compare } from "../handle/handlebcrypt.js";
import jwt from "jsonwebtoken";
import { transporter } from "../helpers/mailer.js";
const secret = process.env.SECRET;

export const getUsers = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");
  res.status(200).json(rows);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(rows[0]);
};

export const registerUser = async (req, res) => {
  try {
    const data = req.body;
    let hash = await encrypt(data.password);

    console.log(data);
    const { rows } = await pool.query(
      "INSERT INTO users (name, email, password, id_rol) VALUES($1, $2, $3, $4) RETURNING *",
      [data.name, data.email, hash, data.id_rol]
    );
    console.log(rows[0]);

    const token = jwt.sign({ id: rows[0].id }, secret, { expiresIn: 60 * 60 });
    console.log(token);

    res.status(200).json({
      message: "User created successfully",
      user: rows[0],
      auth: true,
      token,
    });
  } catch (error) {
    console.log(error);
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ messageServer: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const data = req.body;
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    data.email,
  ]);

  if (rows.length > 0) {
    const checkpassword = await compare(data.password, rows[0].password);
    if (checkpassword) {
      console.log(rows[0]);
      const token = jwt.sign({ id: rows[0].id }, secret, {
        expiresIn: 60 * 60,
      });
      return res.status(200).json({ auth: true, token, user: rows[0] });
    } else {
      return res
        .status(401)
        .json({ auth: false, token: null, message: "Incorrect password" });
    }
  } else {
    return res.status(404).json({ message: "User not exists" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { rows } = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [data.name, data.email, id]
  );

  return res
    .status(200)
    .json({ message: "update user successfully", user: rows[0] });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [
    id,
  ]);
  console.log(rowCount);
  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.sendStatus(204);
};

export const sendEmailToRecover = async (req, res) => {
  const { email } = req.body;

  const info = await transporter.sendMail({
    email: process.env.EMAIL,
    to: email,
    subject: "Recuperar tu contraseña",
    html: `<html><head><meta charset="UTF-8"></head><body><h2>Click en el enlace para cambiar su contraseña</h2> 
            <a href="http://localhost:5173/changePassword/${email}" id="boton" style="cursor:pointer">Cambiar contraseña</a>
            
   </body></html> `, // HTML body,
  });

  console.log(info);

  return res.status(200).json({ message: "Send email successfully" });
};

export const updatePassword = async (req, res) => {
  const { email } = req.params;
  const { password, newpassword } = req.body;
  let hash = await encrypt(newpassword);

  //console.log(password, "---", newpassword, "---", rptpassword);

  const { rows } = await pool.query("SELECT * FROM users WHERE email= $1", [
    email,
  ]);

  if (rows.length > 0) {
    const checkpassword = await compare(password, rows[0].password);

    const state = false;
    if (checkpassword) {
      const { rows } = await pool.query(
        "UPDATE users SET password= $1 WHERE email= $2 RETURNING *",
        [hash, email]
      );

      return res.status(200).json({
        message: "Password update successfully",
        user: rows[0],
        state: true,
      });
    } else {
      return res
        .status(401)
        .json({ message: "Password is incorrect", state: false });
    }
  } else {
    return res.status(404).json({ message: "User not exists" });
  }
};
