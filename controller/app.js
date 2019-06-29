var express=require('express');
var app=express();

var user=require('../model/user.js');

var verifyToken=require('../auth/verifyToken.js');


var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);


app.post('/api/user',verifyToken,function(req,res){

    var username=req.body.username;
    var email=req.body.email;
    var role=req.body.role;
    var password=req.body.password;

    user.addUser(username,email,role,password,function(err,result){
        if(!err){
            res.send("{\"result\":\""+result +"\"}");

        }else{
            res.status(500);
            res.send(err.statusCode);

        }

    });


});

app.get('/api/user/:userid',function(req,res){

    var id=req.params.userid;


    user.getUser(id,function(err,result){

        if(!err){
            res.send(result);
        }else{

            res.status(500).send("{\"Message\":\"Some error occurred\"}");
            
        }


    });


});


app.post('/api/login',function(req,res){

    var email=req.body.email;
    var password=req.body.password;

    user.loginUser(email,password,function(err,result){
        if(!err){
            res.send("{\"result\":\""+result +"\"}");

        }else{
            res.status(500);
            res.send(err.statusCode);

        }

    });


});

module.exports=app;