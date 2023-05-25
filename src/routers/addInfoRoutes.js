const express = require('express');
const { addQueryInfo, getQueryInfo } = require('../controllers/whatsappQueryInfo/whatsappQueryInfoController');
const authenticate = require('../helper/authMiddleware');
// const authenticate=require()

const router = express.Router();

router.get("/",getQueryInfo)
router.post('/',authenticate,addQueryInfo)

module.exports = router
