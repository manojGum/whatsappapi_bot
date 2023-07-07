const mongoose = require("mongoose");

const queryInfoSchema = mongoose.Schema( 
  {
    infoType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "infotype",
      required: true,
      lowercase: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      lowercase: true,
    },
    question: {
      type: String, required: true, unique: true,
      lowercase: true,
    },
    inthub:{
      type:Boolean,
      enum: [true, false],
      default:false,
    },
    answer: {
      text: {
        type: String,
      },
      link: {
        type: String,
      },
      filename: {
        type: String,
      },
      caption: {
        type: String,
      },
    },
    buttons: {
      responsetext: {
        type: String,
      },
      buttonslist: [
        {
          title: {
            type: String,
          },
        },
      ],
    },
    list: {
      responsetext: {
        type: String,
      },
      listheading:{
        type:String,
      },
      buttonslist: [
        {
          title: {
            type: String,
            lowercase: true,
          },
          description: {
            type: String,
            lowercase: true, 
          },
        },
      ],
    },
    location: {
      latitude: String,
      longitude: String,
      name: String,
      address: String,
    },
    followUp: [
      {
        question: {
          type: String,
          lowercase: true,
          unique:true
        },
        response: {
          type: String,
        },
        responseType: {
          type: String,
             lowercase: true,
          enum: ["text", "image","document","link","location","audio","video"],
          default:"text",
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const QueryInfo = mongoose.model("queryinfo", queryInfoSchema);

module.exports = QueryInfo;
