const express=require('express')
const router=express.Router()
const path=require('path')


router.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'))
 //res.sendFile('./views/index.html',{root:__dirname})
 })
 

module.exports=router