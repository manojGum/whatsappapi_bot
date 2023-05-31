const QueryInfo = require("../../models/queryInfo/addQueryInfomodels");
const Infotype = require("../../models/queryInfo/infTypeModel");
const User = require('../../models/usermodels/usersModel')
const mongoose = require('mongoose')

const addQueryInfo = async (req, res) => {
  req.body.user_id = req.user_id;
  const reqbody = await req.body
  req.body.infoType = reqbody.infoTypeId._id
  // console.log(reqbody)
  try {
    if (!req.body.infoType || req.body.infoType.length < 24) {
      return res.status(400).send('Invalid infoType')
    }
    const informationType = await Infotype.findById(req.body.infoType);
    // console.log(informationType.infoType)
    if (!informationType) return res.status(400).send('Invalid infoType')

    if (!req.body.user_id || req.body.user_id.length < 24) {
      return res.status(400).send('Invalid user_ID')
    }
    const user = await User.findById(req.body.user_id);
    // console.log(informationType.infoType)
    if (!user) return res.status(400).send('User not valid or register')
   

    // console.log(reqbody.buttons.buttonslist)
    
    let datainfo = new QueryInfo(req.body)
    datainfo = await datainfo.save();
    if (!datainfo)
      return res.status(500).send('The data cannot be created')
    // console.log(datainfo.buttons)
    return res.send("DATA created successfully ...!")
  } catch (error) {
    return res.send(error.message)
  }

}




const getQueryInfo = async (req, res) => {
  try {
    const dataList = await QueryInfo.find().populate('infoType');
    return res.send(dataList);
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false
    });
  }
}

module.exports = { addQueryInfo, getQueryInfo }