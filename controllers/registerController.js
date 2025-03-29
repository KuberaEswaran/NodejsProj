const User=require('./../model/User');
const bcrypt=require('bcrypt')

const handlenewuser=async (req,res)=>{
    const {username,password}=req.body;
    if(!username || !password) return res.status(500).send("Both username and password required");
    const userfound=await User.findOne({username:username}).exec();
    if(userfound) return res.status(409).send("conflict")
        try{
    const hashedpwd=await bcrypt.hash(password,10)

    //create and store at once
    const result=await User.create(
        {"username":username,
        "password":hashedpwd
    })
    console.log(result);
    res.status(200).json({"message":"registered successfully"})
        }
        catch(err){
            res.status(500).json({"message":err.message})
            console.log(err)
        }   
}

module.exports={handlenewuser};
