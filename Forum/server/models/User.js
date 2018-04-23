const mongoose = require("mongoose"),
    validate = require('mongoose-validate'),
    UserSchema = new mongoose.Schema({
        firstName: {
            type: String, 
            required: [
                true,
                'First name is required'
            ],
            validate: [
                validate.alpha,
                'Invalid first name'
            ]
        },

        lastName: {
            type: String, 
            required: [
                true,
                'Last name is required'
            ],
            validate: [
                validate.alpha,
                'Invalid last name'
            ]
        },

        email: {
            type: String, 
            required: [
                true,
                'Email is required'
            ], 
            unique: true,
            validate: [
                validate.email,
                'Incorrect email format'
            ]
        },

        password: {
            type: String, 
            required: [
                true,
                'Password is required'
            ]
        },

        _questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
        _answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
        _comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    }, {timestamps: true});
    
mongoose.model("User", UserSchema);