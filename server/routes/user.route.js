const { Router } = require("express");
const router = Router();

const UserController = require("../controllers/user.controller")

router.get('/friends/:id', UserController.getFriends)
router.get('/exploreUsers/:id', UserController.getExploreUsers)


module.exports = router;
