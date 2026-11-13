import { useEffect, useRef, useState } from "react"
import { searchCities } from "../services/weatherApi"

export default function useCitySearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [searchMessage, setSearchMessage] = useState("")
  const request = useRef(null)

  useEffect(() => () => request.current?.abort(), [])

  function updateQuery(value) {
    request.current?.abort()
    setQuery(value)
    setSearching(false)
    setResults([])
    setSearchMessage("")
  }

  async function handleSearch(event) {
    event.preventDefault()
    request.current?.abort()
    setResults([])

    if (query.trim().length < 2) {
      setSearching(false)
      setSearchMessage("Inserisci almeno 2 caratteri per cercare una città.")
      return
    }

    const controller = new AbortController()
    request.current = controller
    setSearching(true)
    setSearchMessage("")

    try {
      const found = await searchCities(query.trim(), controller.signal)
      if (controller.signal.aborted) return
      setResults(found)
      setSearchMessage(
        found.length
          ? `${found.length} località trovate. Scegli la tua città.`
          : "Nessuna città trovata. Prova un altro nome.",
      )
    } catch {
      if (!controller.signal.aborted) {
        setSearchMessage(
          "Ricerca non disponibile. Controlla la connessione e riprova.",
        )
      }
    } finally {
      if (!controller.signal.aborted) setSearching(false)
    }
  }

  return {
    query,
    results,
    searching,
    searchMessage,
    updateQuery,
    handleSearch,
    reset: () => updateQuery(""),
  }
}
