const mongoose = require('mongoose');

var Answer = mongoose.model("Answer");

module.exports = {
    "answersGET": (req, res) => {
        Answer.find({}, function (err, answers) {
            if (err) {
                res.json({ message: "Error", errors: answers.errors });
            }
            else {
                res.json({ message: "Success", data: answers });
            }
        });
    },

    "answersPOST": (req, res) => {
        var answer = new Answer(req.body);
        answer.save(function (err) {
            if (err) {
                res.json({ message: "Error", errors: answer.errors });
            }
            else {
                res.json({ message: "Success", data: answer });
            }
        });
    },

    "answerByIdGET": (req, res) => {
        Answer.find({ _id: req.params.id }, function (err, answer) {
            if (err) {
                res.json({ message: "Error", errors: answer.errors });
            }
            else {
                res.json({ message: "Success", data: answer });
            }
        });
    },

    "answerDelete": (req, res) => {
        Answer.remove({ _id: req.params.id }, function (err) {
            if (err) {
                res.json({ message: "Error", errors: err });
            }
            else {
                res.json({ message: "Success", data: { _id: req.params.id } });
            }
        });
    },

    "answerByIdUpdate": (req, res) => {
        Answer.update({ _id: req.params.id }, req.body, function (err, answer) {
            if (err) {
                res.json({ message: "Error", errors: err });
            }
            else {
                res.json({ message: "Success", data: answer });
            }
        });
    }
}
