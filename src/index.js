
setTimeout(() => {
    var sakura = new Sakura('body', {
        delay: 200,
        fallSpeed: 2,
    });
}, 1000);  

function changeTemp (response) { 
    
   let tempElement = document.querySelector("#temp-number"); 
 let responseData = response.data.temperature.current;
   tempElement.innerHTML = ` ${Math.round(responseData)}` ;
   let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.city;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCity);

searchCity("Tokyo");