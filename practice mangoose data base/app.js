const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true,useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    name : {type:String, required:true},
    age: Number
});

const User = mongoose.model('User',userSchema);

const user4 = new User({
    name:"rohit",
    age:19
});

// user4.save();


// const user1 = new User({
//     name:"prashant",
//     age:20
// });
// const user2 = new User({
//     name:"shyam",
//     age:21
// });
// const user3 = new User({
//     name:"bittu",
//     age:16
// });

// User.insertMany([user1,user2,user3],function(err){
//     if(err){console.log(err);}
//     else{console.log("success");}

// });

User.deleteMany({name:"rohit"},function(err){
    if(err){console.log(err);}
    else{console.log("success deleteOne");}
});

User.find(function(err,users){
    if(err){console.log(err);}
    else{console.log(users);}
});
User.find(function(err,users){
    for(let i of users){
        console.log(i["name"]);
    }
})
