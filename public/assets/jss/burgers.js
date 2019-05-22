$(function(){
    $(".change-devoured").on("click", function(event){
        var id = $(this).data("id");

        $.ajax("/api/devoure_burger?id=" + id,{
            type: "PUT"
        }).then(
            function(){
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

        $.ajax("/api/add_burger", {
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
