const express = require("express");
const router = express.Router();
const ensuAuth = require("../middleware/authenticated")
const addressController = require("../controllers/address");
const { route } = require("./address");

router.post('/new-address', [ensuAuth.ensureAuth] , addressController.createAddress)
router.get('/', addressController.getAll)
router.get('/:addressId', addressController.getById)
router.patch('/edit/:addressId', [ensuAuth.ensureAuth], addressController.editAddress)
router.delete('/delete/:addressId',[ensuAuth.ensureAuth], addressController.deleteAddress)


module.exports = router;