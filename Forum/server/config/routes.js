const mongoose = require("mongoose"),
    User = mongoose.model("User"),
    Users = require("../controllers/Users.js"),
    Question = mongoose.model('Question'),
    Questions = require('../controllers/Questions.js'),
    Answer = mongoose.model('Answer'),
    Answers = require('../controllers/Answers.js'),
    Comment = mongoose.model('Comment'),
    Comments = require('../controllers/Comments.js'),
    path = require('path');

module.exports = function (app) {
    app.get("/", Users.root);
    app.get("/users", Users.usersGET);
    app.post("/users", Users.usersPOST);
    app.get("/users/:id", Users.userByIdGET);
    app.delete("/users/:id", Users.userDelete);
    app.put("/users/:id", Users.userByIdUpdate);

    app.post("/login", Users.login);

    app.get("/checkLoggedUser", Users.checkLoggedUser);

    app.get("/questions", Questions.questionsGET);
    app.post("/questions", Questions.questionsPOST);
    app.get("/questions/:id", Questions.questionByIdGET);
    app.delete("/questions/:id", Questions.questionDelete);
    app.put("/questions/:id", Questions.questionByIdUpdate);

    app.get("/answers", Answers.answersGET);
    app.post("/answers", Answers.answersPOST);
    app.get("/answers/:id", Answers.answerByIdGET);
    app.delete("/answers/:id", Answers.answerDelete);
    app.put("/answers/:id", Answers.answerByIdUpdate);

    app.get("/comments", Comments.commentsGET);
    app.post("/comments", Comments.commentsPOST);
    app.get("/comments/:id", Comments.commentByIdGET);
    app.delete("/comments/:id", Comments.commentDelete);
    app.put("/comments/:id", Comments.commentByIdUpdate);

    app.get("/logout", Users.logout);

    app.get('*', function(req,res){
        res.sendFile(path.resolve('./client/dist/index.html'));
    });
}
