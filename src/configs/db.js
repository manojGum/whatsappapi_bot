const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
  // MongoDb Database connection 
const connect = () => {
    return mongoose
    .connect(process.env.MONGODBCONNECTION)
    .then(() => {
      console.log("Database connection is ready .....");
    })
    .catch((err) => {
      console.log(err);
    });

};

module.exports = connect;