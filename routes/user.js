const express = require("express");
const router = express.Router();
const ensuAuth = require("../middleware/authenticated")
const userController = require("../controllers/user")

router.post("/signup", userController.register)
router.post("/login", userController.login)
router.get("/", userController.getAllUsers)
router.get("/:userId", userController.getUserById)
router.patch("/edit/:userId", [ensuAuth.ensureAuth], userController.editUser)
router.delete("/delete/:userId", [ensuAuth.ensureAuth], userController.deleteUser)

module.exports = router;