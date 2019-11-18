const Express = require('express');
const router = Express.Router();
const Userdata = require('../model/UserData')

router.post('/signup',(req,res)=>{

    console.log(req.body);

    var params = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }

   
    if (!params.name ) {
        res.json({
            success:false,
            message : "Name is required"
        })
    return    

    }

    if (!params.email ) {
        res.json({
            success:false,
            message : "Email is required"
        })
    return    

    }

    if (!params.password ) {
        res.json({
            success:false,
            message : "Password is required"
        })
    return    

    }


    Userdata.find({email: req.body.email}, function(err, user) 
    {
       if (err)
       {
        res.json(err);

       }
       
       if (user.length > 0)
       {
       console.log(user);
       res.json({
        success:false,
        message : "User already exists. Please login or use different email"
         })
       
       }
       else
       {
        var user = new Userdata(params);
        
        user.save(function(err, user){

            if (err)
          {
            res.json({
                success:false,
                message : "error",
                data : err
                 })
           return;
            }
            res.json({
                success:true,
                message : "User registered successfully.",
                data : {
                    _id:user._id,
                    name:user.name
                }
                 })


        });
       
       }
   
    });
    
 
 })

 router.post('/login',(req,res)=>{

    var params = {
        email : req.body.email,
        password : req.body.password
   
       }

       Userdata.findOne({email: req.body.email,password:req.body.password}, function(err, user) 
       {
          if (err)
          {
            res.json({
                success:false,
                message : "error",
                data : err
                 })
           return;

   
          }
          
          if (user)
          {
                res.json({
                success:true,
                message : "User found",
                data : {
                    _id:user._id,
                    name:user.name
                    }
                 })
          
          }
          else
          {
                res.json({
                success:false,
                message : "User not found"
                 })
          
          }
      
       });
    
 
})

module.exports= router 