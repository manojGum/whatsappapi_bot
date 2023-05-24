function messageText(textResponse,number){
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

function messageImage(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "image",
        "image": {
            "link":"https://th.bing.com/th/id/OIP.1YM53mG10H_U25iPjop83QHaEo?pid=ImgDet&rs=1"
        }
    });
    return data;
}

function messageAudio(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "audio",
        "audio": {
            "link":"https://file-examples.com/index.php/sample-audio-files/sample-mp3-download/"
        }
    });
    return data;
}

function messageVideo(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "video",
        "video": {
            "link":"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        }
    });
    return data;
}

function messageDocument(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "document",
        "document": {
            "link": "https://dagrs.berkeley.edu/sites/default/files/2020-01/sample.pdf",
            "filename": "Pdf file"
        }
    });
    return data;
}

function messageButtons(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": "Confirm registration"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": "Yes"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "002",
                            "title": "No"
                        }
                    }
                ]
            }
        }
    });
    return data;
}

function messageList(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "list options"
            },
            "footer": {
                "text": "Select form list"
            },
            "action": {
                "button": "slect option 1",
                "sections": [
                    {
                        "title": "LIST_SECTION_1_TITLE",
                        "rows": [
                            {
                                "id": "LIST_SECTION_1_ROW_1_ID",
                                "title": "SECTION_1_ROW_1_TITLE",
                                "description": "SECTION_1_ROW_1_DESC"
                            },
                            {
                                "id": "LIST_SECTION_1_ROW_2_ID",
                                "title": "SECTION_1_ROW_2_TITLE",
                                "description": "SECTION_1_ROW_2_DESC"
                            }
                        ]
                    },
                    {
                        "title": "LIST_SECTION_2_TITLE",
                        "rows": [
                            {
                                "id": "LIST_SECTION_2_ROW_1_ID",
                                "title": "SECTION_2_ROW_1_TITLE",
                                "description": "SECTION_2_ROW_1_DESC"
                            },
                            {
                                "id": "LIST_SECTION_2_ROW_2_ID",
                                "title": "SECTION_2_ROW_2_TITLE",
                                "description": "SECTION_2_ROW_2_DESC"
                            }
                        ]
                    }
                ]
            }
        }
    });
    return data;
}

function messageLocation(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "to": number,
        "type": "location",
        "location": {
            "latitude": "22.568784083078427",
            "longitude": "88.43187531135716",
            "name": "Indus Net Technologies",
            "address": "4th Floor, SDF Building Saltlake Electronic Complex, Kolkata, West Bengal 700091"
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
    messageButtons,
    messageList,
    messageLocation
}