const { Router } = require("express");
const router = Router();

const GroupMessageController = require("../controllers/groupMessage.controller")

router.post('/get', GroupMessageController.getMessage)
router.post('/create', GroupMessageController.createMessage)



module.exports = router;
