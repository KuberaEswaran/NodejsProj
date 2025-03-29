const verifyRoles=(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray=[...allowedRoles];
        const result=req.roles.map(role=>{
           return rolesArray.includes(role);
        }
        ).find(val=>
        { 
          return  val===true})
        if(!result){ return res.sendStatus(403);
            return;
         }
        console.log(result)
        if (!res.headersSent) next();
    }
}

module.exports=verifyRoles