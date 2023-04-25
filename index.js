const express = require('express');
const mongoose = require('mongoose');
const questionRoutes = require("./routes/questionRoute");
const optionRoutes = require('./routes/optionRouter')
const app = express();
const bodyParser = require("body-parser")

const uri = "mongodb+srv://srilaxman48:L1u9c9k9y@cluster0.zwtmwnc.mongodb.net/polling?authMechanism=SCRAM-SHA-1"

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();

app.use(bodyParser.urlencoded({ 
    extended: true 
}));

app.use(express.json());
app.use('/questions', questionRoutes);
app.use('/options',optionRoutes )

app.get('/', async (req,res)=>{
    res.send(
        `
        <h1>Polling API with list of routes </h1>
        
        <span>get questions : </span><a href="/questions">/questions</a><br/>
        <span>get question by id : </span><a href="/questions/:id">/questions/:id</a><br/>
        <span>get option by id: </span><a href="/options/:id">/options/:id</a><br/>
        <span>create questions : </span><a href="/questions/create">/questions/create_question</a><br/>
        <span>create options : </span><a href="/questions/:id/options/create">/questions/create_options</a><br/>
        <span>update questions : </span><a href="/questions/update/:id">/questions/update/:id</a><br/>
        <span>add vote to option : </span><a href="/options/:id/add_vote">/options/:id/add_vote</a><br/>
        <span>delete question : </span><a href="/questions/:id/delete">/questions/:id/delete"</a><br/>
        <span>delete option : </span><a href="/options/:id/delete">/options/:id/delete</a><br/>
        
        `
    )
})


app.listen(3000, ()=> {console.log("App is listening at 3000")});
