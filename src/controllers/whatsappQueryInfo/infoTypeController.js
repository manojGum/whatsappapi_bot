const Infotype = require("../../models/queryInfo/infTypeModel");
// get all information type
const getInfoType = async ( req,res)=>{
    const informationType=await Infotype.find();

    if(!informationType){
        res.status(500).json({success:false})
    }
    res.status(200).send(informationType)
    }


// get information type by ID
const getInfoTypeById = async(req,res)=>{
    const informationType = await Infotype.findById(req.params.id);
     if(!informationType){
        res.status(500).json({message:'The informationType with the given ID was not found'})
     }else{
        res.status(200).send(informationType)
     }
}

// collect information response type
    const addInfoType = async ( req,res)=>{
        let informationType = new Infotype({
            infoType:req.body.infoType,
        });
    
        informationType = await informationType.save();
        if(!informationType) return res.status(400).send('The informationType cannot be created')
    
        res.send(informationType)
        }
    
    module.exports = {getInfoType,addInfoType,getInfoTypeById}