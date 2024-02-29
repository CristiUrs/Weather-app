const container = document.querySelector(".container");
const search = document.querySelector(".searchButton");
const weatherBox = document.querySelector(".weatherBox");
const weatherDetails = document.querySelector(".weatherDetails");
const input = document.querySelector(".searchInput");
const error = document.querySelector(".error");

search.addEventListener("click", () => {
    searchWeather();
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchWeather();
    }
});

function searchWeather() {
    const apiKey = "6d4a547d81440481f23f068bac0dc4c8";
    const city = input.value;

    if (city == "") return;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
        .then((response) => response.json())
        .then((json) => {
            if (json.cod == "404") {
                container.style.height = "500px";
                weatherBox.classList.remove("active");
                weatherDetails.classList.remove("active");
                error.classList.add("active");
                return;
            }

            container.style.height = "500px";
            weatherBox.classList.add("active");
            weatherDetails.classList.add("active");
            error.classList.remove("active");

            const image = document.querySelector(".weatherBox img");
            const temperature = document.querySelector(
                ".weatherBox .temperature"
            );
            const description = document.querySelector(
                ".weatherBox .description"
            );
            const min = document.querySelector(".minTemp");
            const max = document.querySelector(".maxTemp");
            const humidity = document.querySelector(
                ".weatherDetails .humidity span"
            );
            const wind = document.querySelector(".weatherDetails .wind span");

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "img/clear.png";
                    break;

                case "Rain":
                    image.src = "img/rain1.png";
                    break;

                case "Snow":
                    image.src = "img/snow.png";
                    break;

                case "Mist":
                    image.src = "img/mist.png";
                    break;

                default:
                    image.src = "img/cloud.png";
            }

            temperature.innerHTML = `${parseInt(
                json.main.temp
            )}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            min.innerHTML = `${parseInt(json.main.temp_min)}°C`;
            max.innerHTML = `${parseInt(json.main.temp_max)}°C`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        });
}
