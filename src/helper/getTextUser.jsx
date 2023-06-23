function GetTextUser(messages) {
    let text = "";
    let typeMessage = messages["type"];
    if (typeMessage == "text") {
      text = messages["text"]["body"];
    } else if (typeMessage == "interactive") {
      let interactiveObject = messages["interactive"];
      let typeInteractive = interactiveObject["type"];
      if (typeInteractive == "button_reply") {
        text = interactiveObject["button_reply"]["title"];
      } else if (typeInteractive == "list_reply") {
        text = interactiveObject["list_reply"]["title"];
      } else {
        console.log("sen message");
      }
    } else {
      console.log("sen message");
    }
    return text;
  }
  module.exports = GetTextUser