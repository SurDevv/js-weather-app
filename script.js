document.addEventListener('DOMContentLoaded', function() {
    const weatherApp = document.getElementById('weatherApp');
    const temperatureDisplay = document.getElementById('temperature');
    const windSpeedDisplay = document.getElementById('windSpeed');
    const hourlyWeatherContainer = document.getElementById('hourlyWeather');

    const latitude = 52.52; // Szerokość geograficzna Warszawy
    const longitude = 21.00; // Długość geograficzna Warszawy

    function fetchWeather() {
        const apiUrl = 
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`
           + `&current=temperature_2m,wind_speed_10m&hourly=temperature_2m`
           +`,relative_humidity_2m,wind_speed_10m`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data.current);
                displayHourlyWeather(data.hourly);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    function displayCurrentWeather(currentData) {
        temperatureDisplay.textContent = currentData.temperature_2m;
        windSpeedDisplay.textContent = currentData.wind_speed_10m;
    }

    function displayHourlyWeather(hourlyData) {
        hourlyData.time.forEach((time, index) => {
            const weatherDetails = document.createElement('div');
            const temperature = hourlyData.temperature_2m[index];
            const humidity = hourlyData.relative_humidity_2m[index];
            const windSpeed = hourlyData.wind_speed_10m[index];
            
            weatherDetails.innerHTML = `
                <p>Czas: ${time}</p>
                <p>Temperatura: ${temperature}°C</p>
                <p>Wilgotność: ${humidity}%</p>
                <p>Prędkość wiatru: ${windSpeed} km/h</p>
            `;
            
            hourlyWeatherContainer.appendChild(weatherDetails);
        });
    }

    fetchWeather();
});
