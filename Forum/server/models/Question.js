const mongoose = require('mongoose'),
    QuestionSchema = new mongoose.Schema({
        content: { type: String, required: true },
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        _answer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
    }, {timestamps: true});

mongoose.model('Question', QuestionSchema);