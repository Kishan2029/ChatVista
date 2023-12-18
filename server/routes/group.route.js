const { Router } = require("express");
const router = Router();

const groupController = require("../controllers/group.controller")

router.post('/create', groupController.createGroup)
router.delete('/delete/:id', groupController.deleteGroup)
router.get('/get/:id', groupController.getGroup)
router.post('/addMember', groupController.addMember)
router.post('/leftGroup', groupController.leftGroup)





module.exports = router;
