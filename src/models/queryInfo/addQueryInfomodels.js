const mongoose = require('mongoose');

const queryInfoSchema = mongoose.Schema({
    infoType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'infotype',
        required: true,
        lowercase: true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true,
        lowercase: true
     },
    question: {
        type: String,
        required: true,
        lowercase: true
    },
    answer: {
            text: {
              type:String,
              lowercase: true
            },
            link: {
              type:String,
              lowercase: true
            },
            filename:{
              type:String,
              lowercase: true
            },
            caption:{
              type:String,
              lowercase: true
            },
    },
    buttons: {
        responsetext: {
          type:String,
          lowercase: true
        },
        buttonslist: [
          {
            title: {
              type:String,
              lowercase: true
            },
          },
        ],
      },
      list: {
        responsetext:{
          type:String,
          lowercase: true
        },
        buttonslist: [
          {
            title:{
              type:String,
              lowercase: true
            },
            description: {
              type:String,
              lowercase: true
            }
          },
        ],
      }
    });
const QueryInfo = mongoose.model('queryinfo', queryInfoSchema);

module.exports = QueryInfo