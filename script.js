var myapikey = "298b33f1789289df9d8c65b137558d8a";
var locationinput = $("#location");
var searchbtn = $("#search");
var presentday = $("#current-day");
var firstday = $("#day-one");
var secondday = $("#day-two");
var thirdday = $("#day-three");
var forthday = $("#day-four");
var fifthday = $("#day-five");
var forecastDays = [firstday, secondday, thirdday, forthday, fifthday];
var searchHistory = [];

// Function to display search history
function displaySearchHistory() {
    var historyList = $("#search-history");
    historyList.empty(); // Clear previous history

    searchHistory.forEach((search, index) => {
        historyList.append(`<li>${index + 1}. ${search}</li>`);
    });
}

// Event listener for search button click
searchbtn.on("click", function() {
    var location = locationinput.val();

    // Fetch current weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${myapikey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        presentday.html(`<p>${data.name} - Temp:${data.main.temp}°F - ${data.wind.speed} MPH</p>`);
    });

    // Fetch forecast weather data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${myapikey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (let i = 0; i < forecastDays.length; i++) {
            forecastDays[i].html(`<p>${data.city.name} - Temp:${data.list[i*8+3].main.temp}°F - Wind:${data.list[i*8+3].wind.speed} MPH</p>`);
        }
    });

    // Add current search to search history
    if (searchHistory.length >= 5) {
        searchHistory.pop(); // Remove oldest search if history length exceeds 5
    }
    searchHistory.unshift(location); // Add current search to the beginning of the history
    displaySearchHistory(); // Display updated search history
});
