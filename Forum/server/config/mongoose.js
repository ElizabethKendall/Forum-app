const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");
mongoose.connect("mongodb://localhost/Forum");
var models_path = path.join(__dirname, "./../models");
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf(".js") >= 0) {
    require(models_path + "/" + file);
    console.log(models_path +"/"+file);
   }
})
