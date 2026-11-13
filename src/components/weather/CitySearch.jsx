import { useRef } from "react"
import { ArrowUpRight, Heart, MapPin, Search } from "lucide-react"
import { presets } from "../../data/cities"
import useCitySearch from "../../hooks/useCitySearch"

export default function CitySearch({ favorites, onSelectCity }) {
  const inputRef = useRef(null)
  const {
    query,
    results,
    searching,
    searchMessage,
    updateQuery,
    handleSearch,
    reset,
  } = useCitySearch()

  function selectCity(city) {
    reset()
    onSelectCity(city)
    inputRef.current?.focus({ preventScroll: true })
  }
  return (
    <div className="search-area">
      <form
        className="search-form"
        onSubmit={handleSearch}
        role="search"
        aria-label="Cerca il meteo di una città"
      >
        <Search size={22} aria-hidden="true" />
        <label className="sr-only" htmlFor="city-search">
          Nome della città
        </label>
        <input
          ref={inputRef}
          id="city-search"
          type="search"
          placeholder="Cerca una città…"
          autoComplete="off"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          aria-describedby="search-help search-status"
        />
        <button className="search-button" type="submit" disabled={searching}>
          {searching ? "Cerco…" : "Cerca"}
          <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </form>
      <p className="search-help" id="search-help">
        Prova:{" "}
        {presets.map((item, index) => (
          <span key={item.name}>
            <button onClick={() => selectCity(item)}>{item.name}</button>
            {index < presets.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p id="search-status" className="search-status" role="status">
        {searchMessage}
      </p>
      {results.length > 0 && (
        <ul className="search-results" aria-label="Risultati della ricerca">
          {results.map((item) => (
            <li key={`${item.latitude}-${item.longitude}`}>
              <button onClick={() => selectCity(item)}>
                <MapPin size={19} aria-hidden="true" />
                <span>
                  <strong>{item.name}</strong>
                  <small>
                    {[item.admin1, item.country].filter(Boolean).join(", ")}
                  </small>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {favorites.length > 0 && (
        <div className="favorites">
          <span>
            <Heart size={15} aria-hidden="true" /> Le tue città
          </span>
          <div>
            {favorites.map((item) => (
              <button
                key={`${item.latitude}-${item.longitude}`}
                onClick={() => selectCity(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
