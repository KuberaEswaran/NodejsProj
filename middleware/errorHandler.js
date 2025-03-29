const {logEvent}=require('./logEvent')

const errorHandler=(err,req,res,next)=>{
    console.error(err.stack);
    logEvent(`${err.name}\t${err.message}`,'errLog.txt')
    res.status(500).send(err.message)
    
 }

module.exports=errorHandler;