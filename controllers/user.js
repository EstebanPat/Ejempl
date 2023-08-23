const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("../utils/jwt")

// Crear usuario
const register = async (req, res) => {
  const { name, lastmane, email, password, address } = req.body;

  if(name !==null && lastmane !== null && email !== null && password !== null && address !== null){
    console.log("Contraseña", password)
    const enscriptar_contraseña = await bcrypt.genSalt(10)
    const contraseña = await bcrypt.hash(password, enscriptar_contraseña)

    console.log("Contraseña encriptada", contraseña)
    

    const new_user = await User({
        name, lastmane, email: email.toLowerCase(), password: contraseña, address, active: true, rol:"user"
    })
    console.log("Usuario creado ", new_user)
    const userDB = await new_user.save()
    res.status(201).json(userDB)
  } else {
    console.log("Faltan campos requeridos")
  }
  
};

//Login

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!email || !password) {
      throw new Error("El email y la contraseña son obligatorios");
      console.log("no recibe datos");
    }
    const emailLowerCase = email.toLowerCase();
    const userStore = await User.findOne({ email: emailLowerCase }).exec();
    if (!userStore) {
      throw new Error("El usuario no existe");
    }
    const check = await bcrypt.compare(password, userStore.password);
    if (!check) {
      throw new Error("Contraseña incorrecta");
    }
    if (!userStore.active) {
      throw new Error("Usuario no autorizado o no activo");
    }
    res.status(200).send({
      access: jwt.createAccessToken(userStore)
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
    console.log();
  }
};

//Consultar lista de usuarios
const getAllUsers = async(req, res) => {
  try {
    const response = await User.find()
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
    
};

//Consultar un usuario
const getUserById= async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(userId)
    const response = await User.findById(userId)
    if(!response){
      throw new Error("El usuario no existe")
    }else {
      res.status(200).json(response)
    }
  }catch (err){
    res.status(400).json(err)
  }
  
};

//Actualizar un Usuario
const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData= req.body
    console.log(userData)
    if(userData.password){
      const enscriptar_contraseña = await bcrypt.genSalt(10);
      const contraseña = await bcrypt.hash(password, enscriptar_contraseña);
      userData.password = contraseña
    }
    await User.findByIdAndUpdate(userId, userData);
    res.status(200).json({ message: "Usuario Actualizado"})
  } catch (error){
    res.status(400).json(error)
  }
};

/* router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params;
    const { name, lastname, address, password, email, active, rol } = req.body
    console.log(userData)
    
    const enscriptar_contraseña = await bcrypt.genSalt(10);
    const contraseña = await bcrypt.hash(password, enscriptar_contraseña);
    await User.findByIdAndUpdate(userId, userData);
    res.status(200).json({ message: "Usuario Actualizado"})
  } catch (error){
    res.status(400).json(error)
  }
}); */

//Eliminar un Usuario 
const deleteUser =async (req, res) => {
  try {
    const { userId } = req.params
    await User.findByIdAndDelete(userId)
    res.status(200).json({ message: "Usuario eliminado"})
  } catch (error) {
    res.status(400).json(error)
  } 
}

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
  editUser
};