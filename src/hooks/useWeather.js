import { useEffect, useState } from "react"
import { presets } from "../data/cities"
import { getWeather } from "../services/weatherApi"

const initialState = { weather: null, loading: true, error: "" }

export default function useWeather() {
  const [city, setCity] = useState(presets[0])
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

  function refresh() {
    setState(initialState)
    setRequestVersion((version) => version + 1)
  }

  function selectCity(nextCity) {
    setCity(nextCity)
    refresh()
  }

  return { city, ...state, selectCity, refresh }
}
