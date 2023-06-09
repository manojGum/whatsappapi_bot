const express = require('express');
const { addQueryInfo, getQueryInfo, getQueryInfoBYId, deleteQueryInfoBYId, updateQueryInfoData } = require('../controllers/whatsappQueryInfo/whatsappQueryInfoController');
const authenticate = require('../helper/authMiddleware');
// const authenticate=require()

const router = express.Router();

router.get('/info/:id',getQueryInfoBYId)
router.get("/",getQueryInfo)
router.delete("/:id",deleteQueryInfoBYId)
router.post('/',authenticate,addQueryInfo)
router.put('/:id',authenticate,updateQueryInfoData)

module.exports = router
