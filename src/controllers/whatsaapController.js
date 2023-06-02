const fs = require("fs");
/* // const myConsole = new console.Console(fs.createWriteStream('./logs.text')); */
const whatsappService = require("../services/whatsappService");
const samples = require("../shared/sampleModels");
const QueryInfo = require("../models/queryInfo/addQueryInfomodels");
const getJaccardSimilarity = require("../helper/botBehavior");
const axios = require('axios');
const isMatch = require('../helper/isMatch');
const BotUserDemo = require("../models/adddemodetails/userDemoDetailsModels");
const verifyToken = (req, res) => {
  try {
    /*
    // var accessToken = "RTQWWTVHBDSD78S78DSNDS9090DS";
    // var token = req.query["hub.verify_token"];
    // var challenge = req.body["hub.challenge"];
    // console.log(token)
    // if(challenge !== null && token !=null && token == accessToken){
    //     res.send(challenge)
    // }else{
    //     res.status(400).send()
    // }
    */
    let mode = req.query["hub.mode"];
    let challange = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];
    const mytoken = process.env.MYSERVER_VERIFICATION_TOKEN;
    if (mode && token) {
      if (mode === "subscribe" && token === mytoken) {
        res.status(200).send(challange);
      } else {
        res.status(403);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const receivedMessage = async (req, res) => {
  try {
    const data = await QueryInfo.find().populate("infoType");
    let entry = req.body["entry"][0];
    let changes = entry["changes"][0];

    let value = changes["value"];

    let messageObject = value["messages"];
    if (typeof messageObject != "undefined") {
      let messages = messageObject[0];
      let number = await messages["from"];
      let phone = parseInt(number.toString().slice(2));
      // console.log("phone---------------", phone);

      let text = GetTextUser(messages);
      console.log("user request text.......", text)

      let maxSimilarity = 0;
      const similarityThreshold = 0.5;
      for (let i = 0; i < data.length; i++) {
        var faq = data[i];
        /* // console.log("..................", faq) */
        // const infoType = faq.infoType.infoType.toLowerCase()
        // console.log("type Info", infoType);
        const similarity = await getJaccardSimilarity(
          text.toLowerCase(),
          faq.question.toLowerCase()
        );
        if (similarity >= 0.6 && similarity > maxSimilarity) {
          const infoType = faq.infoType.infoType.toLowerCase()
          console.log("type Info.......", infoType);
          if (infoType === "text") {
            if (isMatch(faq.question.toLowerCase(), "i want my leave balance", similarityThreshold)) {
            const botR= await BotUserDemo.findOne({ phone},{ '_id': 0, "__v":0})
              // let botR = await axios.get(`http://localhost:5658/api/v1/user/userdetails/917909012986`);
              // console.log(botR)
              if (botR) {
                // console.log("bot leave balance..................................................",botR)
                botResponse = await JSON.stringify(botR.data);
                let data = samples.messageText(botResponse, number);
                whatsappService.sendMessageWhatsApp(data)
                  .then(response => {
                    console.log("Request successful:", response)
                   return res.send(response)
                  })
              } else {
                let data = samples.messageText("no user register", number);
                whatsappService.sendMessageWhatsApp(data)
                  .then(response => {
                    console.log("Request successful:", response)
                    return
                  })
              }
            }
             else {

              let data = samples.messageText(faq.answer.text, number);
              whatsappService.sendMessageWhatsApp(data)
                .then(response => {
                  console.log("Request successful:", response)
                  return
                })
            }
          } else if (infoType === "image") {
            let data = samples.messageImage(faq, number);
            whatsappService.sendMessageWhatsApp(data).then(response => {
              console.log("Request successful:", response);
              return
            })
              .catch(error => {
                console.error("An error occurred:", error);
              });
          } else if (infoType === "video") {
            let data = samples.messageVideo(faq, number);
            whatsappService.sendMessageWhatsApp(data).then(response => {
              console.log("Request successful:", response);
              return
            })
              .catch(error => {
                console.error("An error occurred:", error);
              });
          } else if (infoType === "audio") {
            let data = samples.messageAudio(faq, number);
            whatsappService.sendMessageWhatsApp(data).then(response => {
              console.log("Request successful:", response);
              return
            })
              .catch(error => {
                console.error("An error occurred:", error);
              });
          } else if (infoType === "document") {
            let data = samples.messageDocument(faq, number);
            whatsappService.sendMessageWhatsApp(data).then(response => {
              console.log("Request successful:", response);
              return
            })
              .catch(error => {
                console.error("An error occurred:", error);
              });
          } else if (infoType === "button") {
            let data = samples.messageButtons(faq, number);
            whatsappService.sendMessageWhatsApp(data).then(response => {
              console.log("Request successful:", response);
              return
            })
              .catch(error => {
                console.error("An error occurred:", error);
              });
          } else if (infoType === "list") {
            let data = samples.messageList(faq, number);
            whatsappService.sendMessageWhatsApp(data).then(response => {
              console.log("Request successful:", response);
              return
            })
              .catch(error => {
                console.error("An error occurred:", error);
              });
          } else if (infoType === "location") {
            let data = samples.messageLocation(faq, number);
            whatsappService.sendMessageWhatsApp(data).then(response => {
              console.log("Request successful:", response);
              return
            })
          }
          else if (infoType === "link") {
            let data = samples.messageLink(faq, number);
            whatsappService.sendMessageWhatsApp(data).then(response => {
              console.log("Request successful:", response);
              return
            })
          }
        }
      }
      // end new for me
      //   if (text == "text") {
      //     let data = samples.messageText("hello users", number);
      //     whatsappService.sendMessageWhatsApp(data);
      //   } else if (text == "image") {
      //     let data = samples.messageImage(number);
      //     whatsappService.sendMessageWhatsApp(data);
      //   } else if (text == "video") {
      //     let data = samples.messageVideo(number);
      //     whatsappService.sendMessageWhatsApp(data);
      //   } else if (text == "audio") {
      //     let data = samples.messageAudio(number);
      //     whatsappService.sendMessageWhatsApp(data);
      //   } else if (text == "document") {
      //     let data = samples.messageDocument(number);
      //     whatsappService.sendMessageWhatsApp(data);
      //   } else if (text == "button") {
      //     let data = samples.messageButtons(number);
      //     whatsappService.sendMessageWhatsApp(data);
      //   } else if (text == "list") {
      //     let data = samples.messageList(number);
      //     whatsappService.sendMessageWhatsApp(data);
      //   } else if (text == "location") {
      //     let data = samples.messageLocation(number);
      //     whatsappService.sendMessageWhatsApp(data);
      //   } else {
      // let data = samples.messageText(
      //   "I am sorry, I did not understand your request. Please try again or contact our HR department for assistance",
      //   number
      // );
      // whatsappService.sendMessageWhatsApp(data);
      //   }
      let dataa = samples.messageText(
        "I am sorry, I did not understand your request. Please try again or contact our HR department for assistance",
        number
      );
      whatsappService.sendMessageWhatsApp(dataa).then(response => {
        console.log("Request successful:", response);
      });
    }
    return res.send("EVENT_RECEIVED");
  } catch (error) {
    res.send("event_RECIVED");
  }
};

function GetTextUser(messages) {
  let text = "";
  let typeMessage = messages["type"];
  if (typeMessage == "text") {
    text = messages["text"]["body"];
  } else if (typeMessage == "interactive") {
    let interactiveObject = messages["interactive"];
    let typeInteractive = interactiveObject["type"];
    if (typeInteractive == "button_reply") {
      text = interactiveObject["button_reply"]["title"];
    } else if (typeInteractive == "list_reply") {
      text = interactiveObject["list_reply"]["title"];
    } else {
      console.log("sen message");
    }
  } else {
    console.log("sen message");
  }
  return text;
}
module.exports = {
  verifyToken,
  receivedMessage,
};
