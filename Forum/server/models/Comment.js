const mongoose = require('mongoose'),
    CommentSchema = new mongoose.Schema({
        content: { type: String, required: true },
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        _answer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', required: true }
    }, {timestamps: true});

mongoose.model('Comment', CommentSchema);