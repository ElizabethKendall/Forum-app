const mongoose = require('mongoose');

var Question = mongoose.model("Question");
var User = mongoose.model("User");

module.exports = {
    // "questionsGET": (req, res) => {
    //     Question.find({}, function (err, questions) {
    //         if (err) {
    //             res.json({ message: "Error", errors: questions.errors });
    //         }
    //         else {
    //             res.json({ message: "Success", data: questions });
    //         }
    //     });
    // },

    "questionsGET": (req, res) => {
        Question.find({}).populate('_user').exec(function (err, questions) {
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

    // "questionByIdGET": (req, res) => {
    //     Question.find({ _id: req.params.id }, function (err, question) {
    //         if (err) {
    //             res.json({ message: "Error", errors: err });
    //         }
    //         else {
    //             res.json({ message: "Success", data: question });
    //         }
    //     });
    // },

    "questionByIdGET": (req, res) => {
        // To understand the populate syntax below, see "Populating across multiple levels" at http://mongoosejs.com/docs/populate.html
        Question.find({ _id: req.params.id })
        .populate('_user')
        .populate({path: '_answer', populate:[{path:'_user'},{path:'_comments', populate: {path:'_user'}}]})
        .exec(function (err, question) {
            if (err) {
                res.json({ message: "Error", errors: err });
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
