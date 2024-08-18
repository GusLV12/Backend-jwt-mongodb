import User from "../models/user.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Crear un nuevo usuario con las propiedades proporcionadas
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password), // Asegúrate de que este método sea async si es necesario
      roles,
    });

    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();

    // Excluir la contraseña de la respuesta
    savedUser.password = undefined;

    // Enviar la respuesta JSON
    res.json({
      message: "User successfully created",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error creating the user",
      error: error.message,
    });
  }
};

export const signIn = (req, res) => {
  res.json("Signin");
};
