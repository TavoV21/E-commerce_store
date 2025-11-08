import { User } from "../models/Users.js";

import { encrypt, compare } from "../handle/handlebcrypt.js";
import jwt from "jsonwebtoken";
import { transporter } from "../helpers/mailer.js";
const secret = process.env.SECRET;

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ mensaje: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ mensaje: "Internal server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, id_rol } = req.body;

    if (!name || !email || !password || !id_rol) {
      return res.sendStatus(400);
    }

    let hash = await encrypt(password);
    console.log("-----", hash);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hash,
      id_rol: id_rol,
    });

    const token = jwt.sign({ id: newUser.id }, secret, {
      expiresIn: 60 * 60,
    });
    console.log(token);

    res.status(200).json({
      message: "User created successfully",
      user: newUser,
      auth: true,
      token,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ messageServer: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not exists" });
    } else {
      const checkpassword = await compare(password, user.password);

      if (checkpassword) {
        const token = jwt.sign({ id: user.id }, secret, {
          expiresIn: 60 * 60,
        });
        return res.status(200).json({ auth: true, token, user: user });
      } else {
        return res
          .status(401)
          .json({ auth: false, token: null, message: "Incorrect password" });
      }
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    await user.save();

    console.log(user);
    return res
      .status(200)
      .json({ message: "Update user successfully", user: user });
  } catch (error) {
    return res.status(500).json({ mensaje: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.destroy({
      where: {
        id: id,
      },
    });

    if (user === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ mensaje: "Internal server error" });
  }
};

export const sendEmailToRecover = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.sendStatus(400);
    return;
  }

  const info = await transporter.sendMail({
    from: `Enigmatic Store <${process.env.EMAIL}>`,
    to: email,
    subject: "Recuperar tu contraseña",
    html: `<html><head><meta charset="UTF-8"></head><body><h2>Click en el enlace para cambiar su contraseña</h2> 
            <a href="https://enigmaticstore.onrender.com/changePassword/${email}" id="boton" style="cursor:pointer">Cambiar contraseña</a>
            
   </body></html> `, // HTML body,
  });

  console.log(info);

  return res.status(200).json({ message: "Send email successfully" });
};

export const updatePassword = async (req, res) => {
  try {
    const { email } = req.params;
    const { password, newpassword } = req.body;

    if (!password || !newpassword) {
      return res.sendStatus(400);
    }

    let hash = await encrypt(newpassword);

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not exists" });
    } else {
      const checkpassword = await compare(password, user.password);
      if (checkpassword) {
        await User.update(
          { password: hash },
          {
            where: {
              email: email,
            },
          }
        );

        return res.status(200).json({
          message: "Password update successfully",
          state: true,
        });
      } else {
        return res
          .status(401)
          .json({ message: "Password is incorrect", state: false });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
