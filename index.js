console.log("fear not i dey work");

const apiKey = "7bbf7271d3054627abf114903241408";
const apiUrl= "http://api.weatherapi.com/v1/current.json?";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
var weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + `key=${apiKey}&q=` + city + `&aqi=no`);
    if(response.status == 400){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();

    console.log(data.current.condition.text);
    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = data.current.temp_c + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + "km/h";

    if (data.current.condition.text === "Cloudy" || data.current.condition.text === "Partly cloudy") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.current.condition.text === "Sunny") {
        weatherIcon.src = "images/clear.png";
      } else if (data.current.condition.text === "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (["Light rain shower", "Light rain", "Heavy rain"].includes(data.current.condition.text)) {
        weatherIcon.src = "images/rain.png";
      } else if (["Patchy freezing drizzle possible", "Light drizzle", "Freezing drizzle", "Patchy light drizzle"].includes(data.current.condition.text)) {
        weatherIcon.src = "images/drizzle.png";
      } else if (["Light snow", "Blowing snow", "Heavy snow"].includes(data.current.condition.text)) {
        weatherIcon.src = "images/snow.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

