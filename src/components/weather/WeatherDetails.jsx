import { Droplets, Gauge, Sunrise, Sunset, Wind } from "lucide-react"

export default function WeatherDetails({ city, current, today, sunProgress }) {
  return (
    <section
      className="details-section"
      id="dettagli"
      data-nav-section
      aria-labelledby="details-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PIÙ INFORMAZIONI</p>
            <h2 id="details-title">Dettagli di oggi</h2>
          </div>
          <p className="section-note">Uno sguardo in più su {city.name}</p>
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
          <article className="sun-card" aria-label="Alba e tramonto">
            <div className="sun-orbit" aria-hidden="true">
              <div className="sun-arc" />
              <span
                className="sun-dot"
                style={{
                  "--sun-progress": `${sunProgress ?? 0.5}`,
                }}
              />
            </div>
            <div className="sun-times">
              <div>
                <Sunrise aria-hidden="true" />
                <div>
                  <h3>Alba</h3>
                  <p>{today?.sunrise.slice(11, 16) ?? "—"}</p>
                </div>
              </div>
              <div>
                <Sunset aria-hidden="true" />
                <div>
                  <h3>Tramonto</h3>
                  <p>{today?.sunset.slice(11, 16) ?? "—"}</p>
                </div>
              </div>
            </div>
            <p className="sun-caption">
              {current
                ? current.isDay
                  ? "La luce accompagna la tua giornata."
                  : "Anche il cielo si prende una pausa."
                : "Gli orari del sole, nella tua città."}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
