const API_KEY = "00d11161c97a71f4f51e075dbe9b23ec";
const cityNameEl = document.getElementById("cityNameP");
const temperatureP = document.getElementById("temperatureP");
const humidityP = document.getElementById("humidityP");
const windSpeed = document.getElementById("windSpeed");
const lastCitiesEl = document.getElementById("lastCities");
const enterCityEl = document.getElementById("enterCity");
var clearBtn = document.getElementById("clearBtn");
var todaysDate = new Date().toLocaleDateString();
let searchedCities = [];



function renderCities() {
  lastCitiesEl.innerHTML = "";
  for (let i = 0; i < searchedCities.length; i++) {
    const city = searchedCities[i];
    const li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);
    li.addEventListener("click", function() {
      const city = searchedCities[this.getAttribute("data-index")];
      fetchWeatherData(city);
      forecastWeatherData(city);
    });
    lastCitiesEl.appendChild(li);
  }
}


function init() {
  const storedCities = JSON.parse(localStorage.getItem("searchedCities"));
  if (storedCities !== null) {
    searchedCities = storedCities;
    renderCities();
  }

  // Add click event listener to each city in recent searches list
  $("li").click(function () {
    const selectedCity = $(this).text();
    fetchWeatherData(selectedCity);
    forecastWeatherData(selectedCity);
  });
}

function storeCities() {
  localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}

function addCityToList(city) {
  searchedCities.push(city);
  renderCities();
  storeCities();
}



function fetchWeatherData(city) {
  const cityEntered = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  fetch(cityEntered)
    .then(response => response.json())
    .then(data => {
      var iconLoc = data.weather[0].icon;
      console.log(iconLoc);
      var iconSrc = '<img src="https://openweathermap.org/img/wn/' + iconLoc + '@2x.png">';
      cityNameEl.innerHTML = data.name + iconSrc + (" (") + todaysDate + (")");
      var k = data.main.temp;
      console.log(k);
      convertedTemp = Math.round(1.8 * (k - 273) + 32);
      temperatureP.innerHTML = `Local Temperature: ${convertedTemp} F `;
      humidityP.innerHTML = `Humidity: ${data.main.humidity} %`;
      windSpeed.innerHTML = `Wind Speed: ${data.wind.speed} MPH`;
      addCityToList(data.name);
    });

}


const forecastWeatherData = (city) => {
  const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

  fetch(forecastLink)
    .then(response => response.json())
    .then(data => {
      const list = data.list;
      console.log(data);
      //weather data for 5 days in 3-hour intervals, 40 data points, 8 data points per day times 5 days
      $("#babaVanga").empty();//.empty() ensuring old data is erased before adding new data
      for (let i = 39; i >= 0; i -= 8) { //weather data for 5 days in 3-hour intervals, 40 data points, 8 data points per day times 5 days
        const date = new Date(list[i].dt_txt);
        const iconId = list[i].weather[0].icon;
        const temp = ((list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2);
        
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const humidity = list[i].main.humidity;
        const formattedDate = `${month + 1}/${day}/${year}`;

        
        const col = $("<div>").addClass("col");
        const tile = $("<div>").addClass("card");
        col.append(tile);

        // Create a paragraph tag with the formatted date
        const p = $("<p>").text(formattedDate);

        // Create and store an image tag with the weather icon URL
        const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

        const icon = $("<img>").attr("src", iconUrl).css({ width: "100px", height: "100px" });

        // Create two paragraph tags with the temperature and humidity
        const tempText = $("<p>").text(`Temp: ${temp}°F`);
        const humidityText = $("<p>").text(`Humidity: ${humidity}%`);

        // Append the paragraph and image tags to tile
        tile.append(icon);
        tile.append(p);
        tile.append(tempText);
        tile.append(humidityText);

        // Prepend the col to the HTML page in the "#forecast" div
        $("#babaVanga").prepend(col);
      // }
    });
};

$(document).ready(function () {
  $("#submitBtn").click(function () {
    event.preventDefault();
    const inputData = enterCityEl.value;
    fetchWeatherData(inputData);
    forecastWeatherData(inputData);
  });
});


$(document).ready(function () {
  $("#clearBtn").click(function () {
    // Clear all items from local storage
    localStorage.clear();

    // Update the UI and store the empty array in local storage
    searchedCities = [];
    renderCities();
    storeCities();
  });

  init();
});
  //  const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q=${inputData}&appid=${API_KEY}`;
  // F = 1.8*(K-273) + 32.