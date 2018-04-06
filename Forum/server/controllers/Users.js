const mongoose = require("mongoose");

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
        var user = new User(req.body);
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
