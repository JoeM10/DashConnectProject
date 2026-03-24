const tmdbApiKey = "YOUR_TMDB_API_KEY_HERE";
const dogButton = document.getElementById("dog-button");
const catButton = document.getElementById("cat-button");
const weatherButton = document.getElementById("weather-button");
const exchangeButton = document.getElementById("exchange-button");
const movieButton = document.getElementById("movie-button");
const githubButton = document.getElementById("github-button");
const jokeButton = document.getElementById("joke-button");
const publicApiButton = document.getElementById("public-api-button");
const movieList = document.getElementById("movie-list");

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

async function getCurrencies() {
    const apiUrl = `https://api.frankfurter.app/currencies`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error ("Failed to fetch currencies.");
        const currencies = await response.json();
        const currencyList = Object.keys(currencies);
        console.log(currencyList);

        currencyList.forEach(currency => {
            const fromCurrency = document.createElement("option");
            fromCurrency.value = currency;
            fromCurrency.innerText = currency;
            document.getElementById("currency-from").appendChild(fromCurrency);
            const fromCurrencySelect = document.getElementById("currency-from");
            fromCurrencySelect.value = "USD";

            const toCurrency = document.createElement("option");
            toCurrency.value = currency;
            toCurrency.innerText = currency;
            document.getElementById("currency-to").appendChild(toCurrency);
            const toCurrencySelect = document.getElementById("currency-to");
            toCurrencySelect.value = "EUR";
        });

    } catch (error) {
        console.error("Error fetching currencies:", error);
    };
};

async function getExchangeRates() {
    exchangeButton.disabled = true;
    const apiUrl = `https://api.frankfurter.app/latest?from=${document.getElementById("currency-from").value}&to=${document.getElementById("currency-to").value}`;

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error ("Failed to fetch exchange rates.");
        const exchangeData = await response.json();
        console.log(exchangeData);
        document.getElementById("currency-output").innerHTML = `<p> 1 ${exchangeData.base} = ${exchangeData.rates[document.getElementById("currency-to").value]} ${document.getElementById("currency-to").value}`

    } catch (error) {
        document.getElementById("currency-output").innerHTML = `<p>Error fetching exchange rates. Please try again.</p>`;
        console.error("Error fetching exchange rates:", error);
    } finally {
        exchangeButton.disabled = false;
    }
}

async function getMovies() {
    movieButton.disabled = true;
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch movie data.");
        const movies = await response.json();
        console.log(movies);
        movieList.innerHTML = "";
        for (let index = 0; index < 5; index++) {
            const movie = movies.results[index];
            const movieItem = document.createElement("li");
            movieItem.innerHTML = `<h3>${movie.title}</h3><p>Release Date: ${movie.release_date}</p><p>Rating: ${movie.vote_average}</p>`;
            movieList.appendChild(movieItem);
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
    } finally {
        movieButton.disabled = false;
    };
};

async function getGitHubUser() {
    githubButton.disabled = true;
    const apiUrl = "https://api.github.com/users/octocat";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch GitHub user data.");
        const userData = await response.json();
        console.log(userData);
    } catch (error) {
        console.error("Error fetching GitHub user data:", error);
    } finally {
        githubButton.disabled = false;
    };
};

getCurrencies();