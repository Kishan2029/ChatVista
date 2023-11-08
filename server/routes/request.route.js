const { Router } = require("express");
const router = Router();

const RequestController = require("../controllers/request.controller")

router.post('/sent', RequestController.sentRequest)
router.get('/:id', RequestController.getUserReceivedRequests)



module.exports = router;
