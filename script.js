window.onload = function () {
  document
    .getElementById("searchWeather")
    .addEventListener("click", function () {
      var city = document.getElementById("input").value;
      var apiKey = "9920008360e6212a01a59fd9eb579f46"; // Replace with your OpenWeather API key
      var weatherUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=metric";
      var forecastUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=metric";

      // Get current weather
      var xhrWeather = new XMLHttpRequest();
      xhrWeather.onreadystatechange = function () {
        if (xhrWeather.readyState == 4 && xhrWeather.status == 200) {
          var response = JSON.parse(xhrWeather.responseText);
          displayWeather(response);
        }
      };
      xhrWeather.open("GET", weatherUrl, true);
      xhrWeather.send();

      // Get forecast data
      var xhrForecast = new XMLHttpRequest();
      xhrForecast.onreadystatechange = function () {
        if (xhrForecast.readyState == 4 && xhrForecast.status == 200) {
          var response = JSON.parse(xhrForecast.responseText);
          displayForecast(response);
        }
      };
      xhrForecast.open("GET", forecastUrl, true);
      xhrForecast.send();
    });
};

function displayWeather(data) {
  document.getElementById(
    "city"
  ).innerHTML = `${data.name}, ${data.sys.country}`;
  document.getElementById(
    "img"
  ).src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  document.getElementById("temperature").innerHTML = `${data.main.temp} °C`;
  document.getElementById("clouds").innerHTML = data.weather[0].description;
}

function displayForecast(data) {
  var forecastList = data.list;
  var forecastDiv = document.querySelector(".weekF");
  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Clear existing forecast data
  forecastDiv.innerHTML = "";

  // Display next 4 days forecast
  for (var i = 0; i < 4; i++) {
    var date = new Date();
    date.setDate(date.getDate() + i);

    var dayOfWeek = weekdays[date.getDay()]; // Get the weekday
    var tempMin = forecastList[i].main.temp_min;
    var tempMax = forecastList[i].main.temp_max;
    var desc = forecastList[i].weather[0].description;
    var windSpeed = forecastList[i].wind.speed;
    var humidity = forecastList[i].main.humidity;

    var dayForecast = document.createElement("div");
    dayForecast.className = "dayF";
    dayForecast.innerHTML = `
      <p class="date">${dayOfWeek}, ${date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    })} ${date.getFullYear()}</p>
      <p>Temperature: ${tempMax} °C / ${tempMin} °C</p>
      <p>Description: ${desc}</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
      <p>Humidity: ${humidity}%</p>
    `;
    forecastDiv.appendChild(dayForecast);
  }
}
