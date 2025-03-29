const http=require('http')
const path=require('path')
const fs=require('fs')
const fsPromises=require('fs').promises

const EventEmitter=require('events')
const logEvent=require('./logEvent')
const { json } = require('stream/consumers')
class Emitter extends EventEmitter{}

const myEmitter=new Emitter()
const PORT=process.env.port||3500

const serveFile=async (filePath,contentType,response)=>{
   // console.log(`${filePath} this is`)
    try{
        const rawData=await fsPromises.readFile(filePath,
            !contentType.includes('image')?'utf8':'')
        const data=contentType==='application/json'? JSON.parse(rawData):rawData
        response.writeHead(filePath.includes('404.html')?404:200
            ,{'content-type':contentType})
        response.end(
            contentType==='application/json'?JSON.stringify(data):data
        )
    }
    catch(err){
        console.log(err)
        myEmitter.emit('logs',`${err.name}:${err.message}`,'reqLog.txt')
        response.statuscode=500
        response.end()
    }
}

const server=http.createServer((req,res)=>{
    console.log(req.url,req.method)
    myEmitter.emit('logs',`${req.url}\t${req.method}`,'reqLog.txt')
    
    let contentType;
    
    const extension=path.extname(req.url)
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath=contentType==='text/html' && req.url==='.html'?
                path.join(__dirname,'views','index.html'):contentType=='text/html' && req.url.slice(-1)==='/'?
                path.join(__dirname,'views',req.url,'index.html'):contentType=='text/html'?
                path.join(__dirname,'views',req.url):path.join(__dirname,req.url)

    if(!extension && req.url.slice(-1)!=='/') filePath+='.html'
    
    if(fs.existsSync(filePath)){
        //serve the file
       
        serveFile(filePath,contentType,res)
    }
    else{
        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301,{'Location':'/new-page.html'})
                res.end()
                break;
            case 'www-page.html':
                res.writeHead(301,{'Location':'/'})
                res.end()
                break
            default:
                serveFile(path.join(__dirname,'views','404.html'),'text/html',res)
        }
    }
    
})

myEmitter.on('logs',(txt,fileName)=>{
    logEvent(txt,fileName)
})

server.listen(PORT,console.log(`server running on Port ${PORT}`))

/*
/* 
app.use('/subdir',require('./routes/subdir'))
app.use('/subdir',express.static(path.join(__dirname,'/public'))) 
//Route handlers
app.get('/hi(.html)?',(req,res,next)=>{
    console.log('hi')
    next()
 },(req,res)=>{
    res.send('hellow')
 })

 //chain
 const one=(req,res,next)=>{
    console.log('one')
    next()
 }
 const two=(req,res,next)=>{
    console.log('two')
    next()
 }
 const three=(req,res,next)=>{
    console.log('three')
    res.send('finished')
 }

 app.get('/chain(.html)?',[one,two,three])
 */