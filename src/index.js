
setTimeout(() => {
    var sakura = new Sakura('body', {
        delay: 200,
        fallSpeed: 2,
    });
}, 1000);  

function changeTemp (response) { 

//date 
let date = new Date(response.data.time * 1000);
function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${day} ${hours}:${minutes}`;
}


    //temperature number
   let tempElement = document.querySelector("#temp-number"); 
 let responseData = response.data.temperature.current;
   tempElement.innerHTML = ` ${Math.round(responseData)}` ;
   
  //city name
   let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.city;



//weather description 
let weatherDetails = document.querySelector("h2");
let weatherDetailResponse = ` ${formatDate(date)} , ${response.data.condition.description} <br> Humidity: <b> ${response.data.temperature.humidity} </b>, wind : <b> ${response.data.wind.speed} </b> Km/h` ;
weatherDetails.innerHTML = weatherDetailResponse;

//image 
let emojiElement = document.querySelector("#emoji");
let emojiChange = ` <img src=" ${response.data.condition.icon_url}" >` 
emojiElement.innerHTML = emojiChange;

getForecast(response.data.city);
}




function searchCity(city) { 
    let apiKey = `a6ee8503c8fee7b4f4c3ocbtac96961d`
   let url =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(url) .then(changeTemp);
}

function changeCity(event) {    
    event.preventDefault(); 
    let searchInput = document.querySelector("#search-form-input"); 
    let cityElement = document.querySelector("#city");
   
    searchCity(searchInput.value);
   
}

//used to get day 
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}


function getForecast(city) {
  let apiKey = `a6ee8503c8fee7b4f4c3ocbtac96961d`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast); 
}

function displayForecast(response) {

  let forecastHtml = "";

 

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
      `
            <div class="day">
                <div class="weeklyDay"> ${formatDay(day.time)} </div>
                <div class="weeklyIcon"> <img
                        src="${day.condition.icon_url}"> </div>
                <div class="weeklyTemp"> <b>${Math.round(day.temperature.maximum)}ºc /</b> ${Math.round(
                  day.temperature.minimum
                )}ºc </div>
            </div>
    `;
  }
});

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}





//search form start of code 
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCity);

searchCity("Tokyo");