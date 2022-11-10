const  express= require('express')
const router = express.Router();
const {sendMessage,getMessage} = require('./../controllers/chatControllers.js')
router.post('/sendmessage',sendMessage)
router.get('/message/:from/:to',getMessage)
 
module.exports=router