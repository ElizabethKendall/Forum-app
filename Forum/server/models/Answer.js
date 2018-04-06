const mongoose = require('mongoose'),
    AnswerSchema = new mongoose.Schema({
        content: { type: String, required: true },
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        _question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
        _comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    }, {timestamps: true});

mongoose.model('Answer', AnswerSchema);