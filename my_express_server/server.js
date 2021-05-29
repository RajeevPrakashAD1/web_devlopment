const express = require('express');
const bodyParser  = require("body-parser");

const app = express()
const port = 3000
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/about",function(req,res){
    res.send("i am ad a web developet");
    
})

app.get("/calculate", function(req,res){
    res.sendFile(__dirname+"/calculator.html");
})



app.post("/calculate",function(req,res){
   var  num1 = Number(req.body.first_num);
   var  num2 = Number(req.body.second_num);

    res.send("result :"+ (num1 + num2));
})









app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})