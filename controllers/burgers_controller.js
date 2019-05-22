var express = require("express");
var router = express.Router();

var burgerModels = require("../models/burger");

router.get("/", function(req, res){
    burgerModels.selectAll(function(data){
        var object = {
            burgers: data
        };
        console.log('--------------------------');
        console.log(object);
        console.log('--------------------------');
        res.render("index", object);
    });
});

router.post("/api/burgers", function(req, res){
    console.log("api burgers");
    var burger_data = req.body;
    if(burger_data.devoured === '1' || burger_data.devoured === 'true') {
        burger_data.devoured = 1;
    } else {
        burger_data.devoured = 0;
    }
    console.log(burger_data);
    burgerModels.insertOne(burger_data, function(result){
        console.log("Inserted correctly!");
        console.log(result);
        res.json({ id: result.insertId });
    });
});

router.put("/devoure_burger", function(req, res){
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burgerModels.updateOne({
        devoured: req.body.devoured
    }, condition, function(result){
        if (result.changedRows == 0){
            //if no rows were changed then it was an invalid ID
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;
