const FORECAST_URL = "https://api.open-meteo.com/v1/forecast"
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"
const WIND_DIRECTIONS = [
  "Nord",
  "Nord-Est",
  "Est",
  "Sud-Est",
  "Sud",
  "Sud-Ovest",
  "Ovest",
  "Nord-Ovest",
]

async function request(url, params, signal) {
  const response = await fetch(`${url}?${new URLSearchParams(params)}`, {
    signal,
  })
  if (!response.ok) throw new Error("Servizio meteo non disponibile")
  return response.json()
}

export async function searchCities(name, signal) {
  const data = await request(
    GEOCODING_URL,
    {
      name,
      count: "5",
      language: "it",
      format: "json",
    },
    signal,
  )
  return data.results ?? []
}

export async function getWeather(city, signal) {
  const data = await request(
    FORECAST_URL,
    {
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: "auto",
      forecast_days: "7",
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m",
      hourly:
        "temperature_2m,precipitation_probability,weather_code,visibility,is_day",
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
    },
    signal,
  )

  return normalizeForecast(data)
}

function normalizeForecast(data) {
  if (
    !data.current ||
    !data.hourly?.time?.length ||
    data.daily?.time?.length !== 7
  ) {
    throw new Error("Dati meteo incompleti")
  }
  const { current: c, hourly: h, daily: d } = data
  const hourIndex = Math.max(
    0,
    h.time.findIndex((time) => time.slice(0, 13) === c.time.slice(0, 13)),
  )
  const current = {
    time: c.time,
    temperature: c.temperature_2m,
    feelsLike: c.apparent_temperature,
    humidity: c.relative_humidity_2m,
    isDay: c.is_day,
    code: c.weather_code,
    pressure: c.pressure_msl,
    wind: c.wind_speed_10m,
    windDirection: WIND_DIRECTIONS[Math.round(c.wind_direction_10m / 45) % 8],
    visibility: h.visibility[hourIndex],
  }
  const hours = h.time.slice(hourIndex, hourIndex + 8).map((time, offset) => {
    const i = hourIndex + offset
    return {
      time,
      temperature: h.temperature_2m[i],
      rain: h.precipitation_probability[i],
      code: h.weather_code[i],
      isDay: h.is_day[i],
    }
  })
  const days = d.time.map((date, i) => ({
    date,
    min: d.temperature_2m_min[i],
    max: d.temperature_2m_max[i],
    code: d.weather_code[i],
    rain: d.precipitation_probability_max[i],
    sunrise: d.sunrise[i],
    sunset: d.sunset[i],
  }))
  const sunProgress = Math.max(
    0,
    Math.min(
      1,
      (new Date(c.time) - new Date(d.sunrise[0])) /
        (new Date(d.sunset[0]) - new Date(d.sunrise[0])),
    ),
  )
  return { current, hours, days, sunProgress }
}
