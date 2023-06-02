const express = require('express');
const authenticate = require('../helper/authMiddleware');
const { addUserDemoInfo, updateDemoUserInfo, getAllDemoUserDetails } = require('../controllers/userDemoDetailsController/userDemoDetailsController');
// const authenticate=require()

const router = express.Router();

// router.get("/",getQueryInfo)
router.post('/',addUserDemoInfo)
router.put('/:userId',updateDemoUserInfo)
router.get("/:phone",getAllDemoUserDetails)

module.exports = router
