const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const ejs= require("ejs");
const encrypt = require("mongoose-encryption");

require("dotenv").config();

const app= express();

app.use(bodyparser.urlencoded( { extended: true } ));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username : String,
  password: String
});

userSchema.plugin(encrypt, {secret : process.env.secret , encryptedFields: ["password"] });

const user = mongoose.model("user",userSchema);

//------------------------------------------------------//

app.get("/",function(req,res){
//console.log(req);
     res.render('home');

});
app.get("/register",function(req,res){
  console.log(req);
     res.render('register');
});
app.get("/login",function(req,res){

     res.render('login');
});
app.get("/submit",function(req,res){
     res.render('submit');
});
app.get("/logout",function(req,res){
     res.redirect('/');
});

//------------------------------------------------------//

app.post("/register",function(req,res){
    const newUser = new user({
          username: req.body.username,
          password: req.body.password
     });
      newUser.save(function(err){
        if(err){
          console.log(err);
        }
        else {
          res.render("secrets");
        }
      });

});
app.post("/login",function(req,res){
  //console.log(req);
      const username = req.body.username;
      const password = req.body.password;
      user.findOne({username: username},function(err,result){
        if(!err){
          if (password===result.password) {
            console.log("Done Dnana Done");
            res.render("secrets");
          }
        }
        else{ console.log("Not Done");}
      });

});
app.post("/secrets",function(req,res){

});
//------------------------------------------------------//
app.listen(process.env.port|| 3000, "192.168.1.7" , function(err){
  if(!err){
      console.log("Server Online");
  }
  else {
    console.log("Some Errorororr");
  }
});
