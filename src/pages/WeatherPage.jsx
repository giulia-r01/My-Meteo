import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import BackToTop from "../components/layout/BackToTop"
import WeatherHero from "../components/weather/WeatherHero"
import CurrentWeather from "../components/weather/CurrentWeather"
import HourlyForecast from "../components/weather/HourlyForecast"
import WeatherDetails from "../components/weather/WeatherDetails"
import WeeklyForecast from "../components/weather/WeeklyForecast"
import useWeather from "../hooks/useWeather"
import useWeatherPreferences from "../hooks/useWeatherPreferences"

export default function WeatherPage() {
  const { city, weather, loading, error, selectCity, refresh } = useWeather()
  const { unit, setUnit, favorites, isFavorite, toggleFavorite } =
    useWeatherPreferences()
  const favorite = isFavorite(city)

  return (
    <>
      <a className="skip-link" href="#contenuto">
        Salta al contenuto
      </a>
      <div id="inizio" />
      <Header unit={unit} onUnitChange={setUnit} />
      <main id="contenuto">
        <WeatherHero favorites={favorites} onSelectCity={selectCity}>
          <CurrentWeather
            city={city}
            current={weather?.current}
            today={weather?.days[0]}
            loading={loading}
            error={error}
            unit={unit}
            favorite={favorite}
            onToggleFavorite={() => toggleFavorite(city)}
            onRetry={refresh}
          />
        </WeatherHero>
        <HourlyForecast hours={weather?.hours} loading={loading} unit={unit} />
        <WeatherDetails
          city={city}
          current={weather?.current}
          today={weather?.days[0]}
          sunProgress={weather?.sunProgress}
        />
        <WeeklyForecast days={weather?.days} loading={loading} unit={unit} />
      </main>
      <Footer />
      <BackToTop />
      <span className="sr-only" role="status">
        {favorite ? `${city.name} è nei preferiti.` : ""}
        {weather
          ? ` Meteo di ${city.name} caricato. Temperature in gradi ${unit === "C" ? "Celsius" : "Fahrenheit"}.`
          : ""}
      </span>
    </>
  )
}
