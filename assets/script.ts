// import moment = require('moment');


$(document).ready(() => {

const modal = $("#myModal")
   
//GET THE VALUE OF INPUT BOX

$('#search-input').keypress(function(e){
    if(e.which == 13){//Enter key pressed
        $("#search-btn").click()
    }
});
 
$("#search-btn").click(() => {

    const cityName = $("#search-input").val() as string
    //Use Regex to replace white space in string
    cityName.replace(/\s/g, "")

    //Create Div element
    const div = $("<div class='city-name'>")
    const city = div.append(cityName)
    //append city to the aside div in grid
    $(".past-city").append(city)

    currentWeather(cityName);
    forecast(cityName)

})

const currentWeather = (cityName: string) => {

   const URL = `https:api.openweathermap.org/data/2.5/weather?q=${cityName}&&appid=eb24ebd17a4375e8ec365a3eba5592a2`
    

    $.ajax({url: URL, success: function(result){
        console.log(result)
        //items that will be in current-weather div
        const weatherItems = {
            temp: result.main.temp,
            city: cityName,
            humidity: result.main.humidity,
            windSpeed: result.wind.speed
        }

        displayWeather(weatherItems)
        getUvIndex(result.coord)

      },error: function(status){
         displayModal()
         $('.past-city').children().last().remove()
      }
    });
}

const getWeatherIcon = (id: number) => {
    if(id >= 800){
        return 'http://openweathermap.org/img/w/01d.png'
    }else if(id <= 781 || id >= 701){
        return 'http://openweathermap.org/img/w/50d.png'
    }else if(id <= 622 || id >= 601){
        return 'http://openweathermap.org/img/w/13d.png'
    }else if(id <= 531 || id >= 520){
        return 'http://openweathermap.org/img/w/09d.png'
    }else if(id <= 504 || id >= 500){
        return 'http://openweathermap.org/img/w/10d.png'
    }else if(id <= 321 || id >= 300){
        return 'http://openweathermap.org/img/w/09d.png'
    }else if(id <= 232 || id >= 200){
        return 'http://openweathermap.org/img/w/11d.png'
    } else if(id === 511){
        return 'http://openweathermap.org/img/w/13d.png'
    }
}

const displayWeather = ( items: {city:string, humidity: number, windSpeed: number, temp: number}) => {
    
    //Replace everythin inside of current weather div

    $("#current-weather").empty()
    //Display the current city in current weather box
    const h2: JQuery<HTMLElement> = $("<h2 class='city'>") 
    const city : JQuery<HTMLElement> = h2.append(items.city.toUpperCase() + ": " +  moment().format('LL')) 
    $("#current-weather").append(city)



    const temp = Math.floor(1.8 * (items.temp - 273) + 32).toString();
    const wind = items.windSpeed.toString();
    const hdty = items.humidity.toString()

    const tempTxt = $("<p></p>").text("Temp: " + temp+String.fromCharCode(176))
    const windTxt = $("<p></p>").text("Wind Speed: " + wind)
    const humidityTxt = $("<p></p>").text("Humidity: " + hdty)

    $("#current-weather").append(tempTxt)
    $("#current-weather").append(windTxt)
    $("#current-weather").append(humidityTxt)
}

const forecast = (cityName: string) => {
    
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&&appid=eb24ebd17a4375e8ec365a3eba5592a2`



    $.ajax({url: URL, success: function(result){

        //Clear all of the content from previous searches
        $("#forecast-card-container").empty()

        const foreCastData = result.list
        console.log(result)

        //A array full of objects that will hold forecasted data
        const foreCast = [];

        let temp : string;
        let humidity : string;

        //Gets afternoon data for the next 5 days
        for(let i = 2; i <= foreCastData.length; i = i + 8){
            foreCast.push(foreCastData[i])
        }

        for(let j = 0; j < foreCast.length; j++){

            const weatherCont = $("#forecast-card-container")
            const weatherCard = $("<div class='weather-card'>");
            const day = moment(foreCast[j].dt_txt.split(" ")[0]).format('dddd')
            

            //Gets the value for temp while also converting Kelvin to Faren
             temp = Math.floor(1.8 * (foreCast[j].main.temp - 273) + 32).toString();
             humidity = foreCast[j].main.humidity.toString()
            
             const weatherImg = $("<img />").attr('src',getWeatherIcon(foreCast[j].weather[0].id))
             const dayTxt = $("<h4></h4>").text(day)
             const tempTxt = $("<p></p>").text("Temp: " + temp+String.fromCharCode(176))
             const humidTxt = $("<p></p>").text("Humidity: " + humidity + "%")

             weatherCard.append(weatherImg)
             weatherCard.append(dayTxt)
             weatherCard.append(tempTxt)
             weatherCard.append(humidTxt)
             weatherCont.append(weatherCard)
            
        }
       }
    })
}

const getUvIndex = (coordinates: {lat:number, lon: number}) => {
    
    const lat = coordinates.lat.toString()
    const lon = coordinates.lat.toString()

    const URL = `https://api.openweathermap.org/data/2.5/uvi?&appid=eb24ebd17a4375e8ec365a3eba5592a2&lat=${coordinates.lat}&lon=${coordinates.lat}`;

    $.ajax({url: URL, success: function(result){

        const uvIndex = Math.round(result.value)

        const uvIndexTxt = $("<span></span>")
        uvIndexTxt.addClass("uv-index")

//Applies appropriate classes based on the intensity of the UV rays.
        if(uvIndex => 11) {
            uvIndexTxt.addClass("extreme");
            uvIndexTxt.text("UV Index: " + uvIndex + " (Extreme Risk)");
        }else if(uvIndex >= 8 ){
            uvIndexTxt.addClass("v-high");
            uvIndexTxt.text("UV Index: " + uvIndex + " (Very High Risk)");
        }else if(uvIndex >= 6 ){
            uvIndexTxt.addClass("high");
            uvIndexTxt.text("UV Index: " + uvIndex + " (High Risk)");
        }else if(uvIndex >= 3 ){
            uvIndexTxt.addClass("moderate");
            uvIndexTxt.text("UV Index: " + uvIndex + " (Moderate Risk)");
        }else if(uvIndex >= 0 ){
            uvIndexTxt.addClass("low");
            uvIndexTxt.text("UV Index: " + uvIndex + " (Low Risk)");
        }
        $("#current-weather").append(uvIndexTxt)

        }
    })      
}

const displayModal = () => {

    modal.show()

}

//Gets rid of Modal 

$(this).on("click", (e) => {
    if(modal.show()){
    
        modal.hide()
    }
})


});
