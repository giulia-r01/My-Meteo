import useLocalStorageState from "./useLocalStorageState"
import { useState } from 'react'
import { sameCity, sanitizeFavorites, toggleCityFavorite } from '../utils/favorites'

export default function useWeatherPreferences() {
  const [favoriteMessage, setFavoriteMessage] = useState('')
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
    setFavoriteMessage(isFavorite(city)
      ? `${city.name}: rimossa dai preferiti.`
      : `${city.name}: aggiunta ai preferiti. La ritrovi sotto la ricerca.`)
    setFavorites(previous => toggleCityFavorite(previous, city))
  }

  return { unit, setUnit, favorites, isFavorite, toggleFavorite, favoriteMessage }
}
