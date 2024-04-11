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

// Event listener for search button click
searchbtn.on("click", function() {
    var location = locationinput.val();

   // Function to display weather data with emojis
function displayWeatherData(data) {
    presentday.html(`<p>Temperature: ${data.main.temp}°F 🔥 - Wind Speed: ${data.wind.speed} MPH 🌬️ - Humidity: ${data.main.humidity}% 💧</p>`);

    for (let i = 0; i < forecastDays.length; i++) {
        forecastDays[i].html(`<p>Temperature: ${data.list[i*8+3].main.temp}°F 🔥 - Wind Speed: ${data.list[i*8+3].wind.speed} MPH 🌬️ - Humidity: ${data.list[i*8+3].main.humidity}% 💧</p>`);
    }
}
// Function to display the current date
function displayCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    $('#current-date').text(formattedDate);
}

// Display the current date when the page loads
displayCurrentDate();
// Fetch current weather data
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${myapikey}&units=imperial`)
.then(response => response.json())
.then(data => {
    console.log(data);
    displayWeatherData(data);
});

// Fetch forecast weather data
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${myapikey}&units=imperial`)
.then(response => response.json())
.then(data => {
    console.log(data);
    for (let i = 0; i < forecastDays.length; i++) {
        forecastDays[i].html(`<p>Temperature: ${data.list[i*8+3].main.temp}°F 🔥 - Wind Speed: ${data.list[i*8+3].wind.speed} MPH 🌬️ - Humidity: ${data.list[i*8+3].main.humidity}% 💧</p>`);
    }
});

    // Add current search to search history
    if (searchHistory.length >= 5) {
        searchHistory.pop(); // Remove oldest search if history length exceeds 5
    }
    searchHistory.unshift(location); // Add current search to the beginning of the history
    displaySearchHistory(); // Display updated search history
});

// Function to display search history
function displaySearchHistory() {
    var historyList = $("#search-history ul");
    historyList.empty(); // Clear previous history

    searchHistory.forEach((search, index) => {
        var listItem = $(`<li>${index + 1}. ${search}</li>`);
        listItem.on("click", function() {
            locationinput.val(search); // Set the search input value to the clicked item
            searchbtn.click(); // Trigger the search button click event
        });
        historyList.append(listItem);
    });
}