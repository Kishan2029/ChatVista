const { Router } = require("express");
const router = Router();

const AuthController = require("../controllers/auth.controller")

router.post('/login', AuthController.login)

module.exports = router;
