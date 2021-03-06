var express = require("express");
var PORT = process.env.PORT || 8080;
var app = express();

process.env.NODE_ENV = 'deploy';

app.use(function(req, res, next) {
    express.urlencoded({ extended: true })(req,res,next);
});
app.use(function(req,res,next){
    express.json()(req,res,next);
});
app.use(function(req,res,next){
    express.static("public")(req,res,next);
});

//handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
     defaultLayout: "main",
     layoutsDir: __dirname + "/views/layouts",
     partialsDir: __dirname + "/views/partials"
}));
app.set("view engine", "handlebars");

//routes
var routes = require("./controllers/burgers_controller.js");
app.use(function(req,res,next){
    routes(req,res,next);
});

app.listen(PORT, function(){
    console.log("server listening on: http://localhost:" + PORT);
});

module.exports = app;