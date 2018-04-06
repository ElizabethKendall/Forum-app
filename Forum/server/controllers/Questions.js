const mongoose = require('mongoose');

var Question = mongoose.model("Question");

module.exports = {
    "questionsGET": (req, res) => {
        Question.find({}, function (err, questions) {
            if (err) {
                res.json({ message: "Error", errors: questions.errors });
            }
            else {
                res.json({ message: "Success", data: questions });
            }
        });
    },

    "questionsPOST": (req, res) => {
        var question = new Question(req.body);
        question.save(function (err) {
            if (err) {
                res.json({ message: "Error", errors: question.errors });
            }
            else {
                res.json({ message: "Success", data: question });
            }
        });
    },

    "questionByIdGET": (req, res) => {
        Question.find({ _id: req.params.id }, function (err, question) {
            if (err) {
                res.json({ message: "Error", errors: question.errors });
            }
            else {
                res.json({ message: "Success", data: question });
            }
        });
    },

    "questionDelete": (req, res) => {
        Question.remove({ _id: req.params.id }, function (err) {
            if (err) {
                res.json({ message: "Error", errors: err });
            }
            else {
                res.json({ message: "Success", data: { _id: req.params.id } });
            }
        });
    },

    "questionByIdUpdate": (req, res) => {
        Question.update({ _id: req.params.id }, req.body, function (err, question) {
            if (err) {
                res.json({ message: "Error", errors: err });
            }
            else {
                res.json({ message: "Success", data: question });
            }
        });
    }
}
