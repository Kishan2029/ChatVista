const { Router } = require("express");
const router = Router();

const ChatController = require("../controllers/chat.controller")

router.get('/:id', ChatController.getAllChats)


module.exports = router;
