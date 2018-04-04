const mongoose = require("mongoose");
const Task = mongoose.model("Task","TaskSchema"); // We are retrieving this Schema from our Models, named Task
const Tasks = require("../controllers/Tasks.js");
module.exports = function (app) {
    // will show the angular index page
    app.get("/", Tasks.root);
    // will serve up the full collection of tasks
    app.get("/tasks", Tasks.tasksGET);
    // render the form needed to create a task
    //app.get("/tasks/new", Tasks.tasksNewGET);
    // will add a task into the database.
    // need a form for this, or use Postman.
    app.post("/tasks", Tasks.tasksPOST);
    // will bring up the document of a particular task by _id.
    app.get("/tasks/:id", Tasks.taskByIdGET);
    // will delete a task from the database.
    app.delete("/tasks/:id", Tasks.taskDelete);
    // will update a particular task by _id.
    // need a form for this, or use Postman.
    app.put("/tasks/:id", Tasks.taskByIdUpdate);
}
