const https = require("https")

function sendMessageWhatsApp(textResponse,number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "text",
        "text": {
            "body": textResponse
        }
    });
    const options = {
        host:"graph.facebook.com",
        path:"/v16.0/122432790850913/messages",
        method:"POST",
        body:data,
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer EAAIrbZCzlWy8BAEUV84JGrMuQheZA9UpZBX41XodTKO4jqDF9AVnRwJlf7gU0SPDkd864FmSO4faK5qBnncBvvOl7bRjA9ke6pZCnMbMCBv9vFEHgFdy5gw0owmxu24furLUcNOhGpUKvhJ4DiBy5MEDKV2QhzXuq5RyVBA124vbRVtWFlO6ZAhkswEdKDBeRsXCIp6b9KgZDZD"
        }
    };
    const req = https.request(options,res=>{
        res.on('data',d=>{
            process.stdout.write(d);
        });
    });

    req.on("error",error=>{
        console.error(error);
    });
    req.write(data);
    req.end();
}

module.exports ={
    sendMessageWhatsApp
}