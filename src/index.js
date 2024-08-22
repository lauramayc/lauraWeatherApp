
setTimeout(() => {
    var sakura = new Sakura('body', {
        delay: 200,
        fallSpeed: 2,
    });
}, 1000);   


function changeCity(event) { 
    event.preventDefault(); 
    let searchInput = document.querySelector("#search-form-input"); 
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCity);