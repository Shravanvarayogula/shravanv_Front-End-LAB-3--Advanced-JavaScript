const api = {
    key : "88a9a2a93ce2929f9fe55a9f9b52917d",
    base: "http://api.openweathermap.org/data/2.5/"
}

const searchkey = document.querySelector('.search-city');
searchkey.addEventListener('keypress',setSearchQuery);

function setSearchQuery (e) {
    if(e.keyCode == 13) {
        getSearchResult(searchkey.value);
    }
}

function getSearchResult(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    })
    .then((response) => {
       // console.log(response);
        updateDisplayElements(response)
    });
}

function updateDisplayElements(params) {
    let city = document.querySelector('.location .city');
    city.innerText = `${params.name}, ${params.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.location .date-time');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current-weather .temp');
    temp.innerHTML = `${Math.round(params.main.temp)}<span> °c <span>` ;

    let weather_ele = document.querySelector('.current-weather .weather');
    weather_ele.innerText = params.weather[0].main;

    let hi_low = document.querySelector('.hi-low');
    hi_low.innerText = `${Math.round(params.main.temp_min)} °c / ${Math.round(params.main.temp_max)} °c`;

}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
  


