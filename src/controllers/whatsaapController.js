const fs = require('fs');
// const myConsole = new console.Console(fs.createWriteStream('./logs.text'));
const whatsappService = require('../services/whatsappService');
const samples = require("../shared/sampleModels")
const verifyToken =(req,res)=>{
    try {
        // var accessToken = "RTQWWTVHBDSD78S78DSNDS9090DS";
        // var token = req.query["hub.verify_token"];
        // var challenge = req.body["hub.challenge"];
        // console.log(token)
        // if(challenge !== null && token !=null && token == accessToken){
        //     res.send(challenge)
        // }else{
        //     res.status(400).send()
        // }
        let mode = req.query["hub.mode"];
        let challange = req.query["hub.challenge"];
        let token= req.query["hub.verify_token"];
        const mytoken = "manojtoken";
        if(mode && token){
            if(mode === 'subscribe' && token=== mytoken){
                res.status(200).send(challange);
            }else{
                res.status(403)
            }
        }

    } catch (error) {
        res.status(400).send(error)
    }
}

const receivedMessage = async(req,res)=>{
    
    try {
        let entry=  (req.body["entry"])[0];
        let changes= (entry["changes"])[0];
      
        let value = changes["value"]
        
        let messageObject= value["messages"];
        if(typeof messageObject !="undefined"){

            let messages = messageObject[0]
            let number = await messages["from"]
            // console.log(messageObject)
            let text =  GetTextUser(messages)
            // console.log("recived text",text)
            // whatsappService.sendMessageWhatsApp("user send and reviced same message:"+ text,number)
           
            // myConsole.log(messageObject);
            if(text=="text"){
                let data = samples.sampleText("hello users",number)
                whatsappService.sendMessageWhatsApp(data)
            }
            else if(text == "image"){
                let data =samples.sampleImage(number)
                whatsappService.sendMessageWhatsApp(data)
            }
            else if(text == "video"){
                let data =samples.sampleVideo(number)
                whatsappService.sendMessageWhatsApp(data)
            }
            else if(text == "audio"){
                let data =samples.sampleAudio(number)
                whatsappService.sendMessageWhatsApp(data)
            }else if(text == "document"){
                let data =samples.sampleDocument(number)
                whatsappService.sendMessageWhatsApp(data)
            }
            else if(text == "button"){
                let data =samples.sampleButtons(number)
                whatsappService.sendMessageWhatsApp(data)
            }
            else if(text == "list"){
                let data =samples.sampleList(number)
                whatsappService.sendMessageWhatsApp(data)
            }
            else if(text == "location"){
                let data =samples.sampleLocation(number)
                whatsappService.sendMessageWhatsApp(data)
            }
            else{
                let data = samples.sampleText("I am sorry, I did not understand your request. Please try again or contact our HR department for assistance",number)
                whatsappService.sendMessageWhatsApp(data)
            }
        }
        res.send("EVENT_RECEIVED")
    
    } catch (error) {
        // myConsole.log(error);
        res.send('event_RECIVED')
    }
}

function GetTextUser(messages){
    let text ="";
    let typeMessage = messages["type"];
    if(typeMessage=="text"){
        text=(messages["text"])["body"];

    }else if(typeMessage=="interactive"){
        let interactiveObject = messages["interactive"];
        let typeInteractive= interactiveObject["type"];
        if(typeInteractive=="button_reply"){
            text=(interactiveObject["button_reply"])["title"];
        }else if(typeInteractive=="list_reply"){
            text=(interactiveObject["button_reply"])["title"];
        }else{
            console.log("sen message")
        }
    }else{
        console.log("sen message")
    }
    return text
}
module.exports = {
    verifyToken,
    receivedMessage
}