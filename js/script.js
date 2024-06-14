document.getElementById('submit').addEventListener('click', function() {
    const location = document.getElementById('search').value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const apiKey = '095cc8d8c28e4de4967200558241306';
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError();
        });
}

function displayWeather(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = `
        <h2 class="text-center w-100">${data.location.name}, ${data.location.country}</h2>
        <div class="d-flex justify-content-center w-100">
            ${data.forecast.forecastday.map(day => `
                <div class="forecast-card mx-3">
                    <h3>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
                    <p>Max: ${day.day.maxtemp_c}°C</p>
                    <p>Min: ${day.day.mintemp_c}°C</p>
                    <p>${day.day.condition.text}</p>
                    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                </div>
            `).join('')}
        </div>
    `;
}

function displayError() {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = `
        <h2 class="text-center">Error fetching weather data. Please try again later.</h2>
    `;
}
