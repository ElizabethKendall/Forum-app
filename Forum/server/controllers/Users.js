const mongoose = require("mongoose"),
    bcrypt = require('bcryptjs');

var User = mongoose.model("User");

module.exports = {
    "root":function(req, res){
        res.render("index.html");
    },

    "usersGET":(req, res) => {
        User.find({}, function(err, users){
            if(err){
                res.json({message:"Error", errors: users.errors});  
            }
            else{
                res.json({message:"Success", data:users});  
            }
        });
    },

    "usersPOST":(req, res) => {
        console.log('in controller ',req.body);
        var user = new User(req.body);
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err){
                    console.log(err);
                    return;
                }
                user.password = hash;
                user.save();
            });
        });
        user.save(function(err){
            if(err){
                res.json({message:"Error", errors: user.errors});
            }
            else{
                res.json({message:"Success", data:user});
            }           
        });
    }, 

    "userByIdGET":(req, res) => {
        User.find({_id:req.params.id}, function(err, user){
            if(err){
                res.json({message:"Error", errors: user.errors});
            }
            else{
                res.json({message:"Success", data:user});
            }
        });
    },

    "userDelete":(req, res) => {
        User.remove({_id:req.params.id}, function(err){
            if(err){
                res.json({message:"Error", errors: err});
            }
            else{
                res.json({message:"Success", data:{_id: req.params.id}});
            }
        });
    },

    "userByIdUpdate":(req, res) => {
        User.update({_id:req.params.id}, req.body, function(err, user){
            if(err){
                res.json({message:"Error", errors: err});
            }
            else{
                res.json({message:"Success", data:user});
            }
        });
    }
}
