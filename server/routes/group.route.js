const { Router } = require("express");
const router = Router();

const groupController = require("../controllers/group.controller")

router.post('/create', groupController.createGroup)
// router.post('/delete', groupController.deleteGroup)
// router.post('/get', groupController.getGroup)
// router.post('/addMember', groupController.addMember)
// router.post('/removeMember', groupController.addMember)





module.exports = router;
