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
                if (typeof value === "string") {
                    value = "\"" + value + "\"";
                }
                if (typeof value === "boolean") {
                    if(value) {
                        value = 1;
                    } else {
                        value = 0;
                    }
                }
                columns += comma + key; // add key for database columns
                values += comma + value; // add value for database
                comma = ','; // set comma to separate values
            }
        }
        // finish querystring
        queryString += " (" + columns +") VALUES (" + values + ")";
        console.log(queryString);
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
        var setInput = ""; // what we need to set (keys & values)
        var queryString = "UPDATE "+ table;
        var comma = "";
        for(var key in input){
            if(Object.hasOwnProperty.call(input, key)){
                var value = input[key];
                if(key === 'id') {
                    continue;
                }
                if(typeof value === "string") {
                    value = "\"" + value + "\"";
                }
                if (typeof value === "boolean") {
                    if(value) {
                        value = 1;
                    } else {
                        value = 0;
                    }
                }
                setInput += comma + key + " = " + value;
                comma = ", ";
            }
        }      
        queryString += " SET " + setInput;
        queryString += " WHERE id = " + input.id;
        console.log(queryString);

        connection.query(queryString, function(err, results){
            if (err) throw err;
            if(callback) {
                callback(results);
            }
        });
    }    
}

module.exports = orm;