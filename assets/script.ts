$(document).ready(() => {
//GET THE VALUE OF INPUT BOX
 
$("#search-btn").click(() => {

    const str = $("#search-input").val() as string
    //Use Regex to replace white space in string
    str.replace(/\s/g, "")

    //Create Div element
    const div = $("<div class='city-name'>")
    const city = div.append(str)
    //append city to the aside div in grid
    $(".past-city").append(city)



    currentWeather(str);

})

const currentWeather = (cityName: string) => {

    const URL = `https:api.openweathermap.org/data/2.5/weather?q=${cityName}&&appid=eb24ebd17a4375e8ec365a3eba5592a2`

    $.ajax({url: URL, success: function(result){
        //items that will be in current-weather div
        const weatherItems = {
            city: cityName,
            humidity: result.main.humidity,
            windSpeed: result.wind.speed
        }

        displayWeather(weatherItems)
        getUvIndex(result.coord)

      }});
}

const displayWeather = ( items: {city:string, humidity: number, windSpeed: number}) => {
    
    //Replace everythin inside of current weather div

    $("#current-weather").empty()
    //Display the current city in current weather box
    const h2: JQuery<HTMLElement> = $("<h2>") 
    const city : JQuery<HTMLElement> = h2.append(items.city) 
    $("#current-weather").append(city)

    
    const wind = items.windSpeed.toString();
    const hdty = items.humidity.toString()

    const windTxt = $("<p></p>").text("Wind Speed: " + wind)
    const humidityTxt = $("<p></p>").text("Humidity: " + hdty)

    $("#current-weather").append(windTxt)
    $("#current-weather").append(humidityTxt)
}

const getUvIndex = (coordinates: {lat:number, lon: number}) => {
    
    const lat = coordinates.lat.toString()
    const lon = coordinates.lat.toString()

    const URL = `https://api.openweathermap.org/data/2.5/uvi?&appid=eb24ebd17a4375e8ec365a3eba5592a2&${coordinates.lat}=37.75&lon=-122.37`;

    $.ajax({url: URL, success: function(result){
        const uvIndex = result.value.toString()

        const uvIndexTxt = $("<p></p>").text(uvIndex)

        
        


        }
    })      
        //items that will be in current-weather div
}

});

