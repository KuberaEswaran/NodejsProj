const Employee=require('./../model/Employee')


const getAllEmployee=async (req,res)=>{
    const employee=await Employee.find();
    if(!employee) return res.status(400).json({
        "message":"No Employee found"
    })
    return res.json(employee)
}

const addEmployee=async (req,res)=>{
    if(!req?.body?.firstname || !req?.body?.lastname ) return  res.status(400).json({
        "message":"both first and last names required"
    })
   try{
        const employee=await Employee.findOne({firstname:req.body.firstname,lastname:req.body.lasname}).exec()
        const result=await Employee.create({
            "firstname":req.body.firstname,
            "lastname":req.body.lastname,

        })

        res.status(201).json(result)
   }catch(err){
        console.log(err)
        return res.status(500).json({"message":err.message})
   }
}

const updateEmployee=async (req,res)=>{
    if(!req?.body?.id) return res.status(400).json({"message":"id required"})
    const employee=await Employee.findOne({_id:req.body.id}).exec()
    if(!employee) return res.status(400).json({
        "message":"No employee matches"
    })
    if(req.body?.firstname) employee.firstname=req.body.firstname
    if(req.body?.lastname)   employee.lastname=req.body.lastname
    const result=await employee.save()
    
  return  res.json(result)
}

const deleteEmployee=async (req,res)=>{
    if(!req?.body?.id) return res.status(400).json({"message":"id required"})
        const employee=await Employee.findOne({_id:req.body.id}).exec()
        if(!employee) return res.status(400).json({
            "message":"No employee matches"
        })
    const result=await employee.deleteOne({_id:req.id})
   return res.json(result)
}

const getEmployee=async (req,res)=>{
    if(!req?.params?.id) return res.status(400).json({"message":"id required"})
    const employee=await Employee.findOne({_id:req.params.id}).exec()
    
    if(!employee) return res.status(400).json({
        "message":"id not found"
    })
   return res.json(employee)
}

module.exports={getAllEmployee,updateEmployee,addEmployee,deleteEmployee,getEmployee}