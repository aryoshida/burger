var connection = require("../config/connection.js");

var orm = {
    selectAll: function(table, callback){
        var queryString = "SELECT * FROM " + table;
        connection.query(queryString, function(err, results){
            if (err) throw err;
            callback(results);
        });
    },

    insertOne: function(table, input, callback){
        var queryString = "INSERT INTO " + table;
        var columns = "";
        var values = "";
        //what separates the values
        var comma = "";
        for(var key in input){
            // check to skip hidden properties
            if (Object.hasOwnProperty.call(input, key)) {
                var value = input[key];
                // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
                if (typeof value === "string" && value.indexOf(" ") >= 0) {
                    value = "'" + value + "'";
                }
                columns += comma + key; // add key for database columns
                values += comma + value; // add value for database
                comma = ','; // set comma to separate values
            }
        }
        // finish querystring
        queryString += " (" + columns +") VALUES (" + values + ")";
        // INSERT INTO BURGERS (burger_name,devoured) VALUES ('myBurger',0)
        connection.query(queryString, function(err, results){
            if (err) throw err;
            if(callback) {
                callback(results);
            }
        });
    },

    updateOne: function(table, input, callback){
        var id = input.id;
        var assignments = "";
        var value = input.isEaten ? 1 : 0;
        var queryString = "UPDATE "+ table;
        var comma = "";
        for(var key in input){
            if(Object.hasOwnProperty.call(input, key)){
                var value = input[key];
                if(typeof value === "string" && value.indexOf(" ") >= 0){
                    value = "'" + value + "'";
                }
                columns += comma + key;
                value += comma + value;
                comma = ",";
            }
        }      
        queryString += " SET ";
        queryString += " (" + columns +") VALUES (" + values + ")";
        queryString += " WHERE ";
        queryString += id = input.id;

        connection.query(queryString, function(err, results){
            if (err) throw err;
            if(callback) {
                callback(results);
            }
        });
    }    
}

module.exports = orm;