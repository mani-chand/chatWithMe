const User = require('./../models/userModel.js')
const bcrypt = require("bcrypt")
const signup=async (req,res,next)=>{
    try{
        const {username,email,number}=req.body
        const Euser = await User.findOne({email})
        const Uuser = await User.findOne({username})
        //console.log(Uuser,Euser)
        if(Euser !==null || Uuser !==null){
            return res.send("user already exists").status(422)
        }
        else{
            const password = await bcrypt.hash(req.body.password, 10)
            const newUser = await User({
                username,
                email,
                password,
                number
            }).save()
            return res.send("created user").status(201)
        }
    }catch(err){
        return res.send("server error").status(500)
    }
}
const signin = async (req,res,next) =>{
       const {email,password} = req.body 
       try{
           var user = await User.findOne({email})
           //console.log(user)
           if(user===null){
               return res.send("user does not exist")
            }   
            const result = await bcrypt.compare(password, user.password);
            delete user.password;
            //console.log(user)
           if(result){
            return res.send(user)
           }
           else{
           return res.send("password is incorrect")
           }
        }
       catch{}
}
const getAllUsers =async (req,res,next) => {
    const id = req.params['_id'] 
    try{
        const users = await User.find({_id:{$ne:id}},{username:1})
        return res.send(JSON.stringify(users))
    }catch(err){

    }
}
exports.signup=signup
exports.signin=signin
exports.getAllUsers=getAllUsers