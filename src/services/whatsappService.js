const https = require("https")

function sendMessageWhatsApp(data){
    // const data = JSON.stringify({
    //     "messaging_product": "whatsapp",    
    //     "to": number,
    //     "type": "text",
    //     "text": {
    //         "body": textResponse
    //     }
    // });
    const options = {
        host:"graph.facebook.com",
        path:"/v16.0/122432790850913/messages",
        method:"POST",
        body:data,
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer EAAIrbZCzlWy8BAOcrfa7lrwNd1BDNzZA7VZAF8nvf5rPL8ORPrWeqZBtnW5ZBZCECJPcLQud1ZA4mHyNimesFcZChtz7GqZCqNrsIfNABeuPHynFTThPluccz6dtxE1DOGOIphsQNykUWzLEk4r3GhIcWH1bexmZAjujPkGocJJoiEQCqTZCrME1nx0DfTkhLKdHl0ZBPjJ7d79GgwZDZD"
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