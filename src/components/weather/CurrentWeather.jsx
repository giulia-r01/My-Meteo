import { Droplets, Eye, Heart, MapPin, Wind } from "lucide-react"
import WeatherIcon from "../WeatherIcon"
import { condition, formatTemperature } from "../../utils/weather"

export default function CurrentWeather({
  city,
  current,
  today,
  loading,
  error,
  unit,
  favorite,
  onToggleFavorite,
  onRetry,
}) {
  const temp = (value) => formatTemperature(value, unit)
  return (
    <section
      className="current-card"
      aria-labelledby="current-location"
      aria-busy={loading}
    >
      <div className="current-top">
        <div>
          <h2 id="current-location">
            <MapPin size={20} aria-hidden="true" />
            {city.name}
            {city.admin1 ? `, ${city.admin1}` : ""}
          </h2>
          <p>
            {current
              ? `Aggiornato alle ${current.time.slice(11, 16)} · ora locale`
              : "Il meteo, proprio dove sei."}
          </p>
        </div>
        <button
          className="favorite-button"
          onClick={onToggleFavorite}
          aria-pressed={favorite}
          title={favorite ? 'Rimuovi dai preferiti' : 'Salva tra i preferiti'}
          aria-label={`${favorite ? "Rimuovi" : "Aggiungi"} ${city.name} ${favorite ? "dai" : "ai"} preferiti`}
        >
          <Heart size={21} aria-hidden="true" fill={favorite ? "currentColor" : "none"} />
          <span>{favorite ? 'Salvata' : 'Salva'}</span>
        </button>
      </div>
      <div className="weather-status" role="status">
        {loading ? (
          <div className="loading-state">
            <span className="loader" />
            Caricamento del meteo di {city.name}…
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={onRetry}>Riprova</button>
          </div>
        ) : (
          current && (
            <>
              <div className="current-main">
                <div>
                  <p
                    className="current-temperature"
                    aria-label={`${temp(current.temperature)} gradi ${unit === "C" ? "Celsius" : "Fahrenheit"}`}
                  >
                    {temp(current.temperature)}
                    <span>°</span>
                  </p>
                  <p className="current-condition">
                    {condition(current.code).label}
                  </p>
                  <p className="feels-like">
                    Percepita {temp(current.feelsLike)}°
                  </p>
                </div>
                <WeatherIcon
                  code={current.code}
                  night={!current.isDay}
                  className="hero-weather-icon"
                />
              </div>
              <dl className="high-low">
                <div>
                  <dt>Massima</dt>
                  <dd>{temp(today.max)}°</dd>
                </div>
                <div>
                  <dt>Minima</dt>
                  <dd>{temp(today.min)}°</dd>
                </div>
              </dl>
              <dl className="current-metrics">
                <div>
                  <dt>
                    <Droplets size={19} aria-hidden="true" />
                    Umidità
                  </dt>
                  <dd>{current.humidity ?? "—"}%</dd>
                </div>
                <div>
                  <dt>
                    <Wind size={19} aria-hidden="true" />
                    Vento
                  </dt>
                  <dd>
                    {Math.round(current.wind)} <small>km/h</small>
                  </dd>
                </div>
                <div>
                  <dt>
                    <Eye size={19} aria-hidden="true" />
                    Visibilità
                  </dt>
                  <dd>
                    {current.visibility == null
                      ? "—"
                      : Math.round(current.visibility / 1000)}{" "}
                    <small>km</small>
                  </dd>
                </div>
              </dl>
            </>
          )
        )}
      </div>
    </section>
  )
}
