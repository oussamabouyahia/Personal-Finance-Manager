const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
router.get("/", userController.getUsers);
router.post("/", userController.signUp);
router.post("/login", userController.signIn);

module.exports = router;
