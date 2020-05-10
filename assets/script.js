$(document).ready(function () {
    //GET THE VALUE OF INPUT BOX
    $("#search-btn").click(function () {
        var str = $("#search-input").val();
        //Use Regex to replace white space in string
        str.replace(/\s/g, "");
        //Create Div element
        var div = $("<div>");
        var city = div.append(str);
        //append city to the aside div in grid
        $(".past-city").append(city);
        getForecast(str);
    });
    var getForecast = function (cityName) {
        var URL = "https://api.openweathermap.org/data/2.5/forecast?q=riverside&&appid=eb24ebd17a4375e8ec365a3eba5592a2";
        $.ajax({ url: URL, success: function (result) {
                console.log(result);
            } });
    };
});
