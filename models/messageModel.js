const mongoose = require('mongoose')
const { Schema } = mongoose;
const messageModel = new mongoose.Schema({
    from:{
         type: Schema.Types.ObjectId, 
         ref: 'users' 
    },
    to:{
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },
    message:{
        type:String,
        required: true
    }
},
{ 
    timestamps: true 
}
)
module.exports = mongoose.model('messages', messageModel)