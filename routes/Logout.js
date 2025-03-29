const express=require('express')
const router=express.Router()
const LogOutController=require('../controllers/LogOutController')

console.log("logout1")
router.get('/',LogOutController.LogOutControl);

module.exports=router;