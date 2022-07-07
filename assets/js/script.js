// Form info capture
var citySearchEl = document.querySelector("#city-search");
var cityNameEl = document.querySelector("#city-name");
var cityNameHistory = [];
var cityName 

//get the weather for a city
var getWeatherData = function(newLat, newLon, city){
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + newLat + "&lon=" + newLon + "&units=imperial&appid=386d421121bbbad42dc1ad82319e7fc0";
fetch(apiUrl).then(function(response){
    if(response.ok){
        response.json().then(function (data){
            console.log(data);
        });
    }
});
};
// find Lat / Lon from city input
var getCity = function (city) {
    // insert API url
    var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=386d421121bbbad42dc1ad82319e7fc0";
    // console.log("testing");
    fetch(requestUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                
                // Lat & Lon variables:
                newLat = data[0].lat;
                newLon = data[0].lon;
                getWeatherData (newLat, newLon);
                // may need city also?
            })
        }
    })
};


// Form submission
var formSubmitHandler = function (event) {
    event.preventDefault();
    // console.log(event);
    // get value from input element
    var cityName = cityNameEl.value.trim();
    // cityNameHistory.push(cityName);
if (cityName) {


    // call getCity function
getCity(cityName);

    cityNameEl.value = "";
}
};

// Event listener
citySearchEl.addEventListener("submit", formSubmitHandler);