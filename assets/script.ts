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

// const getCurrentWeather = (cityName: string) => {

//     const URL = "https:api.openweathermap.org/data/2.5/weather?q=riverside&appid=eb24ebd17a4375e8ec365a3eba5592a2";

//     $.ajax({url: URL, success: function(result){
//         console.log(result)
//       }});

// };

const currentWeather = (cityName: string) => {

    const URL = `https:api.openweathermap.org/data/2.5/weather?q=${cityName}&&appid=eb24ebd17a4375e8ec365a3eba5592a2`

    $.ajax({url: URL, success: function(result){
        //items that will be in current-weather div
        console.log(result)

        const weatherItems = {
            city: cityName,
            humidity: result.main.humidity,
            windSpeed: result.wind.speed
        }

        displayWeather(weatherItems)

      }});
}

const displayWeather = ( items: {city:string, humidity: number, windSpeed: number}) => {
    
    const h2 = $("<h2>").append(items.city)
     $("#current-weather").html(h2)
    

}

});

