
const mongo = require('mongoose');

const userSchema = new mongo.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String ,
        required : true ,
        unique : true
    },
    password : {
        type : String ,
        required : true ,
    },
    date : {
        type : Date ,
        default : Date.now
    }
});

module.exports = mongo.model( 'user' ,userSchema );