var cityInputEl = document.getElementById("cityname");
var searchEl = document.getElementById("user-search");

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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=d77806a04cfe031f507dca0e8c06c09f";
    console.log(lat);
    console.log(long);
    fetch(apiUrl).then(function(response) {
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
            });
        } else {
            alert('Please enter the correct city name.');
        }
    });
};

var displayWeather = function() {

}


searchEl.addEventListener("submit", formSubmitHandler);
