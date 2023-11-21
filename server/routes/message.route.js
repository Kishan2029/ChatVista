const { Router } = require("express");
const router = Router();

const MessageController = require("../controllers/message.controller")

router.post('/get', MessageController.getMessage)
router.post('/create', MessageController.createMessage)



module.exports = router;
