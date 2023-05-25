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
            Authorization:"Bearer EAAIrbZCzlWy8BAKLZCkhN2ZCrSfufAO7LEnYqyhy3PkKIALGmQrqQwxmLTS1JTGp5WQ0q60pKyxpXfOAHwQGMvEyFYtZB6JrWyD6erj9KAqdKYx2dbVyqh9cvW6YOdkOQHLXPB4v51anr1ermWoU8ten63jPskTeMf32aWjZAJxrVAMa9hAsbyDZAGqmNRaH11BrwSEZCVGsAZDZD"
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