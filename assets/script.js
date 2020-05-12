$(document).ready(function () {
    //GET THE VALUE OF INPUT BOX
    $("#search-btn").click(function () {
        var str = $("#search-input").val();
        //Use Regex to replace white space in string
        str.replace(/\s/g, "");
        //Create Div element
        var div = $("<div class='city-name'>");
        var city = div.append(str);
        //append city to the aside div in grid
        $(".past-city").append(city);
        currentWeather(str);
    });
    var currentWeather = function (cityName) {
        var URL = "https:api.openweathermap.org/data/2.5/weather?q=" + cityName + "&&appid=eb24ebd17a4375e8ec365a3eba5592a2";
        $.ajax({ url: URL, success: function (result) {
                //items that will be in current-weather div
                var weatherItems = {
                    city: cityName,
                    humidity: result.main.humidity,
                    windSpeed: result.wind.speed
                };
                displayWeather(weatherItems);
                getUvIndex(result.coord);
            } });
    };
    var displayWeather = function (items) {
        //Replace everythin inside of current weather div
        $("#current-weather").empty();
        //Display the current city in current weather box
        var h2 = $("<h2>");
        var city = h2.append(items.city);
        $("#current-weather").append(city);
        var wind = items.windSpeed.toString();
        var hdty = items.humidity.toString();
        var windTxt = $("<p></p>").text("Wind Speed: " + wind);
        var humidityTxt = $("<p></p>").text("Humidity: " + hdty);
        $("#current-weather").append(windTxt);
        $("#current-weather").append(humidityTxt);
    };
    var getUvIndex = function (coordinates) {
        var lat = coordinates.lat.toString();
        var lon = coordinates.lat.toString();
        var URL = "https:api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon;
        $.ajax({ url: URL, success: function (result) {
                console.log(result);
            }
        });
        //items that will be in current-weather div
    };
});
