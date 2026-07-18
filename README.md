# 🌤️ Weather App

A simple front-end Weather App built with **HTML, CSS, and JavaScript**. It fetches live weather data from the OpenWeatherMap API based on a city name or the user's current location.

## Features

- 🔍 Search weather by city name
- 🌡️ Displays temperature, humidity, "feels like" temperature, and wind speed
- 🌤️ Weather condition shown with a matching icon (☀️ Sunny, 🌧️ Rainy, ☁️ Cloudy, ❄️ Snow, ⛈️ Storm, 🌫️ Mist/Fog)
- ⚠️ Error handling for invalid or misspelled city names
- 📍 Bonus: Detects user's current location using the Geolocation API
- 🎨 Bonus: Background gradient changes dynamically based on current weather conditions

## Concepts Practiced

- Fetching data from a REST API using `fetch()`
- Handling and parsing JSON responses
- Updating the DOM dynamically based on API data
- Basic error handling with `try / catch`
- Using the browser's Geolocation API

## Project Structure

```
weather-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Setup Instructions

This project requires a free API key from OpenWeatherMap to run.

1. Sign up for a free account at [openweathermap.org/api](https://openweathermap.org/api)
2. Go to the **API keys** tab and copy your default key (may take up to a couple of hours to activate)
3. Open `script.js` and replace the placeholder:
   ```js
   const API_KEY = "YOUR_API_KEY_HERE";
   ```
   with your actual key
4. Open `index.html` in your browser — using **VS Code Live Server** is recommended, since some browsers restrict `fetch()` calls made directly from a local file (`file://`)

## Notes

- The API key has been intentionally left out of this repository as a security best practice. Since this is a front-end-only project, the key cannot be fully hidden once deployed — see the setup steps above to add your own key locally.
- The free OpenWeatherMap tier used here requires no credit card and comfortably covers the needs of this project (60 calls/minute, up to 1,000,000 calls/month).

## Tech Used

- HTML5
- CSS3 (Flexbox, CSS variables, backdrop blur)
- Vanilla JavaScript (ES6+, async/await)
- [OpenWeatherMap API](https://openweathermap.org/api)
