const AllowedOrgin=require('./allowedOrgin')
const corsOption={
   origin:(origin,callback)=>{
      if(AllowedOrgin.indexOf(origin)!==-1 || !origin){
         callback(null,true)
      }
      else{
         callback(new Error('Not Allowed by Cors'))
      }
   },
   optionSuccessStatus:200
}

module.exports=corsOption