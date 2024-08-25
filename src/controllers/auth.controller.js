import jwt from "jsonwebtoken";
import User from "../models/user.js";
import config from "../config.js";
import Role from "../models/role.js";

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

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      console.log("Roles encontrados:", foundRoles);
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();
    console.log(newUser);

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

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email }).populate("roles");

    if (!userFound) {
      return res.status(400).json({ message: "¡Usuario no encontrado.!" });
    }
    
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword) {
      return res.status(401).json({ message: "Contraseña inválida." });
    }

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
      expiresIn: 86400,
    })

    res.json({
      user: {userFound, token},
    });
  } catch (error) {
    console.log({
      message: "Ha ocurrido un error en login...",
      error: error,
    });
  }
};
