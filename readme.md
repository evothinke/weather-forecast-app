<h1>Weather Forecast</h1>
 <br>
<a href="https://evothinke.github.io/weather-forecast-app/" target="_blank">Deployed website</a> <br>

<a href="https://github.com/evothinke/weather-forecast-app" target="_blank">Github Repository</a>
<br><br>

<h2>The Goal:</h2>

Create a weather forecasting app what shows the current weather in a specific city entered by the user as well as a 5-day forecast.
The entries are logged into the localStorage and showed in a list. Each element has to be clickable so that, when clicked, the page updates with the new city data.

<h2>The Process:</h2>

First I started by breaking down the functionality of the app, so I can understand what variables to declare, what functions to create and what conditions to write.
The app uses 2 weather APIs to fetch data depending on the user input. One for live weather and the other for a 5-day forecast.
The cities are included in an array, saved on the localStorage then showed in a list. 


As you can see, the fetchWeatherData() function is used to fetch weather data for a specified city from the OpenWeatherMap API depending on the user input. We take a city parameter as input, which is used to build a URL for the API call using an API key (API_KEY). We pass the URL to the fetch() method, which sends an HTTP request to the API and returns a Promise that resolves to a Response object. In the first .then() callback, the response is checked to see if it is valid using the response.ok property. If the response is not valid, an error is thrown with a message indicating that an invalid city was entered and viceversa, if the response is valid, the response body is extracted in JSON format using the response.json() method, which returns another Promise that resolves to the JSON data. In the second .then() callback, the JSON data is parsed and used to display the current weather for the specified city on a web page. The city name, weather icon, and date are displayed using HTML, and the temperature, humidity, and wind speed are displayed as text. The function also calls the addCityToList() function to add the city to a list of previously searched cities.

If the user enters an invalid city name resulting in the API giving an error, it is caught in the .catch() callback, which logs the error to the console and displays an alert to the user indicating that an invalid city was entered.



Now for the second fetch:
 We are using the function forecastWeatherData to take the city parameter just like in the previous function.
Once we receive the response, the function parses the JSON data and extracts the necessary information to display the weather forecast for the next 5 days in 3-hour intervals.

It then clears any existing data from the #babaVanga element using the empty() method and creates a card for each day's weather forecast.
For each card, it extracts the necessary weather information such as the date, weather icon, temperature, and humidity, and creates HTML elements to display this information in the card.

Finally, it prepends the card to the #babaVanga element, which displays the weather forecast on the page.


<h2>Interesting facts:</h2>


- It took me a while to understand how to manipulate data from the fetch response... especially for the 5 day forecast. We are using 3-hour intervals because that's how the OpenWeatherMap API provides us the info. We can get weather information for multiple points in time throughout the day. In this code, we are using this data to display the weather forecast for the next 5 days, with 8 data points per day, which corresponds to a total of 40 data points.

- Baba Vanga was a famous Bulgarian soothsayer. She could forecast the weather and predict the future. It is believed that she was able to predict weather changes/natural disasters, wars and even some pandemics. 

![screenshot of the project](./images/1.png?raw=true "Project Screenshot")

![screenshot of the project](./images/2.png?raw=true "Project Screenshot")
![screenshot of the project](./images/3.png?raw=true "Project Screenshot")