$(function(){
    $(".change-devoured").on("click", function(event){
        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");
        var devouredSatus = {
            devoured: newDevoured
        };

        $.ajax("/api/burgers" + id,{
            type: "PUT",
            data: devouredSatus
        }).then(
            function(){
                console.log("changed devoured to", newDevoured);
                location.reload();
            }
        );
    });

    $("#burger-button").on("click", function(event){
        event.preventDefault();
        console.log("CLICKED================");

        var newBurger = {
            burger_name: $("#ca").val().trim(),
            devoured: 0
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function(){
                console.log("added a new burger");
                location.reload();
            }
        );
    });

});