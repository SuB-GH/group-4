// Form info capture
var citySearchEl = document.querySelector("#city-search");
var cityHistoryEl = document.querySelector(".city-history")
var cityNameEl = document.querySelector("#city-name");
var spacePicEl = document.querySelector(".space-pic");
var cityNameHistory = [];
var cityName

//get daily space pic
var spacePic = function () {
    var apodApi = "https://api.nasa.gov/planetary/apod?api_key=4f45z6DWkT3kechMmIC6j67dikmCTKC67zr0ZRYS";
    fetch(apodApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                displaySpacePic(data);
            });
        }
    });
};

var displaySpacePic = function(data){
//Pic Title
var spacePicTitle = document.createElement("h3");
spacePicTitle.className = "has-text-weight-bold"
var picTitle = data.title;
spacePicTitle.textContent = picTitle;
spacePicEl.appendChild(spacePicTitle);

//pic
var spacePicture = document.createElement("img");
spacePicture.className = "block";
spacePicture.src = data.url;
spacePicEl.appendChild(spacePicture);


//Pic Explanation
var picExpl = document.createElement("p");
var spacePicEx = data.explanation;
picExpl.textContent = spacePicEx;
spacePicEl.appendChild(picExpl);

};

//get the weather for a city
var getWeatherData = function (issLat, issLon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + issLat + "&lon=" + issLon + "&units=imperial&appid=386d421121bbbad42dc1ad82319e7fc0";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // console.log(data);
                //console.log(data.daily[0].clouds, "Clouds");
                //console.log(data.daily[0].rain, "Rain");
                //console.log(data.daily[0].weather[0].description, "Description");
                //console.log(data.hourly[0]);
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
                //console.log(data);

                // Lat & Lon variables:
                newLat = data[0].lat;
                newLon = data[0].lon;
                getISS(newLat, newLon);
                getWeatherData(newLat, newLon);
                spacePic();
            })
        }
    })
};

// API call for ISS position
var getISS = function (newLat, newLon) {
    // API url
    // NOAA 15 fetch request

    var issRequestUrl = "https://api.g7vrd.co.uk/v1/satellite-passes/25338/" + newLat + "/" + newLon + ".json";

    fetch(issRequestUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data.satellite_name);
                //console.log(data.lat, "Lat");
                //console.log(data.lon, "Lon");
                issLat = data.latitude;
                issLon = data.longitude;
                for (var i = 0; i < data.passes.length; i++) {
                    // console.log(data.passes[i]);
                    passStartNOAA = data.passes[i].start;
                    // console.log(passStartNOAA);
                    datePassStartNOAA = passStartNOAA.split("T");
                    console.log(datePassStartNOAA, "Date", "Time");
                }
            })
        }
    })



    // ISS fetch request
    var issRequestUrl = "https://api.g7vrd.co.uk/v1/satellite-passes/25544/" + newLat + "/" + newLon + ".json";
    fetch(issRequestUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data.satellite_name);
                for (var i = 0; i < data.passes.length; i++) {
                    // console.log(data.passes[i]);
                    passStartISS = data.passes[i].start;
                    // console.log(passStartISS);
                    datePassStartISS = passStartISS.split("T");
                    console.log(datePassStartISS, "Date", "Time");
                }
            })
        }
    })
};



// getWeatherData();
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
        saveCityIss();

        cityNameEl.value = "";
    }
};

var saveCityIss = function () {
    var saveCity = document.querySelector("#city-name").value;
    console.log(saveCity);
    if (localStorage.getItem("city") == null) {
        localStorage.setItem("city", "[]")
    }
    var pastCity = JSON.parse(localStorage.getItem("city"))
    pastCity.push(saveCity);
    localStorage.setItem("city", JSON.stringify(pastCity));

var saveButton = document.createElement("button");
saveButton.className = "button is-info is-outlined"
saveButton.classList.add("save-btn");
saveButton.textContent = saveCity
cityHistoryEl.appendChild(saveButton);
saveButton.onclick = clickButton
};

function clickButton(event) {
    event.preventDefault;
    var cityClicked = event.target
    //currentCity.textContent = ""
    getCityLocation(cityClicked.textContent);
};
// Event listener
citySearchEl.addEventListener("submit", formSubmitHandler);