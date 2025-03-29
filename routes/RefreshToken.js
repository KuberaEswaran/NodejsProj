const express=require('express')
const router=express.Router()
const RefreshtokenController=require('../controllers/RefreshtokenController')

router.get('/',RefreshtokenController.RefreshToken)

module.exports=router;