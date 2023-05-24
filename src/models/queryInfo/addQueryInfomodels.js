const mongoose = require('mongoose');

const queryInfoSchema = mongoose.Schema({
    infoType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'infotypes',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
            text: String,
            link: String,
            filename:String
    },
    buttons:{
        responsetext:String ,
        buttonslist: [
            {
                title:String
            }
        ]
    },
    list:{
        responsetext:String ,
        buttonslist: [
            {
                title:String,
                description:String,
            }
        ]
    }
})
const QueryInfo = mongoose.model('queryinfo', queryInfoSchema);

module.exports = QueryInfo