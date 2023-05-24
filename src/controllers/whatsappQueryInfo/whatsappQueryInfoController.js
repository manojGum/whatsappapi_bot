const QueryInfo = require("../../models/queryInfo/addQueryInfomodels");
const Infotype = require("../../models/queryInfo/infTypeModel");
const mongoose = require('mongoose')

const addQueryInfo = async (req, res) => {
    try {
        if (!req.body.infoType || req.body.infoType.length < 24) {
            return res.status(400).send('Invalid infoType')
        }
        const informationType = await Infotype.findById(req.body.infoType);
        // console.log(informationType.infoType)
        if (!informationType) return res.status(400).send('Invalid infoType')
        // if(informationType.infoType==="text"){
        //     console.log("hello")
        //     if(!req.body.answer){
        //        return res.send("error")
        //     }else{
        //         console.log(req.body.answer);
        //         return res.send(req.body)
        //     }
        // }
    
        let datainfo = new QueryInfo(req.body)
        datainfo = await datainfo.save();
        if (!datainfo)
            return res.status(500).send('The data cannot be created')
        return res.send({datainfo})
    } catch (error) {
        return res.send({error})        
    }
    
}




const getQueryInfo = async(req,res)=>{
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

module.exports = {addQueryInfo,getQueryInfo}