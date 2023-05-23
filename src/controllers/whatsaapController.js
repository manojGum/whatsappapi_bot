const fs = require('fs');
// const myConsole = new console.Console(fs.createWriteStream('./logs.text'));

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

const receivedMessage = (req,res)=>{
    
    try {
        let entry=  (req.body["entry"])[0];
        let changes= (entry["changes"])[0];
      
        let value = changes["value"]
        
        let messageObject= value["messages"];
        console.log(messageObject)
        // myConsole.log(messageObject);
        res.send("EVENT_RECEIVED")
    
    } catch (error) {
        // myConsole.log(error);
        res.send('event_RECIVED')
    }
}

module.exports = {
    verifyToken,
    receivedMessage
}