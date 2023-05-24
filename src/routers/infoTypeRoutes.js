const express = require("express");
const {
  getInfoType,
  addInfoType,
  getInfoTypeById,
} = require("../controllers/whatsappQueryInfo/infoTypeController");
const router = express.Router();

router.get("/", getInfoType);
router.get('/:id',getInfoTypeById)
router.post("/", addInfoType);

module.exports = router;
