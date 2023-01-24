window.addEventListener("load", () => {
    weather.fetchWeather(window.localStorage.getItem("name"))
});

let dayTime = document.querySelector(".day-time");

let now = new Date();

let weather = {
    "apiKey": "c512641495c6c473f5ca6b6f315213db",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city + 
        "&units=metric&appid="
        + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, humidity, pressure, temp_max, temp_min, feels_like } = data.main;
        const { speed } = data.wind;
        switch (now.getDay()) {
            case 0:
                dayTime.innerText = `Sunday, ${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}`
                break;
            case 1:
                dayTime.innerText = `Monday, ${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}`
                break;
            case 2:
                dayTime.innerText = `Tuesday, ${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}` 
                break;
            case 3:
                dayTime.innerText = `Wednesday, ${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}`
                break;
            case 4:
                dayTime.innerText = `Thursday, ${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}`
                break;
            case 5:
                dayTime.innerText = `Friday, ${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}`
                break;
            case 6:
                dayTime.innerText = `Saturday, ${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}`
                break;
        }
        document.querySelector(".wiki").innerText = `${name}, ${country}`;
        document.querySelector(".wiki").href = "https://en.wikipedia.org/wiki/" + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')"
        document.querySelector(".air").innerText = `Air Pressure: ${pressure} mb`;
        document.querySelector(".max").innerText = `Max Temp: ${temp_max}°C`;
        document.querySelector(".min").innerText = `Min Temp: ${temp_min}°C`;
        document.querySelector(".feel").innerText = `Feels Like: ${feels_like}°C`;
    },
    search: function() {
        this.fetchWeather(document.querySelector(".searchBar").value)
        window.localStorage.setItem("name", document.querySelector(".searchBar").value)
    }    
}

document.querySelector(".searchBtn").addEventListener("click", function () {
    weather.search()
})

document.querySelector(".searchBar").addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
        weather.search()
    }
})
