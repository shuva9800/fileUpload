const mongoose = require("mongoose");

const fileschema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    imageUrl:{
        type: 'string',
    },
    tags:{
        type: 'string'
    },
    email:{
        type: 'string',
        required:true
    }
});


module.exports = mongoose.model("file", fileschema);