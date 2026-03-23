const dogButton = document.getElementById("dog-button");
const catButton = document.getElementById("cat-button");
const weatherButton = document.getElementById("weather-button");
const exchangeButton = document.getElementById("exchange-button");
const movieButton = document.getElementById("movie-button");
const githubButton = document.getElementById("github-button");
const jokeButton = document.getElementById("joke-button");
const publicApiButton = document.getElementById("public-api-button");

async function getDogImage() {
    dogButton.disabled = true;
    const apiUrl = "https://dog.ceo/api/breeds/image/random";
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error ("Failed to fetch dog image.");
        const data = await response.json();
        console.log(data);
        document.getElementById("dog-output").innerHTML = `<img src="${data.message}" alt="Random Dog Image">`;
    } catch (error) {
        console.error("Error fetching dog image:", error);
    } finally {
        dogButton.disabled = false;
    }
}

async function getCatImage() {
    catButton.disabled = true;
    const apiUrl = "https://cataas.com/cat?json=true";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error ("Failed to fetch cat image.");
        const data = await response.json();
        console.log(data);
        document.getElementById("cat-output").innerHTML = `<img src="${data.url}" alt="Random Cat Image">`;
    } catch (error) {
        console.error("Error fetching cat image:", error);
    } finally {
        catButton.disabled = false;
    }
}

async function getLatLong(location) {
    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&countryCode=US&count=1&language=en&format=json`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error ("Failed to fetch location data.");
        const data = await response.json();
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        const city = data.results[0].name;
        console.log(data);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}, City: ${city}`);
        return {latitude, longitude, city};
    } catch (error) {
        document.getElementById("weather-output").innerHTML = `<p>Incorrect Zip Code. Please try again.</p>`;
        console.error("Error fetching location data:", error);
    }
}

async function getWeather() {
    weatherButton.disabled = true;
    
    try {
        const location = document.getElementById("weather-input").value;
        const {latitude, longitude, city} = await getLatLong(location);
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error ("Failed to festch weather data.");
        const data = await response.json();
        console.log(data);
        document.getElementById("weather-output").innerHTML = `<p>Current Temp in ${city}: ${data.current.temperature_2m}°F</p>`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    } finally {
        weatherButton.disabled = false;
    }
};

async function getExchangeRates() {
    exchangeButton.disabled =true;
    const apiURL = `https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR`;

    try {
        const response = await fetch(apiURL);
        if )!response.ok) throw new Error ("Failed to fetch exchange rates.");
        const data = await response.json();
        console.log(data);
    }
};