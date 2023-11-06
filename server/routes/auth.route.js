const { Router } = require("express");
const router = Router();

const AuthController = require("../controllers/auth.controller")

router.post('/login', AuthController.login)
// router.post('/register', AuthController.login)
// router.post('/verify', AuthController.login)

module.exports = router;
