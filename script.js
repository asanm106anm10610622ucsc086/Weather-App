const apiKey = "e8cdf0be948d4ccaa509c808cacea868"; // Replace with your API key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p style="color: red;">${error.message}</p>`;
        document.getElementById("weatherResult").style.display = "block";
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById("weatherResult");
    const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${weatherIcon}" alt="Weather icon">
        <p class="weather-info">${data.weather[0].description}</p>
        <p class="weather-info">Temperature: ${data.main.temp}°C</p>
        <p class="weather-info">Humidity: ${data.main.humidity}%</p>
    `;
    weatherResult.style.display = "block";
}
