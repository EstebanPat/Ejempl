const express = require("express");
const router = express.Router();
const multer = require('multer');
const ensuAuth = require("../middleware/authenticated")
const clientController = require('../controllers/client')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/logo_clients') // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }); 
const upload = multer({ storage: storage });

router.post("/new-client", [ensuAuth.ensureAuth, upload.any()], clientController.createClient)
router.get("/", clientController.getAllClients)
router.get("/:clientId", clientController.getClientById)
router.patch("/edit/:clientId", [ensuAuth.ensureAuth, upload.any()], clientController.editClient)
router.delete("/delete/:clientId", [ensuAuth.ensureAuth], clientController.deleteClient)

module.exports = router;