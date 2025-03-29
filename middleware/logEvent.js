const {format} =require('date-fns')
const {v4:uuid} =require('uuid')
const fsPromises=require('fs').promises
const fs=require('fs')
const path=require('path')

const logEvent=async (msg,logName)=>{
    const dateTime=format(new Date(),'yyyy-MM-dd\tHH:mm:SS')
    logItem=`${dateTime}\t${uuid()}\t${msg}\n`
    console.log(logItem)
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
           await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),logItem)
        console.log('data added')
    }
    catch(err){
        console.log(err)
    }
}

const logger=(req,res,next)=>{
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    next()
 }

module.exports={logEvent,logger}

