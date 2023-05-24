const mongoose=require('mongoose');

const infoTypeSchema=mongoose.Schema({
    infoType:{
        type:String,
        required:true,
        unique:true
    }
})
const Infotype=mongoose.model('infotype',infoTypeSchema);

module.exports= Infotype