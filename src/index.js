const express = require("express");
const apiRoute = require('./routers/routes');
const cors = require('cors')
const app = express();
app.use(cors())
// https://d043-125-20-111-58.in.ngrok.io/whatsapp
const PORT = process.env.PORT || 5656 ;
app.use(express.json());
app.use("/whatsapp", apiRoute);
app.get("/lo", (req, res) => {
    res.send({
      message: "Hi Welcome to HR Assistance bot",
    });
  });

app.listen(PORT, ()=>{
    console.log("application is running at port",PORT)
})