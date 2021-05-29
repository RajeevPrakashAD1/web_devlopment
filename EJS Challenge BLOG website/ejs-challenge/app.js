//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const BlogSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    content:{type:String,required:true},
    webTitle:String
})

const TitleSchema = new mongoose.Schema({
    title:{type:String,required:true}
});

const Blog = mongoose.model('Blog',BlogSchema);

const blog1 = new Blog({
    title:"Starting",
    content:"starting my blogging from here",
    webTitle:_.lowerCase("Starting")
})

Blog.find(function(err,result){  
    if(!err){  
        if(result.length == 0){ blog1.save();}
    }
    else{ console.log(err);}

})



truncate = function(str){
    if(str.length >100){
        return str.substring(0,100)+".....";
    }
    else{
        return str;
    }
}

app.get('/',function(req,res){
    Blog.find(function(err,result){  
        if(!err){  
            res.render("home.ejs",{content:homeStartingContent,PostArr:result});
        }
        console.log(result);

    })

    
})

app.get("/contact",function(req,res){
    res.render("contact.ejs",{content_contact:aboutContent});
})

app.get("/about",function(req,res){
    res.render("about.ejs",{content_about:contactContent});
})



app.get("/compose",function(req,res){
    res.render("compose.ejs");
})

app.post("/compose",function(req,res){
    let Title = _.lowerCase(req.body.BlogTitle);
    let Trun_content = truncate(req.body.BlogContent); 
  
    let post= new Blog({
        title:req.body.BlogTitle,
        content:req.body.BlogContent,
        webTitle:Title
    });

    
    post.save();

    

    
    //console.log(Title);
    
    //console.log(posts);
    
    res.redirect("/");
});

app.get("/posts/:name",function(req,res){
    let originalTitle = req.params.name;
    let requested_title = _.lowerCase(req.params.name);
    
    Blog.findOne({webTitle:requested_title},function(err,result){
        if(!err){
            if(result != null){  res.render("post.ejs",{title_of_posts:originalTitle, blog:result}) ;}
            else{ console.log("Not matched");}
        }
        else{console.log(err);}
    });
    
    

    

   

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
