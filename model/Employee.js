const mongoose=require('mongoose')
const {Schema}=mongoose

const employeeSchema=new Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    }
})

module.exports=mongoose.model('Employee',employeeSchema)