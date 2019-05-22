var express = require("express");
var router = express.Router();

var burgerModels = require("../models/burger");

router.get("/", function(req, res){
    burgerModels.selectAll(function(data){
        var object = {
            burgers: data
        };
        for(var i = 0; i < object.burgers.length; i++){
            var devoured = object.burgers[i].devoured;
            object.burgers[i].devoured = devoured.readUInt8() > 0;
        }
        console.log('--------------------------');
        console.log(object.burgers)
        console.log('--------------------------');
        res.render("index", object);
    });
});

router.post("/api/add_burger", function(req, res){
    console.log("api burgers");
    var burger_data = req.body;
    if(burger_data.devoured === '1' || burger_data.devoured === 'true') {
        burger_data.devoured = 1;
    } else {
        burger_data.devoured = 0;
    }
    console.log(burger_data);
    burgerModels.insertOne(burger_data, function(result){
        res.json({ id: result.insertId });
    });
});

router.put("/api/devoure_burger", function(req, res){
    var burger_data = {
        id: req.query.id,
        devoured: 1
    };

    burgerModels.updateOne(burger_data, function(result){
        if (result.changedRows == 0){
            //if no rows were changed then it was an invalid ID
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;
