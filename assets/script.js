$(document).ready(() => {
//GET THE VALUE OF INPUT BOX
 
$("#search-btn").click(()=> {
    const str = $("#search-input").val().trim()
    //Create Div element
    const div = $("<div>")

    const city = div.append(str)

    $(".past-city").append(city)
})


});

