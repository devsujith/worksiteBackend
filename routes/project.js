const Express = require('express');
const router = Express.Router();
//const Projectdata = require('../model/ProjectData')
const Userdata = require('../model/UserData')

router.post('/createProject',(req,res)=>{

    console.log(req.body);

    var params = {
        title : req.body.title,
        desc : req.body.desc,
        location : req.body.location
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

        doc.projects.push(params)
        doc.save();

        res.json({
            success:true,
            message : "project created successfully",
            data : doc
        })


        
      });


  
    
 
 })

 router.post('/updateProject',(req,res)=>{

    console.log(req.body);

    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        })
    return    

    }

    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        })
    return    

    }

    var params = {
        title : req.body.title,
        desc : req.body.desc,
        location : req.body.location,
        _id : projectID
        
    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })

        }

        
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }

        doc.projects[flag] = params

    

        doc.save();

        res.json({
            success:true,
            message : "Project updated successfully",
            data : doc.projects[flag]
        })


        
      });


  
    
 
 })

 router.post('/deleteProject',(req,res)=>{

    console.log(req.body);

    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        })
    return    

    }

    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        })
    return    

    }

    var params = {
        title : req.body.title,
        desc : req.body.desc,
        location : req.body.location,
        _id : projectID
        
    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })

        }

        
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }

     

       doc.projects.splice(flag, 1)


        doc.save();

        res.json({
            success:true,
            message : "Project updated successfully",
            data : doc.projects[flag]
        })


        
      });


  
    
 
 })



 router.post('/getProjects',(req,res)=>{
     console.log(req.body.userID)

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
        else
        {
            console.log("test123")
            console.log(doc)
            res.json({
                success:true,
                message : "projects found",
                data : doc.projects
            })
        }

        
      });

 
})

router.post('/getProject',(req,res)=>{

    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        })
    }

    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
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

        }
        else
        {

            for (i = 0 ; i < doc.projects.length ; i++){
                if (doc.projects[i]._id == projectID){
    
                    flag = i
                    break;
                }
            }
    
            console.log(doc)
            res.json({
                success:true,
                message : "projects found",
                data : doc.projects[flag]
            })
        }

        
      });

 
})


router.post('/addTask',(req,res)=>{

    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        })
    return    

    }

    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        })
    return    

    }

    var params = {
        taskName : req.body.taskName,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        estiamtedCost : req.body.estiamtedCost
    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })

        }

        
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }

        doc.projects[flag].tasks.push(params)

    

        doc.save();

        res.json({
            success:true,
            message : "Task created successfully",
            data : doc
        })


        
      });

 
})

router.post('/updateTask',(req,res)=>{
    console.log(req.body)
    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        }).end()
    return    
    }


    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        }).end()
    return    

    } 

    var taskID  =  req.body.taskID
    if (!taskID) {
        res.json({
            success:false,
            message : "Task ID required"
        }).end()
    return    

    } 

    var params = {
       
        taskName : req.body.taskName,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        estiamtedCost : req.body.estiamtedCost,
        _id : taskID
      
    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        console.log(doc)
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return
        }

        console.log("test")
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }
   
        
    for (i = 0 ; i < doc.projects[flag].tasks.length ; i++){
        if (doc.projects[flag].tasks[i]._id == taskID){

            taskFlag = i
            break;
        }
    }
        
        doc.projects[flag].tasks[taskFlag] = params

        doc.save();

        
        res.json({
            success:true,
            message : "Tasks updated successfully",
            data : doc
        })


        
      });

 
})

router.post('/deleteTask',(req,res)=>{
    console.log(req.body)
    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        }).end()
    return    
    }


    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        }).end()
    return    

    } 

    var taskID  =  req.body.taskID
    if (!taskID) {
        res.json({
            success:false,
            message : "Task ID required"
        }).end()
    return    

    } 



    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        console.log(doc)
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return
        }

        console.log("test")
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }
   
        
    for (i = 0 ; i < doc.projects[flag].tasks.length ; i++){
        if (doc.projects[flag].tasks[i]._id == taskID){

            taskflag = i
            break;
        }
    }
        
        doc.projects[flag].tasks.splice(taskflag, 1)

       

        doc.save();

        
        res.json({
            success:true,
            message : "Tasks deleted successfully",
            data : doc
        })


        
      });

 
})

router.post('/addWage',(req,res)=>{
    console.log(req.body)
    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        }).end()
    return    
    }


    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        }).end()
    return    

    } 

    var taskID  =  req.body.taskID
    if (!taskID) {
        res.json({
            success:false,
            message : "Task ID required"
        })
    return    

    }


    var params = {
        employeeID : req.body.employeeID,
        employeeName : req.body.employeeName,
        amount : req.body.amount,
        date : req.body.date,
        mode : req.body.mode
    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        console.log(doc)
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return

        }

        
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }

        for (i = 0 ; i < doc.projects[flag].tasks.length ; i++){
            if (doc.projects[flag].tasks[i]._id == taskID){

                taskFlag = i
                break;
            }
        }


        doc.projects[flag].tasks[taskFlag].wages.push(params)

        doc.save();

        res.json({
            success:true,
            message : "Wage created successfully",
            data : doc
        })


        
      });

 
})

router.post('/addExpense',(req,res)=>{
    console.log(req.body)
    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        }).end()
    return    
    }


    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        }).end()
    return    

    } 

    var taskID  =  req.body.taskID
    if (!taskID) {
        res.json({
            success:false,
            message : "Task ID required"
        })
    return    

    }


    var params = {
        title : req.body.title,
        amount : req.body.amount,
        date : req.body.date,
        mode : req.body.mode
    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        console.log(doc)
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return
        }

        
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }

        for (i = 0 ; i < doc.projects[flag].tasks.length ; i++){
            if (doc.projects[flag].tasks[i]._id == taskID){

                taskFlag = i
                break;
            }
        }


        doc.projects[flag].tasks[taskFlag].expenses.push(params)

        doc.save();

        res.json({
            success:true,
            message : "Expense created successfully",
            data : doc
        })


        
      });

 
})

router.post('/updateExpense',(req,res)=>{
    console.log(req.body)
    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        }).end()
    return    
    }


    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        }).end()
    return    

    } 

    var taskID  =  req.body.taskID
    if (!taskID) {
        res.json({
            success:false,
            message : "Task ID required"
        })
    return    

    }

    var expenseID  =  req.body.expenseID
    if (!expenseID) {
        res.json({
            success:false,
            message : "Expense ID required"
        })
    return    

    }


    var params = {
        title : req.body.title,
        amount : req.body.amount,
        date : req.body.date,
        mode : req.body.mode,
        _id : expenseID
    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        console.log(doc)
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return
        }

        
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }

        for (i = 0 ; i < doc.projects[flag].tasks.length ; i++){
            if (doc.projects[flag].tasks[i]._id == taskID){

                taskFlag = i
                break;
            }
        }

        for (i = 0 ; i < doc.projects[flag].tasks[taskFlag].expenses.length ; i++){
            if (doc.projects[flag].tasks[taskFlag].expenses[i]._id == expenseID){

                expenseFlag = i
                break;
            }
        }


        doc.projects[flag].tasks[taskFlag].expenses[expenseFlag] = params

        doc.save();

        res.json({
            success:true,
            message : "Expense Updated successfully",
            data : doc
        })


        
      });

 
})

router.post('/deleteExpense',(req,res)=>{
    console.log(req.body)
    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        }).end()
    return    
    }


    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        }).end()
    return    

    } 

    var taskID  =  req.body.taskID
    if (!taskID) {
        res.json({
            success:false,
            message : "Task ID required"
        }).end()
    return    

    } 

    var expenseID  =  req.body.expenseID
    if (!expenseID) {
        res.json({
            success:false,
            message : "Expense ID required"
        }).end()
    return    

    } 



    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        console.log(doc)
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return
        }

        console.log("test")
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }
   
        
    for (i = 0 ; i < doc.projects[flag].tasks.length ; i++){
        if (doc.projects[flag].tasks[i]._id == taskID){

            taskflag = i
            break;
        }
    }

    for (i = 0 ; i < doc.projects[flag].tasks[taskFlag].expenses.length ; i++){
        if (doc.projects[flag].tasks[taskFlag].expenses[i]._id == expenseID){

            expenseflag = i
            break;
        }
    }
        
        doc.projects[flag].tasks[taskFlag].expenses.splice(expenseflag, 1)

       

        doc.save();

        
        res.json({
            success:true,
            message : "Expense deleted successfully",
            data : doc
        })


        
      });

 
})

router.post('/addPayment',(req,res)=>{
    console.log(req.body)
    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        }).end()
    return    
    }


    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        }).end()
    return    

    } 

    var params = {
       
        title : req.body.title,
        amount : req.body.amount,
        date : req.body.date,
        mode : req.body.mode
      
    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        console.log(doc)
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return
        }

        console.log("test")
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }
console.log("test")
        
        
        
        doc.projects[flag].payments.push(params)
        

        doc.save();

        
        res.json({
            success:true,
            message : "Payments created successfully",
            data : doc
        })


        
      });

 
})

router.post('/updatePayment',(req,res)=>{
    console.log(req.body)
    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        }).end()
    return    
    }


    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        }).end()
    return    

    } 

    var paymentID  =  req.body.paymentID
    if (!paymentID) {
        res.json({
            success:false,
            message : "Payment ID required"
        }).end()
    return    

    } 

    var params = {
       
        title : req.body.title,
        amount : req.body.amount,
        date : req.body.date,
        mode : req.body.mode,
        _id : paymentID
      
    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        console.log(doc)
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return
        }

        console.log("test")
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }
   
        
    for (i = 0 ; i < doc.projects[flag].payments.length ; i++){
        if (doc.projects[flag].payments[i]._id == paymentID){

            paymentflag = i
            break;
        }
    }
        
        doc.projects[flag].payments[paymentflag] = params

        doc.save();

        
        res.json({
            success:true,
            message : "Payments updated successfully",
            data : doc
        })


        
      });

 
})

router.post('/deletePayment',(req,res)=>{
    console.log(req.body)
    var userID =  req.body.userID
    if (!userID) {
        res.json({
            success:false,
            message : "User ID required"
        }).end()
    return    
    }


    var projectID  =  req.body.projectID
    if (!projectID) {
        res.json({
            success:false,
            message : "Project ID required"
        }).end()
    return    

    } 

    var paymentID  =  req.body.paymentID
    if (!paymentID) {
        res.json({
            success:false,
            message : "Payment ID required"
        }).end()
    return    

    } 

    var params = {
       
        title : req.body.title,
        amount : req.body.amount,
        date : req.body.date,
        mode : req.body.mode,
        _id : paymentID
      
    }

    Userdata.findOne({ _id: req.body.userID }, function (err, doc){
        console.log(doc)
        if (err)
        {
        res.json({
            success:false,
            message : "error",
            data : err
        })
        return
        }

        console.log("test")
        for (i = 0 ; i < doc.projects.length ; i++){
            if (doc.projects[i]._id == projectID){

                flag = i
                break;
            }
        }
   
        
    for (i = 0 ; i < doc.projects[flag].payments.length ; i++){
        if (doc.projects[flag].payments[i]._id == paymentID){

            paymentflag = i
            break;
        }
    }
        
        doc.projects[flag].payments.splice(paymentflag, 1)

       

        doc.save();

        
        res.json({
            success:true,
            message : "Payments updated successfully",
            data : doc
        })


        
      });

 
})

module.exports= router 