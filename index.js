const express = require('express');
const mongoose = require('mongoose');
const questionRoutes = require("./routes/questionRoute");
const optionRoutes = require('./routes/optionRouter')
const app = express();
const bodyParser = require("body-parser")
mongoose.connect("mongodb://localhost:27017/polling");
const database = mongoose.connection

database.on("error", (error)=>{
    console.log(error);
})
database.once("connected", () => {
    console.log("Database connected");
})
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(express.json());
app.listen(3000, ()=> {console.log("App is listening at 3000")});
app.use('/questions', questionRoutes);
app.use('/options',optionRoutes )