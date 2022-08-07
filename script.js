function currentDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

let currentTime = document.querySelector("#current-time");
let now = new Date();
currentTime.innerHTML = currentDate(now);

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("h2").innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "1ddb506ff016b81ba5c2f0c4b7adf1af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function addCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-input").value;
  searchCity(city);
}

let form = document.querySelector("#form-input");
form.addEventListener("submit", addCity);

// function convertToCelsius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("h2");
//   temperatureElement.innerHTML = 19;
// }

// let celsiusLink = document.querySelector("#celsius");
// celsiusLink.addEventListener("click", convertToCelsius);
function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheittemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = Math.round(fahrenheittemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("Berdiansk");
