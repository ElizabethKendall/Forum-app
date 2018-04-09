const mongoose = require("mongoose"),
    UserSchema = new mongoose.Schema({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        _questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
        _answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
        _comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    }, {timestamps: true});
    
mongoose.model("User", UserSchema);