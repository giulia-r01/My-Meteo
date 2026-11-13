import assert from "node:assert/strict"
import { test } from "node:test"
import { getWeather, searchCities } from "../src/services/weatherApi.js"

const city = { name: "Firenze", latitude: 43.7696, longitude: 11.2558 }

function forecastResponse() {
  const dates = Array.from({ length: 7 }, (_, i) => `2026-11-${13 + i}`)
  const times = dates.flatMap((date) =>
    Array.from(
      { length: 24 },
      (_, hour) => `${date}T${String(hour).padStart(2, "0")}:00`,
    ),
  )
  return {
    current: {
      time: "2026-11-13T23:15",
      temperature_2m: 15,
      apparent_temperature: 13,
      relative_humidity_2m: 68,
      is_day: 0,
      weather_code: 2,
      pressure_msl: 1015,
      wind_speed_10m: 11,
      wind_direction_10m: 45,
    },
    hourly: {
      time: times,
      temperature_2m: times.map((_, i) => 10 + i / 10),
      precipitation_probability: times.map(() => 20),
      weather_code: times.map(() => 2),
      visibility: times.map(() => 16000),
      is_day: times.map(() => 0),
    },
    daily: {
      time: dates,
      temperature_2m_min: dates.map(() => 10),
      temperature_2m_max: dates.map(() => 19),
      weather_code: dates.map(() => 2),
      precipitation_probability_max: dates.map(() => 20),
      sunrise: dates.map((date) => `${date}T07:00`),
      sunset: dates.map((date) => `${date}T17:00`),
    },
  }
}

test("normalizza i dati della città e mantiene le otto ore anche oltre mezzanotte", async (t) => {
  const controller = new AbortController()
  t.mock.method(globalThis, "fetch", async (url, options) => {
    const params = new URL(url).searchParams
    assert.equal(params.get("latitude"), String(city.latitude))
    assert.equal(params.get("longitude"), String(city.longitude))
    assert.equal(params.get("forecast_days"), "7")
    assert.equal(params.get("timezone"), "auto")
    assert.equal(options.signal, controller.signal)
    return { ok: true, json: async () => forecastResponse() }
  })

  const weather = await getWeather(city, controller.signal)
  assert.equal(weather.hours.length, 8)
  assert.equal(weather.hours[0].time, "2026-11-13T23:00")
  assert.equal(weather.hours[1].time, "2026-11-14T00:00")
  assert.equal(weather.hours[7].time, "2026-11-14T06:00")
  assert.equal(weather.days.length, 7)
  assert.equal(weather.days[6].date, "2026-11-19")
  assert.equal(weather.current.visibility, 16000)
  assert.equal(weather.current.windDirection, "Nord-Est")
  assert.equal(weather.sunProgress, 1)
})

test("rifiuta errori HTTP e risposte meteo incomplete", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => ({
    ok: false,
  }))
  await assert.rejects(getWeather(city), /Servizio meteo non disponibile/)
  fetchMock.mock.mockImplementation(async () => ({
    ok: true,
    json: async () => ({}),
  }))
  await assert.rejects(getWeather(city), /Dati meteo incompleti/)
})

test("la ricerca codifica il nome e gestisce una località senza risultati", async (t) => {
  t.mock.method(globalThis, "fetch", async (url) => {
    const params = new URL(url).searchParams
    assert.equal(params.get("name"), "L’Aquila & dintorni")
    assert.equal(params.get("language"), "it")
    return { ok: true, json: async () => ({}) }
  })
  assert.deepEqual(await searchCities("L’Aquila & dintorni"), [])
})

test("l’annullamento della richiesta viene propagato al chiamante", async (t) => {
  const controller = new AbortController()
  t.mock.method(globalThis, "fetch", async (_url, { signal }) => {
    signal.throwIfAborted()
  })
  controller.abort()
  await assert.rejects(getWeather(city, controller.signal), {
    name: "AbortError",
  })
})
