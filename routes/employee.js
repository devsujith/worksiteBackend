const Express = require('express');
const router = Express.Router();
//const Projectdata = require('../model/ProjectData')
const Userdata = require('../model/UserData')

router.post('/addEmployee',(req,res)=>{

    console.log(req.body);

    var params = {
        name : req.body.name,
        code : req.body.code,
        type : req.body.type
    }

    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        })
    return    

    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return    

        }

        doc.employees.push(params)
        doc.save();

        res.json({
            success:true,
            message : "Employee created successfully",
            data : doc
        })


        
      });


  
    
 
 })

 router.post('/getEmployees',(req,res)=>{

    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        })
    }

    Userdata.find({ _id: req.body.userID }, function (err, doc){
        
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })

        }
        else
        {
            res.json({
                success:true,
                message : "data found",
                data : doc.employees
            })
        }

        
      });

 
})

router.post('/updateEmployee',(req,res)=>{

    console.log(req.body);

    var params = {
        name : req.body.name,
        code : req.body.code,
        type : req.body.type,
        employeeID : req.body.employeeID
    }

    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        })
    return    

    }

    var employeeID =  req.body.employeeID
    if (!employeeID) {
        res.json({
            success:false,
            message : "Employee ID required"
        })
    return    

    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return    

        }

        for (i = 0 ; i < doc.employees.length ; i++){
            if (doc.employees[i]._id == employeeID){

                flag = i
                break;
            }
        }

        doc.employees[i] = params
        doc.save();

        res.json({
            success:true,
            message : "Employee Updated successfully",
            data : doc
        })


        
      });


  
    
 
 })

 router.post('/deleteEmployee',(req,res)=>{

    console.log(req.body);

  

    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        })
    return    

    }

    var employeeID =  req.body.employeeID
    if (!employeeID) {
        res.json({
            success:false,
            message : "Employee ID required"
        })
    return    

    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return    

        }

        for (i = 0 ; i < doc.employees.length ; i++){
            if (doc.employees[i]._id == employeeID){

                flag = i
                break;
            }
        }

        doc.employees.splice(flag, 1)
        doc.save();

        res.json({
            success:true,
            message : "Employee Deleted successfully",
            data : doc
        })


        
      });


  
    
 
 })