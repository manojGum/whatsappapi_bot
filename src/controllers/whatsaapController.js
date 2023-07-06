const fs = require("fs");
/* // const myConsole = new console.Console(fs.createWriteStream('./logs.text')); */
const whatsappService = require("../services/whatsappService");
const samples = require("../shared/sampleModels");
const QueryInfo = require("../models/queryInfo/addQueryInfomodels");
const getJaccardSimilarity = require("../helper/botBehavior");
const axios = require("axios");
const isMatch = require("../helper/isMatch");
const BotUserDemo = require("../models/adddemodetails/userDemoDetailsModels");
const GetTextUser = require("../helper/getTextUser");
const conversations = {};
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

// const receivedMessage = async (req, res) => {
//   try {
//     /* Fetch All data into data base */
//     const data = await QueryInfo.find().populate("infoType");
//     console.log('eeeeeeeeeeeeeeeeentry',req)
//     let entry = req.body["entry"][0];
//     let changes = entry["changes"][0];

//     let value = changes["value"];

//     let messageObject = value["messages"];
//     if (typeof messageObject != "undefined") {
//       let messages = messageObject[0];
//       let number = await messages["from"];
//       let phone = parseInt(number.toString().slice(2));
//       /* // get user request text which is request by the whatsapp  */
//       let text = GetTextUser(messages);
//       console.log("user request text.......", text)

//       let maxSimilarity = 0;
//       let similarityThreshold = 0.6;
//       // check all the data user questions and or data is match or not if data not match then return defalut result other wise send result
//       // for (let i = 0; i < data.length; i++)
//       for (const obj of data) {
//         let faq = obj
//         console.log("faq.....................................",faq)
//         /* check similirity to the user question and my database question if question is match similarityThreshold then return that response */
//         const similarity = await getJaccardSimilarity(
//           text.toLowerCase(),
//           faq.question.toLowerCase()
//         );
//         if (similarity >= similarityThreshold && similarity > maxSimilarity) {
//           const infoType = faq.infoType.infoType.toLowerCase()
//           console.log("type Info.......", infoType);
//           if (infoType === "text") {
//             if (isMatch(faq.question.toLowerCase(), "i want my leave balance", similarityThreshold)) {
//             const object= await BotUserDemo.findOne({ phone},{ '_id': 0, "__v":0})
//               /*// let botR = await axios.get(`http://localhost:5658/api/v1/user/userdetails/917909012986`);
//               // console.log(botR)
//               */
//               if (object) {
//                 const botResponse = `Name: ${object.name}\nPhone: ${object.phone}\nEmail: ${object.email}\nPlan Leave: ${object.planLeave}\nSick Leave: ${object.sickLeave}\nPlan Leave Balance: ${object.planLeaveBalance}\nSick Leave Balance: ${object.sickLeaveBalance}\nTotal Leave Balance: ${object.totalLeaveBalance}`;
//                /* // console.log("bot leave balance..................................................",botR)
//                 // botResponse = await JSON.stringify(botR.data);
//                 */
//                 let data = samples.messageText(botResponse, number);
//                 whatsappService.sendMessageWhatsApp(data)
//                   .then(response => {
//                     console.log("Request successful:", response)
//                    return res.send(response)
//                   })
//               } else {
//                 let data = samples.messageText("no user register", number);
//                 whatsappService.sendMessageWhatsApp(data)
//                   .then(response => {
//                     console.log("Request successful:", response);
//                     return
//                   })
//               }
//             }
//              else {

//               let data = samples.messageText(faq.answer.text, number);
//               whatsappService.sendMessageWhatsApp(data)
//                 .then(response => {
//                   console.log("Request successful:", response)
//                   return
//                 })
//             }
//           } else if (infoType === "image") {
//             let data = samples.messageImage(faq, number);
//             whatsappService.sendMessageWhatsApp(data).then(response => {
//               console.log("Request successful:", response);
//               return
//             })
//               .catch(error => {
//                 console.error("An error occurred:", error);
//               });
//           } else if (infoType === "video") {
//             let data = samples.messageVideo(faq, number);
//             whatsappService.sendMessageWhatsApp(data).then(response => {
//               console.log("Request successful:", response);
//               return
//             })
//               .catch(error => {
//                 console.error("An error occurred:", error);
//               });
//           } else if (infoType === "audio") {
//             let data = samples.messageAudio(faq, number);
//             whatsappService.sendMessageWhatsApp(data).then(response => {
//               console.log("Request successful:", response);
//               return
//             })
//               .catch(error => {
//                 console.error("An error occurred:", error);
//               });
//           } else if (infoType === "document") {
//             let data = samples.messageDocument(faq, number);
//             whatsappService.sendMessageWhatsApp(data).then(response => {
//               console.log("Request successful:", response);
//               return
//             })
//               .catch(error => {
//                 console.error("An error occurred:", error);
//               });
//           } else if (infoType === "button") {
//             let data = samples.messageButtons(faq, number);
//             whatsappService.sendMessageWhatsApp(data).then(response => {
//               console.log("Request successful:", response);
//               return
//             })
//               .catch(error => {
//                 console.error("An error occurred:", error);
//               });
//           } else if (infoType === "list") {
//             let data = samples.messageList(faq, number);
//             whatsappService.sendMessageWhatsApp(data).then(response => {
//               console.log("Request successful:", response);
//               return
//             })
//               .catch(error => {
//                 console.error("An error occurred:", error);
//               });
//           } else if (infoType === "location") {
//             let data = samples.messageLocation(faq, number);
//             whatsappService.sendMessageWhatsApp(data).then(response => {
//               console.log("Request successful:", response);
//               return
//             })
//           }
//           else if (infoType === "link") {
//             let data = samples.messageLink(faq, number);
//             whatsappService.sendMessageWhatsApp(data).then(response => {
//               console.log("Request successful:", response);
//               return
//             })
//           }
//         }
//       }
//       /*
//       // end new for me
//       //   if (text == "text") {
//       //     let data = samples.messageText("hello users", number);
//       //     whatsappService.sendMessageWhatsApp(data);
//       //   } else if (text == "image") {
//       //     let data = samples.messageImage(number);
//       //     whatsappService.sendMessageWhatsApp(data);
//       //   } else if (text == "video") {
//       //     let data = samples.messageVideo(number);
//       //     whatsappService.sendMessageWhatsApp(data);
//       //   } else if (text == "audio") {
//       //     let data = samples.messageAudio(number);
//       //     whatsappService.sendMessageWhatsApp(data);
//       //   } else if (text == "document") {
//       //     let data = samples.messageDocument(number);
//       //     whatsappService.sendMessageWhatsApp(data);
//       //   } else if (text == "button") {
//       //     let data = samples.messageButtons(number);
//       //     whatsappService.sendMessageWhatsApp(data);
//       //   } else if (text == "list") {
//       //     let data = samples.messageList(number);
//       //     whatsappService.sendMessageWhatsApp(data);
//       //   } else if (text == "location") {
//       //     let data = samples.messageLocation(number);
//       //     whatsappService.sendMessageWhatsApp(data);
//       //   } else {
//       // let data = samples.messageText(
//       //   "I am sorry, I did not understand your request. Please try again or contact our HR department for assistance",
//       //   number
//       // );
//       // whatsappService.sendMessageWhatsApp(data);
//       //   }
//       */

//       let dataa = samples.messageText(
//         "I'm sorry, I didn't understand. Can you please rephrase your question?",
//         number
//       );
//       whatsappService.sendMessageWhatsApp(dataa).then(response => {
//         console.log("Request successful:", response);
//       });
//     }
//     return res.send("EVENT_RECEIVED");
//   } catch (error) {
//     res.send("event_RECIVED");
//   }
// };
//

// it is ok
// const receivedMessage = async (req, res) => {
//   try {
// const data = await QueryInfo.find().populate("infoType");
// const entry = req.body.entry[0];
// const changes = entry.changes[0];
// const value = changes.value;
// console.log("user Input data",value)
// const messageObject = value.messages;

// if (typeof messageObject !== "undefined") {
//   const messages = messageObject[0];
//   const number = await messages.from;
//   const phone = parseInt(messages.from.toString().slice(2));
//   const text = GetTextUser(messages);

//       const similarityThreshold = 0.6;
//       let maxSimilarity = 0;
//       let selectedFaq = null;

//       for (const obj of data) {
//         const faq = obj;
//         const similarity = await getJaccardSimilarity(
//           text.toLowerCase(),
//           faq.question.toLowerCase()
//         );
//         if (similarity >= similarityThreshold && similarity > maxSimilarity) {
//           maxSimilarity = similarity;
//           selectedFaq = faq;
//         }
//       }

//       if (selectedFaq !== null) {
//         const infoType = selectedFaq.infoType.infoType.toLowerCase();
//         if (infoType === "text") {
//           if (isMatch(selectedFaq.question.toLowerCase(), "i want my leave balance", similarityThreshold)) {
//             const object = await BotUserDemo.findOne({ phone }, { _id: 0, __v: 0 });

//             if (object) {
//               const botResponse = `Name: ${object.name}\n Phone: ${object.phone}\n Email: ${object.email}\n Plan Leave: ${object.planLeave}\n Sick Leave: ${object.sickLeave}\n Plan Leave Balance: ${object.planLeaveBalance}\nSick Leave Balance: ${object.sickLeaveBalance}\n Total Leave Balance: ${object.totalLeaveBalance}`;
//               const data = samples.messageText(botResponse, number);
//               await whatsappService.sendMessageWhatsApp(data);
//               return res.send("EVENT_RECEIVED");
//             } else {
//               const data = samples.messageText("no user register", number);
//               await whatsappService.sendMessageWhatsApp(data);
//               return res.send("EVENT_RECEIVED");
//             }
//           } else {
//             const data = samples.messageText(selectedFaq.answer.text, number);
//             await whatsappService.sendMessageWhatsApp(data);
//             return res.send("EVENT_RECEIVED");
//           }
//         } else if (infoType === "image" || infoType === "video" || infoType === "audio" || infoType === "document" || infoType === "button" || infoType === "list" || infoType === "location" || infoType === "link") {
//           const data = samples[`message${infoType.charAt(0).toUpperCase()}${infoType.slice(1)}`](selectedFaq, number);
//           await whatsappService.sendMessageWhatsApp(data);
//           return res.send("EVENT_RECEIVED");
//         }
//       }
//       const defaultmessage = samples.messageText("I'm sorry, I didn't understand. Can you please rephrase your question?", number);
//       await whatsappService.sendMessageWhatsApp(defaultmessage);
//       return res.send("EVENT_RECEIVED");
//     }

//     return res.send("EVENT_RECEIVED");
//   } catch (error) {
//     res.send("event_RECIVED");
//   }
// };

// without whatsapp some chages
const receivedMessage = async (req, res) => {
  try {
    const { userId, text } = req.body;

    // Validate input
    if (!userId || !text) {
      return res.status(400).json({ error: "userId and text are required." });
    }
    const data = await QueryInfo.find().populate("infoType");
    // const entry = req.body.entry[0];
    // const changes = entry.changes[0];
    // const value = changes.value;
    // console.log("user Input data",value)
    // const messageObject = value.messages;

    if (req.body !== "undefined") {
      // const messages = messageObject[0];
      // const number = await messages.from;
      // const phone = parseInt(messages.from.toString().slice(2));
      // const text = GetTextUser(messages);
      // const text = req.body.text;
      console.log("text..................", text);
    let phone=userId

      let conversationState = conversations[userId];
      if (
        conversationState &&
        conversationState.timestamp + 180000 >= Date.now()
      ) {
        // Restart the conversation if no state exists or if the last response was more than 5 minutes ago
        if (!text) {
          const indext = conversationState.currentQuestionIndex - 1;
          return res.send(conversationState.data.followUp[indext].question);
        } else {
          //check if the cournet index is less then index then send response data
          if (
            conversationState.currentQuestionIndex ===
            conversationState.data.followUp.length 
          ) {
            let lindex= conversationState.currentQuestionIndex -1
            let response =conversationState.data.followUp[lindex].response;
              // if (
              //   infoType === "image" ||
              //   infoType === "video" ||
              //   infoType === "audio" ||
              //   infoType === "document" ||
              //   infoType === "button" ||
              //   infoType === "list" ||
              //   infoType === "location" ||
              //   infoType === "link" ||
              //   infoType === "text"
              // ) {
              //   // const data = samples[`message${infoType.charAt(0).toUpperCase()}${infoType.slice(1)}`](selectedFaq, number);
              //   // await whatsappService.sendMessageWhatsApp(data);
              // }
            conversationState = {};
            conversations[userId] = conversationState;
            return res.send(response);
          } else {
            let response =
              conversationState.data.followUp[
                conversationState.currentQuestionIndex
              ].question;
            conversationState.currentQuestionIndex =
              conversationState.currentQuestionIndex + 1;
            conversationState.timestamp = Date.now(); // Update the timestamp for the next response
            // conversationState.data=conversations.data
            conversations[userId] = conversationState;
            return res.send(response);
          }
        }
      } else {
        const similarityThreshold = 0.6;
        let maxSimilarity = 0;
        let selectedFaq = null;

        for (const obj of data) {
          const faq = obj;
          const similarity = await getJaccardSimilarity(
            text.toLowerCase(),
            faq.question.toLowerCase()
          );
          if (similarity >= similarityThreshold && similarity > maxSimilarity) {
            maxSimilarity = similarity;
            selectedFaq = faq;
          }
        }

        if (selectedFaq !== null) {
          const infoType = selectedFaq.infoType.infoType.toLowerCase();
          if (infoType === "followup") {
            console.log("responseType", selectedFaq.followUp.length);
            if (selectedFaq.followUp && selectedFaq.followUp.length > 0) {
              const followUpQuestion = selectedFaq.followUp[0];
              conversationState = {
                currentQuestionIndex: 1,
                data: selectedFaq,
                timestamp: Date.now(),
              };
              conversations[userId] = conversationState;
              /* // const data = samples.messageText(selectedFaq.answer.text, number);
               // await whatsappService.sendMessageWhatsApp(data);
              // return res.send("EVENT_RECEIVED");
              */
              return res.send(followUpQuestion.question);
            }
            //else {
            //   reply = { message: "Conversation ended." };
            //   delete conversations[userId];
            // }
          } else if (infoType === "text") {
            // if (isMatch(selectedFaq.question.toLowerCase(), "i want my leave balance", similarityThreshold)) {
              // const object = await BotUserDemo.findOne({ phone }, { _id: 0, __v: 0 });

            //   if (object) {
            //     const botResponse = `Name: ${object.name}\n Phone: ${object.phone}\n Email: ${object.email}\n Plan Leave: ${object.planLeave}\n Sick Leave: ${object.sickLeave}\n Plan Leave Balance: ${object.planLeaveBalance}\nSick Leave Balance: ${object.sickLeaveBalance}\n Total Leave Balance: ${object.totalLeaveBalance}`;
            //     const data = samples.messageText(botResponse, number);
            //     await whatsappService.sendMessageWhatsApp(data);
            //     return res.send("EVENT_RECEIVED");
            //   } else {
            //     const data = samples.messageText("no user register", number);
            //     await whatsappService.sendMessageWhatsApp(data);
            //     return res.send("EVENT_RECEIVED");
            //   }
            // } else {
            // const data = samples.messageText(selectedFaq.answer.text, number);
            // await whatsappService.sendMessageWhatsApp(data);
            // return res.send("EVENT_RECEIVED");
            // }
            if(selectedFaq.inthub===true){
              const object = await BotUserDemo.findOne({ phone }, { _id: 0, __v: 0 });
              return res.send(object);
            }
            return res.send(selectedFaq.answer.text);
          } else if (
            infoType === "image" ||
            infoType === "video" ||
            infoType === "audio" ||
            infoType === "document" ||
            infoType === "button" ||
            infoType === "list" ||
            infoType === "location" ||
            infoType === "link"
          ) {
            // const data = samples[`message${infoType.charAt(0).toUpperCase()}${infoType.slice(1)}`](selectedFaq, number);
            // await whatsappService.sendMessageWhatsApp(data);
            return res.send(selectedFaq);
          }
        }
        // const defaultmessage = samples.messageText("I'm sorry, I didn't understand. Can you please rephrase your question?", number);
        // await whatsappService.sendMessageWhatsApp(defaultmessage);
        return res.send(
          "I'm sorry, I didn't understand. Can you please rephrase your question?"
        );
        return res.send("EVENT_RECEIVED");
      }

    }
  } catch (error) {
    res.send("event_RECIVED");
  }
};

module.exports = {
  verifyToken,
  receivedMessage,
};
