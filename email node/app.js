const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
//const request = require("request");
const http = require("https");
    
    
app = express();
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    
    var name = req.body.name;
    var email = req.body.email;
    console.log(name, email);
})

app.listen(3000,function(){
    console.log("server is running on 3000");
})