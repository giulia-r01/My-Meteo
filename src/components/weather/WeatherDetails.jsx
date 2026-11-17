import { Droplets, Gauge, Sun, Wind } from "lucide-react"
import SunSchedule from './SunSchedule'

export default function WeatherDetails({ city, current, today, sunProgress }) {
  return (
    <section
      className="details-section"
      id="dettagli"
      data-nav-section
      aria-labelledby="details-title"
    >
      <Sun className="details-decoration" aria-hidden="true" />
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PIÙ INFORMAZIONI</p>
            <h2 id="details-title">Dettagli di oggi</h2>
          </div>
          <p className="section-note">{city.isCurrentLocation && city.name === 'La tua posizione'
            ? 'Uno sguardo in più nella tua zona'
            : `Uno sguardo in più su ${city.name}`}</p>
        </div>
        <div className="details-grid">
          <article className="detail-card">
            <span className="detail-icon">
              <Wind aria-hidden="true" />
            </span>
            <h3>Vento</h3>
            <p className="detail-value">
              {current ? Math.round(current.wind) : "—"} <span>km/h</span>
            </p>
            <p>
              {current
                ? `Direzione ${current.windDirection}`
                : "In attesa dei dati"}
            </p>
          </article>
          <article className="detail-card">
            <span className="detail-icon">
              <Droplets aria-hidden="true" />
            </span>
            <h3>Umidità</h3>
            <p className="detail-value">
              {current?.humidity ?? "—"}
              <span>%</span>
            </p>
            <p>
              {current
                ? current.humidity > 70
                  ? "Aria molto umida"
                  : current.humidity < 30
                    ? "Aria secca"
                    : "Umidità moderata"
                : "In attesa dei dati"}
            </p>
          </article>
          <article className="detail-card">
            <span className="detail-icon">
              <Gauge aria-hidden="true" />
            </span>
            <h3>Pressione</h3>
            <p className="detail-value">
              {current ? Math.round(current.pressure) : "—"} <span>hPa</span>
            </p>
            <p>Al livello del mare</p>
          </article>
          <SunSchedule current={current} today={today} sunProgress={sunProgress} />
        </div>
      </div>
    </section>
  )
}
