import CitySearch from "./CitySearch"

export default function WeatherHero({ favorites, onSelectCity, children }) {
  return (
    <section
      className="hero container"
      id="oggi"
      data-nav-section
      aria-labelledby="hero-title"
    >
      <span className="hero-watermark" aria-hidden="true">
        WEATHER
      </span>
      <div className="hero-copy">
        <p className="eyebrow live-label">
          <span /> LIVE WEATHER · IL TUO METEO
        </p>
        <h1 id="hero-title">
          Il meteo,
          <br />
          <em>senza rumore.</em>
        </h1>
        <p className="hero-description">
          Tutto quello che ti serve per organizzare la giornata.
          <br className="desktop-break" /> Niente di più.
        </p>
        <CitySearch favorites={favorites} onSelectCity={onSelectCity} />
      </div>

      {children}
    </section>
  )
}
