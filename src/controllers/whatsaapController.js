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
        // let mode = req.query["hub.mode"];
        // let challange = req.query["hub.challenge"];
        // let token= req.query["hub.verify_token"];
        // const mytoken = "manojtoken";
        // if(mode && token){
        //     if(mode === 'subscribe' && token=== mytoken){
        //         res.status(200).send(challange);
        //     }else{
        //         res.status(403)
        //     }
        // }
        res.send("i am ready")

    } catch (error) {
        res.status(400).send(error)
    }
}

const receivedMessage = (req,res)=>{
    res.send("hello receivedMessage")
}

module.exports = {
    verifyToken,
    receivedMessage
}