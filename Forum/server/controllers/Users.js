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
        User.find({email: req.body.email}, function(err,user){
            if(err){
                res.json({message: "Find Error", errors: err});
            } else if(user.length > 0){
                res.json({message: "Taken Email"});
            } else {
                var user = new User(req.body);
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if(err){
                            res.json({message:"Error", errors: err});
                        }
                        user.password = hash;
                        user.save(function (err) {
                            if (err) {
                                res.json({ message: "Model Error", errors: err });
                            } else {
                                res.json({ message: "Success", data: user });
                                req.session.user = user[0];
                                req.session.save();
                            }
                        });
                    });
                });
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
    },
    
    "login":(req,res) => {
        User.find({email: req.body.email}, function(err, user){
            if (err){
                res.json({message: "Find Error", errors: user.errors});
            }
            else{
                if(user[0]){
                    bcrypt.compare(req.body.password, user[0].password, function(err, result){
                        if(err){
                            res.json({message: "Compare Error", error: err});
                        } else {
                            res.json({message: "Success", data: result});
                            req.session.user = user[0];
                            req.session.save();
                        }
                    });
                } else {
                    res.json({message: "Incorrect Email"});
                }
            }
        });
    },

    "checkLoggedUser":(req,res) => {
        if(req.session.user){
            res.json({message: "Logged", user: req.session.user});
        } else {
            res.json({message: "Not Logged"});
        }
    },

    "logout":(req,res) => {
        req.session.destroy();
        res.redirect('/');
    }
}
