const express = require('express');
const { addQueryInfo, getQueryInfo } = require('../controllers/whatsappQueryInfo/whatsappQueryInfoController');
const router = express.Router();

router.get("/",getQueryInfo)
router.post('/',addQueryInfo)

module.exports = router
