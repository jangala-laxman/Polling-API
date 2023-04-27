const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    id:{
        type:Number,
    },
    text: {
        type: String,
        required: true
    },
    votes :{
        type: Number,
        required: true
    },
    link_to_vote :{
        type: String,
        required: true
    },
    question : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Question'
    }
})

module.exports = mongoose.model('Options', optionSchema, 'Options');