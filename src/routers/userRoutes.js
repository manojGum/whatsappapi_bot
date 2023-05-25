const express = require('express')
const { registerUser, userLogin } = require("../controllers/userController/userController");
const router = express.Router();
router.post("/login",userLogin);
router.post("/register",registerUser);

module.exports = router;
