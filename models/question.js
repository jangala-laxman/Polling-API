const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    options: {
        type: mongoose.Schema.Types.Array, 
        ref: 'Options'
    }
})


module.exports = mongoose.model('Question', questionSchema);