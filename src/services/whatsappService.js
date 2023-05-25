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
            Authorization:"Bearer EAAIrbZCzlWy8BAN9L0fYEfecjelO5YaDU7g2f5RrQKRZAOPtuMGx742FYaP3EZA9ZAh7wvyNeztJIuYNjVE0AFx7QpFP0OoK8g3yLEvo5M3ryv8MI9CozSwA8x9lEa1HVnOFb9r0cjPjUGJvj4987ZCfckR6pmpKNZCgMq4LOIMeRg0Ah87rMWnCZB2ETnGljHxvxiZBZBkB6gQZDZD"
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