const KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getRainfall(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    district: data.name,
    rainLastHour: data.rain?.["1h"] ?? 0,
    description: data.weather[0].description,
  };
}