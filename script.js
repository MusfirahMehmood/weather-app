//Paste your API key here
const API_KEY = "YOUR_API_KEY_HERE";

const cityInput   = document.getElementById("cityInput");
const searchBtn   = document.getElementById("searchBtn");
const locBtn      = document.getElementById("locBtn");
const statusEl    = document.getElementById("status");
const spinner     = document.getElementById("spinner");
const resultEl    = document.getElementById("result");

const weatherIconEl = document.getElementById("weatherIcon");
const cityNameEl     = document.getElementById("cityName");
const conditionEl    = document.getElementById("condition");
const tempEl         = document.getElementById("temp");
const humidityEl     = document.getElementById("humidity");
const feelsLikeEl    = document.getElementById("feelsLike");
const windEl         = document.getElementById("wind");

// Map weather condition -> emoji + background theme
function getWeatherVisuals(main) {
  const key = main.toLowerCase();

  if (key.includes("clear")) return { icon: "☀️", theme1: "--clear-1", theme2: "--clear-2" };
  if (key.includes("cloud")) return { icon: "☁️", theme1: "--cloud-1", theme2: "--cloud-2" };
  if (key.includes("rain") || key.includes("drizzle")) return { icon: "🌧️", theme1: "--rain-1", theme2: "--rain-2" };
  if (key.includes("thunderstorm")) return { icon: "⛈️", theme1: "--storm-1", theme2: "--storm-2" };
  if (key.includes("snow")) return { icon: "❄️", theme1: "--snow-1", theme2: "--snow-2" };
  if (key.includes("mist") || key.includes("fog") || key.includes("haze")) return { icon: "🌫️", theme1: "--mist-1", theme2: "--mist-2" };

  return { icon: "🌤️", theme1: "--clear-1", theme2: "--clear-2" };
}

function setBackground(theme1, theme2) {
  const c1 = getComputedStyle(document.documentElement).getPropertyValue(theme1);
  const c2 = getComputedStyle(document.documentElement).getPropertyValue(theme2);
  document.body.style.background = `linear-gradient(160deg, ${c1}, ${c2})`;
}

function showStatus(message) { statusEl.textContent = message; }
function clearStatus() { statusEl.textContent = ""; }
function showLoading(isLoading) { spinner.classList.toggle("visible", isLoading); }

// Render fetched weather data into the DOM
function renderWeather(data) {
  const main = data.weather[0].main;
  const description = data.weather[0].description;
  const visuals = getWeatherVisuals(main);

  weatherIconEl.textContent = visuals.icon;
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  conditionEl.textContent = description;
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  humidityEl.textContent = `${data.main.humidity}%`;
  feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;
  windEl.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

  setBackground(visuals.theme1, visuals.theme2);
  resultEl.classList.add("visible");
}

// Fetch by city name
async function fetchWeatherByCity(city) {
  if (API_KEY === "YOUR_API_KEY_HERE") {
    showStatus("Please add your OpenWeatherMap API key in script.js");
    return;
  }

  clearStatus();
  showLoading(true);
  resultEl.classList.remove("visible");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling and try again.");
      }
      throw new Error("Something went wrong while fetching weather data.");
    }

    const data = await response.json();
    renderWeather(data);

  } catch (err) {
    showStatus(err.message);
  } finally {
    showLoading(false);
  }
}

// Fetch by coordinates (Geolocation challenge)
async function fetchWeatherByCoords(lat, lon) {
  clearStatus();
  showLoading(true);
  resultEl.classList.remove("visible");

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Could not fetch weather for your location.");
    const data = await response.json();
    renderWeather(data);
  } catch (err) {
    showStatus(err.message);
  } finally {
    showLoading(false);
  }
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    showStatus("Please enter a city name.");
    return;
  }
  fetchWeatherByCity(city);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

locBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showStatus("Geolocation is not supported by your browser.");
    return;
  }

  showStatus("Detecting your location...");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    (error) => {
      showStatus("Location access denied or unavailable.");
    }
  );
});