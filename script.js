const apiKey = "010dd9f4252c94d35f27f100aafdd2f1";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");
const celsiusBtn = document.getElementById("celsiusBtn");
const fahrenheitBtn = document.getElementById("fahrenheitBtn");

let unit = "metric";
let lastCity = "";

searchBtn.addEventListener("click", function () {
  getWeather();
});

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

celsiusBtn.addEventListener("click", function () {
  unit = "metric";
  celsiusBtn.classList.add("active");
  fahrenheitBtn.classList.remove("active");
  if (lastCity !== "") getWeather(lastCity);
});

fahrenheitBtn.addEventListener("click", function () {
  unit = "imperial";
  fahrenheitBtn.classList.add("active");
  celsiusBtn.classList.remove("active");
  if (lastCity !== "") getWeather(lastCity);
});

async function getWeather(cityName) {
  const city = cityName || cityInput.value.trim();

  if (city === "") {
    result.innerHTML = "<p class='error'>Please enter a city.</p>";
    return;
  }

  lastCity = city;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      result.innerHTML = "<p class='error'>City not found.</p>";
      return;
    }

    const data = await response.json();

    const name = data.name;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;

    const symbol = unit === "metric" ? "°C" : "°F";

    result.innerHTML = `
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
      <h1>${temp}${symbol}</h1>
      <p>${description}</p>
      <p>Humidity: ${humidity}%</p>
    `;
  } catch (error) {
    result.innerHTML = "<p class='error'>Something went wrong. Try again.</p>";
  }
}