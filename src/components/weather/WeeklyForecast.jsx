import { Droplets } from "lucide-react"
import WeatherIcon from "../WeatherIcon"
import { condition, formatTemperature } from "../../utils/weather"

export default function WeeklyForecast({ days, loading, unit }) {
  const temp = (value) => formatTemperature(value, unit)
  const minimum = days?.length ? Math.min(...days.map((day) => day.min)) : 0
  const maximum = days?.length ? Math.max(...days.map((day) => day.max)) : 0
  const range = maximum - minimum || 1
  return (
    <section
      className="weekly-section container"
      id="settimana"
      data-nav-section
      aria-labelledby="weekly-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">UNO SGUARDO AVANTI</p>
          <h2 id="weekly-title">Prossimi 7 giorni</h2>
        </div>
        <span className="weekly-unit">Temperature in °{unit}</span>
      </div>
      {days ? (
        <ol className="weekly-list">
          {days.map((day, index) => {
            return (
              <li className="day-row" key={day.date}>
                <h3>
                  {index === 0
                    ? "Oggi"
                    : index === 1
                      ? "Domani"
                      : new Date(`${day.date}T12:00:00`).toLocaleDateString(
                          "it-IT",
                          { weekday: "short", day: "numeric" },
                        )}
                </h3>
                <WeatherIcon code={day.code} />
                <p className="day-condition">{condition(day.code).label}</p>
                <p className="rain-probability">
                  <Droplets size={18} aria-hidden="true" />
                  <span className="sr-only">Probabilità di pioggia: </span>
                  {day.rain ?? "—"}%
                </p>
                <div className="temperature-range">
                  <span className="min-temp">
                    <span className="sr-only">Minima </span>
                    {temp(day.min)}°
                  </span>
                  <span className="range-track" aria-hidden="true">
                    <span
                      style={{
                        left: `${((day.min - minimum) / range) * 100}%`,
                        width: `${Math.max(4, ((day.max - day.min) / range) * 100)}%`,
                      }}
                    />
                  </span>
                  <strong>
                    <span className="sr-only">Massima </span>
                    {temp(day.max)}°
                  </strong>
                </div>
              </li>
            )
          })}
        </ol>
      ) : (
        <p className="section-placeholder">
          {loading
            ? "Prepariamo uno sguardo alla settimana…"
            : "Le previsioni settimanali saranno disponibili quando il meteo sarà caricato."}
        </p>
      )}
      <p className="data-credit">
        Previsioni e orari nella località selezionata. Dati meteo:{" "}
        <a href="https://open-meteo.com/">Open-Meteo</a>.
      </p>
    </section>
  )
}
