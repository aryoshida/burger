var express = require("express");
var burgers = require("../models/burger.js");
var router = express.Router();

var burgerModels = require("../models/burger");

router.get("/", function(req, res){
    burgerModels.selectAll(function(data){
        var object = {

        };
        console.log(object);
        res.render("index", object);
    });
});

router.post("/new_burger", function(req, res){
    burgerModels.insertOne([
        "burgerName", "devoured"
    ], [
        req.body.burgerName, req.body.devoured
    ], function(result){
        res.json({ id: result.insertId });
    });
});

router.put("/devoure_burger", function(req, res){
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burgerModels.updateOne({
    
    }, condition, function(result){
        if (result.changedRows == 0){
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
