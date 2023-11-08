const { Router } = require("express");
const router = Router();

const RequestController = require("../controllers/request.controller")

router.post('/sent', RequestController.sentRequest)


module.exports = router;
