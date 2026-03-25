# DashConnectProject

Single-page JavaScript dashboard with 8 API-powered widgets. Each card in the grid fetches data when its button is clicked and shows the result instantly.

## Files

- `index.html` - page structure and widget layout.
- `styles.css` - responsive dark theme UI and grid styles.
- `script.js` - fetch logic for all eight APIs and DOM updates.

## Widgets and API behavior

1. **Random Dog** (`dog.ceo`) - button calls `getDogImage()`, shows a random dog image.
2. **Random Cat** (`cataas.com`) - button calls `getCatImage()`, shows a random cat image.
3. **Weather Info** (Open-Meteo geocoding + weather) - input ZIP, button calls `getWeather()` to show current temperature.
4. **Currency Rates** (Frankfurter) - dropdowns + `getExchangeRates()` to display one-to-one conversion rates.
5. **Trending Movies** (TMDB) - button calls `getMovies()` and lists top 5 popular titles.
6. **GitHub User** (GitHub API) - username input + `getGitHubUser()` to display profile stats.
7. **Random Joke** (official-joke-api) - button calls `getJoke()` and shows setup/punchline.
8. **Random Quote** (API Ninjas) - button calls `getQuote()` for a motivational quote.

## Setup

1. Clone project.
2. Put real keys in `script.js`:
   - `tmdbApiKey`
   - `apiNinjasKey`
3. Open `index.html` in a browser.

## Notes

- Buttons are disabled while requests are in flight.
- Basic error handling writes messages to the console and output area.
- Can run locally without a build step.