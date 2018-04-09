const mongoose = require("mongoose"),
    bcrypt = require('bcrypt-nodejs'),
    UserSchema = new mongoose.Schema({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        _questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
        _answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
        _comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    }, {timestamps: true});

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}
    
mongoose.model("User", UserSchema);