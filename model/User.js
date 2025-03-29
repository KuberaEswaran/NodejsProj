const mongoose=require('mongoose')
const {Schema}=mongoose

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    roles:{
        User:{type:Number,default:2001},
        Editor:{type:Number},
        Admin:{type:Number}
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:String

})

module.exports=mongoose.model('User',userSchema)