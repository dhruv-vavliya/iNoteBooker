const mongo = require('mongoose');

const noteSchema = new mongo.Schema({

    // user_id of note = _id of user.
    user :{
        type : mongo.Schema.Types.ObjectId ,
        ref : 'user'
    },  
    title : {
        type : String ,
        required : true
    },
    description : {
        type : String ,
        required : true
    },
    tag: {
        type : String ,
        default : "general"
    },
    date : {
        type : Date ,
        default : Date.now
    }
})

module.exports = mongo.model('note' ,noteSchema);