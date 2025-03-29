const User=require('./../model/User')
const bcrypt=require('bcrypt')

const showUser=async (req,res)=>{
    const user=await User.find();
    if(!user) return response.status(400).json({"message":"No user Found"})
    return res.json(user)
}

const updateUser=async (req,res)=>{
    if(!req?.body?.id) return res.staus(400).json({"message":"id not found"})
        const uid=req.body.id;
    const user=await User.findOne({_id:uid}).exec()
    if(!user) return res.json({"message":"No user found with this id"})
    if(req.body.username) user.username=req.body.username;
    if(req.body.password){
        const hashpwd=await bcrypt.hash(req.body.password,10)
        user.password=req.body.password
    }
    const result=await user.save();
   
        return res.json(user)
}
const delUser=async (req,res)=>{
    if(!req?.body?.id) return res.json({"message":"id not found"})
    const user=await User.findOne({_id:req.body.id}).exec();
    if(!user){
        return res.json({"message":"user not found"})
    }
    const result=await User.deleteOne({_id:req.body.id})
 return res.json(result)
}

const getUser=async (req,res)=>{
    const id=req.params.id;
    const user=await User.findOne({_id:id}).exec();
    if(!user){
        return res.json({"message":"user not found"})
    }
    return res.json(user)
}

module.exports={showUser,updateUser,delUser,getUser}