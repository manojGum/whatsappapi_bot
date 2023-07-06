const express = require("express");
const apiRoute = require("./routers/routes");
const addInfoRoute = require("./routers/addInfoRoutes");
const infotypeRoutes = require("./routers/infoTypeRoutes");
const usersRoutes = require("./routers/userRoutes");
const adduserdemoDetails= require('./routers/adduserdemodetails');
const bodyParser = require('body-parser')
const morgan = require("morgan");
require('dotenv').config()
const mongoose = require("mongoose");
const cors = require("cors");
const connect = require("./configs/db");
const app = express();

// middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5656;
const api=process.env.ApI_URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// route
app.use(`${api}/whatsapp`, apiRoute);
app.use(`${api}/infotype`, infotypeRoutes);
app.use(`${api}/addinfo`, addInfoRoute);
app.use(`${api}/userdemodetails`,adduserdemoDetails);
app.use(`${api}/users`, usersRoutes);

//Databse connection
/*
// mongoose
//   .connect(
//     process.env.MONGODBCONNECTION
//   )
//   .then(() => {
//     console.log("Database connection is ready .....");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
*/
app.listen(PORT, async() => {
  await connect();
  console.log("application is running at port", PORT);
});
