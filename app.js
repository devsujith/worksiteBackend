const express = require('express');
const cors = require('cors');
var bodyparser=require('body-parser');

var app = new express();
app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

var authRouter = require("./routes/auth")
app.use('/auth',authRouter)

var projectRouter = require("./routes/project")
app.use('/project',projectRouter)

var employeeRouter = require("./routes/employee")
app.use('/employee',employeeRouter)

app.listen(process.env.PORT || 3000,()=>{
    console.log('Server started in port 3000');
})