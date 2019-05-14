var orm = require("orm");

var burger = {
    table: "burgers",
    selectAll: function(callback){
        var queryString = "SELECT * FROM burgers;";
        connection.query(queryString, function(err, results){
            if (err) throw err;
            callback(results);
        });
    },

    insertOne: function(input, callback){
        orm.insertOne(this.table, input, callback);
    },

    updateOne: function(input, callback){
        var id = input.id;
        var burgerName = input.name;
        var isEaten = input.isEaten ? 1 : 0;
        var queryString = "UPDATE burgers SET burger_name = \'" + burgerName + "\' devoured = " + isEaten + " WHERE id = " + id;
        connection.query(queryString, function(err, results){
            if (err) throw err;
            if(callback) {
                callback(results);
            }
        });
    }   
}

module.exports("burger.js");