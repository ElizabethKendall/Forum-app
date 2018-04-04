const mongoose = require("mongoose");
var Task = mongoose.model("Task", "TaskSchema") // We are retrieving this Schema from our Models, named Task
module.exports = {
"root":function(req, res){
res.render("index.html");
},
"tasksGET":(req, res) => {
Task.find({}, function(err, tasks){
if(err){
res.json({message:"Error", errors: tasks.errors});  
}
else{
res.json({message:"Success", data:tasks});  
}
});
},
// "tasksNewGET":function(req, res){
// res.render("new");
// },
"tasksPOST":(req, res) => {
var task = new Task(req.body);
task.save(function(err){
if(err){
res.json({message:"Error", errors: task.errors});
}
else{
res.json({message:"Success", data:task});
}           
});
}, 
"taskByIdGET":(req, res) => {
Task.find({_id:req.params.id}, function(err, task){
if(err){
res.json({message:"Error", errors: task.errors});
}
else{
res.json({message:"Success", data:task});
}
});
},
"taskDelete":(req, res) => {
Task.remove({_id:req.params.id}, function(err){
if(err){
res.json({message:"Error", errors: err});
}
else{
res.json({message:"Success", data:{_id: req.params.id}});
}
});
},
"taskByIdUpdate":(req, res) => {
Task.update({_id:req.params.id}, req.body, function(err, task){
if(err){
res.json({message:"Error", errors: err});
}
else{
res.json({message:"Success", data:task});
}
});
}
}
