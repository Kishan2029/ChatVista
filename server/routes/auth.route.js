const { Router } = require("express");
const router = Router();

const AuthController = require("../controllers/auth.controller")

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/verify', AuthController.verify)

module.exports = router;
