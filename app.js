let toggleModeBtn = document.getElementById("toggleModeBtn");
let input = document.getElementsByClassName("in")[0];
let button = document.getElementById("btn");
let weatherIcon = document.getElementsByClassName("icon")[0];
let cityName = document.getElementById("city");
let dateElement = document.getElementsByClassName("date")[0];
let temperature = document.getElementsByClassName("temperature")[0];
let weather = document.getElementsByClassName("weath")[0];
let humidity = document.getElementsByClassName("humidity")[0];
let error = document.querySelector(".error");
let body = document.querySelector("body");

const getTemperature = (cityname) => {
    const promise = fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=Metric&appid=2aac4db8c572652979de802f004c42fb`
    );

    promise
        .then((response) => {
            if (!response.ok) {
                error.style.display = "block";
                document.querySelector(".weatherInfo").style.display = "none";
            } else return response.json();
        })
        .then((response) => {
            const { main } = response;
            const { description } = response;
            cityName.innerText = cityname;
            updateClock();
            temperature.innerText = main.feels_like + " \u00B0" + "C";
            humidity.innerText = "Humidity: " + main.humidity + " %";
            weather.innerText = description;

            const weatherCondition = response.weather[0].main;
            if (weatherCondition === "Clear") {
                weather.innerText = "It's sunny!";
                weatherIcon.src = "sunny-removebg-preview.png";
            } else if (weatherCondition === "Clouds") {
                weather.innerText = "It's cloudy!";
                weatherIcon.src = "clouds-removebg-preview.png";
            } else if (weatherCondition === "Rain") {
                weather.innerText = "It's Rainy!";
                weatherIcon.src = "rainy-removebg-preview.png";
            } else if (weatherCondition === "Mist") {
                weather.innerText = "It's Misty!";
                weatherIcon.src = "bolt-removebg-preview.png";
            } else {
                weather.innerText = "Weather condition: not available";
            }
        })
        .catch((error) => {
            console.log(error);
        });

    error.style.display = "none";
    document.querySelector(".weatherInfo").style.display = "block";
};

toggleModeBtn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
});

function updateClock() {
    let currentDate = new Date();
    let date = currentDate.toDateString().slice(0, 15);
    dateElement.innerText = date;
}

button.addEventListener("click", function (e) {
    e.preventDefault();
    let cityName = input.value;
    getTemperature(cityName);
});