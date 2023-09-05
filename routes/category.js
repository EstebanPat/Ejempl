const express = require("express");
const router = express.Router();
const ensuAuth = require("../middleware/authenticated")
const categoryController = require("../controllers/category")

router.post("/new-category", [ensuAuth.ensureAuth], categoryController.createCategory)
router.get("/", categoryController.getAllCategories)
router.get("/:categoryId", categoryController.getCategoryById)
router.patch("/edit/:categoryId", [ensuAuth.ensureAuth], categoryController.editCategory)
router.delete("/delete/:categoryId", [ensuAuth.ensureAuth], categoryController.deleteCategory)

module.exports = router;