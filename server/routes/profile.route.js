const { Router } = require("express");
const router = Router();

const ProfileController = require("../controllers/profile.controller")

router.get('/:id', ProfileController.getProfile)
router.put('/update', ProfileController.updateProfile)




module.exports = router;
