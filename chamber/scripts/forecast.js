const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=24.02&lon=-104.66&units=metric&appid=04dc27b91cf5b503dc18e8f2d4791d69`;

async function getForecast(forecastUrl) {
    try {
        const response = await fetch(forecastUrl);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (!data.list || data.list.length < 24) {
            throw new Error("Forecast data unavailable");
        }

        displayForecast(data);

    } catch (error) {
        console.error("Forecast error:", error);
    }
}

function displayForecast(data) {
    const forecastList = document.querySelector("#forecast");
    forecastList.innerHTML = "";

    const forecastDays = [8, 16, 24];

    forecastDays.forEach(index => {
        const dayData = data.list[index];
        if (!dayData) return;

        const date = new Date(dayData.dt_txt);

        const li = document.createElement("li");
        li.textContent = `${date.toLocaleDateString("en-US", {
            weekday: "long"
        })}: ${Math.round(dayData.main.temp)} °C`;

        forecastList.appendChild(li);
    });
}

getForecast(forecastUrl);