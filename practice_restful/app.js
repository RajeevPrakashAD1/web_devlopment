
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const e = require("express");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose
    .connect('mongodb://localhost/restfulDB', {useNewUrlParser: true, useUnifiedTopology: true})
   

;


const ArticleSchema = mongoose.Schema({
    title:String,
    content:String
})

const Article = mongoose.model('Article', ArticleSchema);

app.route("/articles")
    .get(function(req,res){
        Article.find(function(err, foundarticles){
            if(!err){ res.send(foundarticles);}
            else{console.log(err);}
            
        })
    })
    .post(function(req,res){
        const title = req.body.title;
        const content = req.body.content;
        article = Article({
            title: title,
            content: content
        })
        article.save(function(err){ 
            if(!err){res.send("successfully saved");}
            else{console.log(err);}
        })
    })

    .delete(function(req,res){
        Article.deleteMany(function(err){
            if(!err){res.send("successfully deleted");}
            else{console.log(err);}
        })
    });


app.route("/articles/:articlename")
    

    .get(function(req,res){
        let article_name = req.params.articlename
        
        Article.findOne({title:article_name},function(err,found_articles){
            if(!err){
                if(found_articles != null){res.send(found_articles);}
                else{res.send("no such articles");}
            }
            else{console.log(err);}
        })
    })
    .put(function(req,res){
        Article.updateOne(
            {title:req.params.articlename},
            {title:req.body.title,content:req.body.content},
            
            function(err){
                if(!err){res.send("successfully updated");}
                else{res.send(err); console.log(err);}
            }
            
            )
    })
    .patch(function(req, res){
        Article.updateOne(
            {title:req.params.articlename},
            {$set:req.body},
            function(err){
                if(!err){res.send("successfully updated");}
                else{res.send(err);console.log(err);}
            }

            )
    })
    .delete(function(req,res){
        Article.deleteOne({title:req.params.articlename},
            function(err){
                if(!err){res.send("succesfully deleted");}
                else{console.log(err);}
            })
    });





app.listen(3000, function() {
    console.log("Server started on port 3000");
});
	