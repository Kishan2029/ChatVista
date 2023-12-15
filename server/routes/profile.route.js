const { Router } = require("express");
const router = Router();

const ProfileController = require("../controllers/profile.controller");
const { imageUpload } = require("../middleware");

router.get('/:id', ProfileController.getProfile)
router.put('/update', imageUpload, ProfileController.updateProfile)




module.exports = router;
