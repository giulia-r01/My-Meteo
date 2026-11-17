import { useCallback, useEffect, useState } from "react"
import { presets } from "../data/cities"
import { getWeather } from "../services/weatherApi"
import { readStored } from "../utils/storage"

const initialState = { weather: null, loading: true, error: "" }

export default function useWeather() {
  const [city, setCity] = useState(() => {
    const saved = readStored('myMeteo-last-city', null)
    return saved && typeof saved.name === 'string' &&
      Number.isFinite(saved.latitude) && Number.isFinite(saved.longitude)
      ? saved : presets[0]
  })
  const [requestVersion, setRequestVersion] = useState(0)
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const controller = new AbortController()

    getWeather(city, controller.signal)
      .then((weather) => {
        if (!controller.signal.aborted) {
          setState({ weather, loading: false, error: "" })
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setState({
            weather: null,
            loading: false,
            error:
              "Non riusciamo a caricare il meteo. Controlla la connessione e riprova.",
          })
        }
      })

    return () => controller.abort()
  }, [city, requestVersion])

  const refresh = useCallback(() => {
    setState(initialState)
    setRequestVersion((version) => version + 1)
  }, [])

  const selectCity = useCallback((nextCity) => {
    setCity(nextCity)
    refresh()
  }, [refresh])

  useEffect(() => {
    if (city.isCurrentLocation) return
    try {
      localStorage.setItem('myMeteo-last-city', JSON.stringify(city))
    } catch {
      return
    }
  }, [city])

  return { city, ...state, selectCity, refresh }
}
