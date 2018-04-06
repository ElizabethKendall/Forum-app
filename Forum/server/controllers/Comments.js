const mongoose = require('mongoose');

var Comment = mongoose.model("Comment");

module.exports = {
    "commentsGET": (req, res) => {
        Comment.find({}, function (err, comments) {
            if (err) {
                res.json({ message: "Error", errors: comments.errors });
            }
            else {
                res.json({ message: "Success", data: comments });
            }
        });
    },

    "commentsPOST": (req, res) => {
        var comment = new Comment(req.body);
        comment.save(function (err) {
            if (err) {
                res.json({ message: "Error", errors: comment.errors });
            }
            else {
                res.json({ message: "Success", data: comment });
            }
        });
    },

    "commentByIdGET": (req, res) => {
        Comment.find({ _id: req.params.id }, function (err, comment) {
            if (err) {
                res.json({ message: "Error", errors: comment.errors });
            }
            else {
                res.json({ message: "Success", data: comment });
            }
        });
    },

    "commentDelete": (req, res) => {
        Comment.remove({ _id: req.params.id }, function (err) {
            if (err) {
                res.json({ message: "Error", errors: err });
            }
            else {
                res.json({ message: "Success", data: { _id: req.params.id } });
            }
        });
    },

    "commentByIdUpdate": (req, res) => {
        Comment.update({ _id: req.params.id }, req.body, function (err, comment) {
            if (err) {
                res.json({ message: "Error", errors: err });
            }
            else {
                res.json({ message: "Success", data: comment });
            }
        });
    }
}
