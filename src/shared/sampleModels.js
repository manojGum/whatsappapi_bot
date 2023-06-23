function messageText(textResponse, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "text",
        "text": {
            "body": textResponse
        }
    });
    return data;
}

function messageImage(faq, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "image",
        "image": {
            "link": faq.answer.link
        }
    });
    return data;
}

function messageAudio(faq, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "audio",
        "audio": {
            "link": raq.answer.link //"https://file-examples.com/storage/fee0ed988b646cbee9f2340/2017/11/file_example_MP3_700KB.mp3"
        }
    });
    return data;
}

function messageVideo(faq, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "video",
        "video": {
            "link": faq.answer.link //"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        }
    });
    return data;
}

function messageDocument(faq, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "document",
        "document": {
            "link": faq.answer.link,
            "caption": faq.answer.caption || "",
            "filename": faq.answer.filename || " "
        }
    });
    return data;
}

function messageButton(faq, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": faq.buttons.responsetext || ""
            },
            "action": {
                "buttons": faq.buttons.buttonslist.map(button => {
                    return ({
                        type: "reply",
                        reply: {
                            id: button._id,
                            title: button.title
                        }
                    })
                })
                /*
                // [
                //     {
                    //     "type": "reply",
                    //     "reply": {
                    //         "id": "001",
                    //         "title": "Yes"
                    //     }
                    // },
                //     {
                //         "type": "reply",
                //         "reply": {
                //             "id": "002",
                //             "title": "No"
                //         }
                //     }
                // ]
                */
            }
        }
    });
    return data;
}
// function generateListTemplateRow(rows) {
//     const template = {
//       rows: rows.map(row => ({
//         id: row._id,
//         title: row.title,
//         description: row.description
//       }))
//     };
  
//     return template;
//   }
const messageList= (faq, number)=> {

    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text":faq.list.responsetext
            },
            "action": {
                "button": "SELECT-OPTIONS",
                  "sections": [
                    {
                        "title": faq.list.listheading || "LIST _ SECTION",
                        "rows": faq.list.buttonslist.map(button => {
                            return ({
                                id: button._id,
                                title: button.title,
                                description: button.description || " "
                            })
                        })
                    }
                ]
            }
        }
    });
    console.log("data....................backend",data)
    return data;
}


   /*
                // [
                //     {
                //         "title": "LIST_SECTION_1_TITLE",
                        // "rows": [
                        //     {
                        //         "id": "LIST_SECTION_1_ROW_1_ID",
                        //         "title": "SECTION_1_ROW_1_TITLE",
                        //         "description": "SECTION_1_ROW_1_DESC"
                        //     },
                        //     {
                        //         "id": "LIST_SECTION_1_ROW_2_ID",
                        //         "title": "SECTION_1_ROW_2_TITLE",
                        //         "description": "SECTION_1_ROW_2_DESC"
                        //     }
                        // ]
                //     }
                // ]
          

                // faq.list.buttonslist.map(button => {
                //     return ({
                //         id: button._id,
                //         title: button.title,
                //         description: button.description || " "
                //     })
                // })
*/

function messageLocation(faq, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "location",
        "location": {
            "latitude": faq.location.latitude,
            "longitude": faq.location.longitude,
            "name": faq.location.name,
            "address": faq.location.address
        }
    });
    return data;
}

function messageLink(faq, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "text",
        "text": {
            "preview_url": false,
            "body": `"Please visit ${faq.answer.link}`
        }
    });
    return data;
}

module.exports = {
    messageText,
    messageImage,
    messageAudio,
    messageVideo,
    messageDocument,
    messageButton,
    messageList,
    messageLocation,
    messageLink
}