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
            Authorization:"Bearer EAAIrbZCzlWy8BAPiK5hbCclTf9ybZBQ47VtLN3KMytn7ZBTmvdfYLMBg8C87Sbml7GtaQ2k18JBDxk2dHBTsIvFAOXOlqt33PnOSTqMB8g9wzW0W3NBedT06IsdZBZCZBUR9LmxEaz7FROoc8Cu0GWSKfWFJ4sgV4za4vGqZBsiUhvCvfHZAcsnDbtb5WyOFvZB05qTZACis0n5QZDZD"
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