const { Router } = require("express");
const router = Router();
const { imageUpload } = require("../middleware");
const groupController = require("../controllers/group.controller")

router.post('/create', groupController.createGroup)
router.delete('/delete/:id', groupController.deleteGroup)
router.get('/get/:id', groupController.getGroup)
router.post('/addMember', groupController.addMember)
router.post('/leftGroup', groupController.leftGroup)
router.post('/addAdmin', groupController.addAdmin)
router.post('/getGroupInfo', groupController.getGroupInfo)
router.post('/editInfo', imageUpload, groupController.editInfo)


module.exports = router;
