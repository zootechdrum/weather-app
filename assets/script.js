$(document).ready(function () {
    console.log(moment().format('LL'));
    //GET THE VALUE OF INPUT BOX
    $("#search-btn").click(function () {
        var cityName = $("#search-input").val();
        //Use Regex to replace white space in string
        cityName.replace(/\s/g, "");
        //Create Div element
        var div = $("<div class='city-name'>");
        var city = div.append(cityName);
        //append city to the aside div in grid
        $(".past-city").append(city);
        currentWeather(cityName);
        forecast(cityName);
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
        var h2 = $("<h2 class='city'>");
        var city = h2.append(items.city.toUpperCase() + ": " + moment().format('LL'));
        $("#current-weather").append(city);
        var wind = items.windSpeed.toString();
        var hdty = items.humidity.toString();
        var windTxt = $("<p></p>").text("Wind Speed: " + wind);
        var humidityTxt = $("<p></p>").text("Humidity: " + hdty);
        $("#current-weather").append(windTxt);
        $("#current-weather").append(humidityTxt);
    };
    var forecast = function (cityName) {
        var URL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&&appid=eb24ebd17a4375e8ec365a3eba5592a2";
        $.ajax({ url: URL, success: function (result) {
                var foreCastData = result.list;
                for (var i = 2; i <= foreCastData.length; i = i + 8) {
                    console.log(foreCastData[i]);
                }
            }
        });
    };
    var getUvIndex = function (coordinates) {
        var lat = coordinates.lat.toString();
        var lon = coordinates.lat.toString();
        var URL = "https://api.openweathermap.org/data/2.5/uvi?&appid=eb24ebd17a4375e8ec365a3eba5592a2&lat=" + coordinates.lat + "&lon=" + coordinates.lat;
        $.ajax({ url: URL, success: function (result) {
                var uvIndex = Math.round(result.value);
                var uvIndexTxt = $("<p></p>");
                uvIndexTxt.addClass("uv-index");
                //Applies appropriate classes based on the intensity of the UV rays.
                if (function (uvIndex) { return 11; }) {
                    uvIndexTxt.addClass("extreme");
                    uvIndexTxt.text("UV Index: " + uvIndex + " (Extreme Risk)");
                }
                else if (uvIndex >= 8) {
                    uvIndexTxt.addClass("v-high");
                    uvIndexTxt.text("UV Index: " + uvIndex + " (Very High Risk)");
                }
                else if (uvIndex >= 6) {
                    uvIndexTxt.addClass("high");
                    uvIndexTxt.text("UV Index: " + uvIndex + " (High Risk)");
                }
                else if (uvIndex >= 3) {
                    uvIndexTxt.addClass("moderate");
                    uvIndexTxt.text("UV Index: " + uvIndex + " (Moderate Risk)");
                }
                else if (uvIndex >= 0) {
                    uvIndexTxt.addClass("low");
                    uvIndexTxt.text("UV Index: " + uvIndex + " (Low Risk)");
                }
                $("#current-weather").append(uvIndexTxt);
            }
        });
    };
});
