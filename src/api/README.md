# `src/api/` — External Data and Risk Engine

Owned by **B2**.

| File | Does |
|:--|:--|
| `weather.js` | Fetches live rainfall for a coordinate from OpenWeatherMap. |
| `updateRisk.js` | Folds rainfall into each zone's `riskScore` and writes the new `riskLevel` to Firestore. |

Requires `VITE_WEATHER_API_KEY` in `.env` — see `.env.example`.
