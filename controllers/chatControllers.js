const Message = require('./../models/messageModel.js')
const sendmessage = async (req,res,next)=>{
 const {from,to,message} = req.body
 try{
    const createMessage = await Message({
         from,
         to,
         message
    }).save()
    res.json(createMessage)
 }catch(err){

 }
}
const getMessage =async (req,res,next)=>{
    const {from,to} = req.params
    try{
       var tomessages =await Message.find({to,from})
       var frommessages = await Message.find({from:to,to:from})
       var messages =[...tomessages,...frommessages]
       messages.sort((a,b)=>a.createdAt-b.createdAt)
       res.json(messages)
    } 
    catch(err){}
}
exports.sendMessage=sendmessage;
exports.getMessage=getMessage;