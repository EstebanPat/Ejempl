const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

// Crear usuario
router.post("/signup", async (req, res) => {
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
  
});

//Login

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (email != null && password != null) {
      const email_minusc = email.toLowerCase();
      const user_search = User.findOne({ email: email_minusc });
      if (user_search != null) {
        const password_user = user_search.password;
        const password_valid = bcrypt.compare(password, password_user);
        if (password_valid) {
          console.log(user_search.active);
          res.status(200).json({ message: "Usuario logeado" });
          // if (user_search.active == true) {
          //   res.status(200).json({ message: "Usuario logeado" });
          // } else {
          //   res.status(500).json({ message: "Usuario inactivo" });
          // }
        } else {
          res.status(500).json({ message: "Contraseña incorrecta" });
        }
      }
    }
  });

//Consultar usuario creado
router.get("/", (req, res) => {
    User.find()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

module.exports = router;