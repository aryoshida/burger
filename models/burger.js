var orm = require("../config/orm");

var burger = {
    table: "burgers",
    selectAll: function(callback){
        orm.selectAll(this.table, callback);
    },

    insertOne: function(input, callback){
        orm.insertOne(this.table, input, callback);
    },

    updateOne: function(input, callback){
        orm.updateOne(this.table, input, callback);
    }   
}


// HOW A CALLBACK WOULD WORK USING THESE FUNCTIONS 
//OPTION 1
// var handleGetBurgers = function(results) {
//     console.log(results);
// }
// burger.selectAll(handleGetBurgers)
// SIMILAR TO THIS
// var num = 10;
// burger.add(num);

//OPTION 2
// burger.selectAll(function(results){
//     console.log(results);
// });
// SIMILAR TO THIS
// burger.add(10);


module.exports = burger;