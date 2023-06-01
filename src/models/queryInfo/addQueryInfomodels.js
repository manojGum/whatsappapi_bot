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
      type: String,
      required: true,
      unique:true,
      lowercase: true,
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
          },
          description: {
            type: String,
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const QueryInfo = mongoose.model("queryinfo", queryInfoSchema);

module.exports = QueryInfo;
