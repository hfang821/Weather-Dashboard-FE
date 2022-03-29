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
var btnEl = document.querySelector("#citybtns");

var current = moment().format('MMMM Do YYYY');


timeEl.innerHTML = "  (" + current + ")";

var formSubmitHandler = function(event) {

    event.preventDefault();

    //get value from the input element
    var cityName = cityInputEl.value.trim().toLowerCase();

    for (let i=0; i<cities.length; i++){
        if(cityName===cities[i].name) {
            getWeather(cities[i].longitude, cities[i].latitude, cityName);
        }
    }

};

var getWeather = function(long,lat,name){
    //free api key access
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=metric&appid=d77806a04cfe031f507dca0e8c06c09f";

    fetch(apiUrl).then(function(response) {
        if(response.ok){
            response.json().then(function(data){
                displayWeather(data,name);
            });
        } else {
            alert('Please enter the correct city name.');
        }
    });
};

var displayWeather = function(weatherInfo, city) {
    console.log(weatherInfo);
    //current weather data
    cityNameEl.textContent = city.charAt(0).toUpperCase() + city.slice(1);
    if(weatherInfo.current.uvi<2) {
        uvEl.textContent = "UV Index: " + weatherInfo.current.uvi;
        uvEl.classList.add('favorable');
    } else if (weatherInfo.current.uvi<5) {
        uvEl.textContent = "UV Index: " + weatherInfo.current.uvi;
        uvEl.classList.add('moderate');
    } else {
        uvEl.textContent = "UV Index: " + weatherInfo.current.uvi;
        uvEl.classList.add('severe');
    }
   

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

var buttonClickHandler = function(event) {
    var cityName = event.target.getAttribute("city-name");

    //check if the user hits the button
    if(cityName){
    //check the lat and long for the city
    for (let i=0; i<cities.length; i++){
        if(cityName===cities[i].name) {
            getWeather(cities[i].longitude, cities[i].latitude, cityName);

            //Ask TA: how do I make the input text disappear?
        }
    }
    //pass the lat and long to the getWeather function
    }
}


searchEl.addEventListener("submit", formSubmitHandler);
btnEl.addEventListener("click", buttonClickHandler);
