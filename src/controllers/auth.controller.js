import jwt from "jsonwebtoken";
import User from "../models/user.js";
import config from "../config.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Crear un nuevo usuario con las propiedades proporcionadas
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      roles,
    });

    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();
    // console.log(newUser);

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400,
    });

    // Excluir la contraseña de la respuesta
    savedUser.password = undefined;

    // Enviar la respuesta JSON
    res.json({
      message: "Usuario creado...",
      user: savedUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubó un error al crear usuario...",
      error: error.message,
    });
  }
};

export const signIn = (req, res) => {
  res.json("Signin");
};
