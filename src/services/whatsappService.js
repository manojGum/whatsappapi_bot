/*
// const https = require("https")

// function sendMessageWhatsApp(data){
//     // const data = JSON.stringify({
//     //     "messaging_product": "whatsapp",    
//     //     "to": number,
//     //     "type": "text",
//     //     "text": {
//     //         "body": textResponse
//     //     }
//     // });
//     // 
//     const options = {
//         host:"graph.facebook.com",
//         path:"/v16.0/122432790850913/messages",
//         method:"POST",
//         body:data,
//         headers:{
//             "Content-Type":"application/json",
//             Authorization:`Bearer ${process.env.WHATSAPP_CLOUD_API_VERIFICATION_TOKEN}`
//         }
//     };
//     const req = https.request(options,res=>{
//         res.on('data',d=>{
//             process.stdout.write(d);
//         });
//     });

//     req.on("error",error=>{
//         console.error(error);
//     });
//     req.write(data);
//     req.end();
// }

// module.exports ={
//     sendMessageWhatsApp
// }
*/

const axios = require("axios");

function sendMessageWhatsApp(data) {
  const options = {
    url: "https://graph.facebook.com/v16.0/122432790850913/messages",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WHATSAPP_CLOUD_API_VERIFICATION_TOKEN}`,
    },
    data: data,
  };

  axios(options)
    .then((response) => {
      console.log("boat response data",response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  sendMessageWhatsApp,
};
