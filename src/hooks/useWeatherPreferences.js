import useLocalStorageState from "./useLocalStorageState"

function sanitizeFavorites(value) {
  return Array.isArray(value)
    ? value.filter(
        (city) =>
          city &&
          typeof city.name === "string" &&
          Number.isFinite(city.latitude) &&
          Number.isFinite(city.longitude),
      )
    : []
}

function sameCity(first, second) {
  return (
    first.latitude === second.latitude && first.longitude === second.longitude
  )
}

export default function useWeatherPreferences() {
  const [unit, setUnit] = useLocalStorageState("myMeteo-unit", "C", (value) =>
    value === "F" ? "F" : "C",
  )
  const [favorites, setFavorites] = useLocalStorageState(
    "myMeteo-favorites",
    [],
    sanitizeFavorites,
  )

  function isFavorite(city) {
    return favorites.some((item) => sameCity(item, city))
  }

  function toggleFavorite(city) {
    setFavorites((previous) =>
      previous.some((item) => sameCity(item, city))
        ? previous.filter((item) => !sameCity(item, city))
        : [...previous, city],
    )
  }

  return { unit, setUnit, favorites, isFavorite, toggleFavorite }
}
