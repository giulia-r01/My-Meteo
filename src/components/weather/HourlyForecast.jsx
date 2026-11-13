import { ArrowUpRight, Droplets } from "lucide-react"
import WeatherIcon from "../WeatherIcon"
import { condition, formatTemperature } from "../../utils/weather"

export default function HourlyForecast({ hours, loading, unit }) {
  const temp = (value) => formatTemperature(value, unit)
  return (
    <section
      className="forecast-section container"
      aria-labelledby="hourly-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">NELLE PROSSIME ORE</p>
          <h2 id="hourly-title">Previsioni di oggi</h2>
        </div>
        <nav
          className="forecast-nav pill-nav"
          aria-label="Esplora le previsioni"
        >
          <a href="#hourly-title" className="active">
            Oggi
          </a>
          <a href="#settimana">
            7 giorni <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </div>
      {hours ? (
        <div
          className="hourly-scroll"
          tabIndex={0}
          role="region"
          aria-label="Previsioni delle prossime otto ore, scorri orizzontalmente per leggerle tutte"
        >
          <ol className="hourly-grid">
            {hours.map((hour, index) => (
              <li
                className={`hour-card ${index === 0 ? "now" : ""}`}
                key={hour.time}
              >
                <p>{index === 0 ? "Adesso" : hour.time.slice(11, 16)}</p>
                <WeatherIcon code={hour.code} night={!hour.isDay} />
                <span className="sr-only">{condition(hour.code).label}, </span>
                <strong>{temp(hour.temperature)}°</strong>
                <span className="rain-probability">
                  <Droplets size={17} aria-hidden="true" />
                  <span className="sr-only">Probabilità di pioggia: </span>
                  {hour.rain ?? "—"}%
                </span>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="section-placeholder">
          {loading
            ? "Le prossime ore stanno arrivando…"
            : "Le previsioni orarie saranno disponibili quando il meteo sarà caricato."}
        </p>
      )}
    </section>
  )
}
