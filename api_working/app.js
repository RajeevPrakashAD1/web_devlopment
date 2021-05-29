const { response } = require("express");
const express = require("express");
const { Http2ServerRequest } = require("http2");
const http = require("https");


app = express();

api_id = "8bb8ff531bac8a392ae6091c7393aa27"
app.get("/",function(req,res){

    http.get('https://api.openweathermap.org/data/2.5/weather?q=Patna&units=metric&appid=8bb8ff531bac8a392ae6091c7393aa27',function(response){
        console.log(response.statusCode);

        response.on('data',function(data){


            const weatherData = JSON.parse(data);

            const temp  = weatherData.main.temp
            const feels = weatherData.main.feels_like
            res.write("<h1> patna temp is "+ temp + ".</h1>")
            res.write("thankyou");
            res.send();
    

            
        })
       
    } )

    
})



app.listen(3000,function(){
    console.log("server is running on 3000");
})