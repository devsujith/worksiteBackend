const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/WorkSiteDb',{ useNewUrlParser: true, useUnifiedTopology: true  });
const Schema = mongoose.Schema;


var ExpenseSchema = new Schema({
    title : String,
    date : String,
    amount : Number,
    mode : String 

});
var WagesSchema = new Schema({
    employeeID : String,
    employeeName : String,
    date : String,
    amount : Number,
    mode : String 

});

var TaskSchema = new Schema({
    taskName : String,
    startDate : String,
    endDate : String,
    estiamtedCost : Number, 
    wages :[WagesSchema],
    expenses : [ExpenseSchema]

});

var PaymentSchema = new Schema({
    title : String,
    amount : Number,
    date : String,
    mode : String 

});

var ProjectSchema = new Schema({
    title : String,
    desc : String,
    location : String,
    tasks : [TaskSchema],
    payments : [PaymentSchema]

});



var EmployeesSchema = new Schema({
    type : String,
    name : String,
    code : String

});

var NewUserSchema = new Schema({
    name : String,
    email : String,
    password : String,
    projects : [ProjectSchema],
    employees : [EmployeesSchema]
});

var Userdata = mongoose.model('userdata', NewUserSchema);

module.exports = Userdata
