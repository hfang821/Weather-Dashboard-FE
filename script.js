var cityInputEl = document.getElementById("cityname");
var searchEl = document.getElementById("user-search");
var cityNameEl = document.getElementById("city-name");
var timeEl = document.getElementById("currentTime");
var tempEl = document.querySelectorAll(".temp");
var windEl = document.querySelectorAll(".wind");
var humidEl = document.querySelectorAll(".humid");
var uvEl = document.getElementById("uv");
var forecastDateEl = document.querySelectorAll(".card-header");
var iconEl = document.querySelectorAll(".icon")

var current = moment().format('MMMM Do YYYY');


timeEl.innerHTML = current;

var formSubmitHandler = function(event) {

    event.preventDefault();

    //get value from the input element
    var cityName = cityInputEl.value.trim();

    for (let i=0; i<cities.length; i++){
        if(cityName===cities[i].name) {
            getWeather(cities[i].longitude, cities[i].latitude);
        }
    }

};

var getWeather = function(long,lat){
    //free api key access
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=metric&appid=d77806a04cfe031f507dca0e8c06c09f";

    fetch(apiUrl).then(function(response) {
        if(response.ok){
            response.json().then(function(data){
                displayWeather(data);
            });
        } else {
            alert('Please enter the correct city name.');
        }
    });
};

var displayWeather = function(weatherInfo) {
    console.log(weatherInfo);
    //current weather data
    cityNameEl.textContent = cityInputEl.value.trim();
    uvEl.textContent = "UV Index: " + weatherInfo.current.uvi;

    //5-day forecast data
    for(let i=0; i<forecastDateEl.length; i++){
        forecastDateEl[i].innerHTML= moment().add(i+1, 'days').format('MM/D/YYYY');
    }
   
    for(let i=0; i<iconEl.length; i++){
    //display icons for the weather
        iconEl[i].src = "http://openweathermap.org/img/wn/"+ weatherInfo.daily[i].weather[0].icon + ".png"; 
        tempEl[i].textContent = "Temp: " + weatherInfo.daily[i].temp.day + " ° C";
        windEl[i].textContent = "Wind: " + weatherInfo.daily[i].wind_speed + " m/s";
        humidEl[i].textContent = "Humidity: " + weatherInfo.daily[i].humidity + " %";
    }

}


searchEl.addEventListener("submit", formSubmitHandler);
