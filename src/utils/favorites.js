export function sameCity(first, second) {
  return first.latitude === second.latitude && first.longitude === second.longitude
}

export function sanitizeFavorites(value) {
  return Array.isArray(value) ? value.filter(city => city &&
    typeof city.name === 'string' &&
    Number.isFinite(city.latitude) && Number.isFinite(city.longitude)) : []
}

export function toggleCityFavorite(favorites, city) {
  return favorites.some(item => sameCity(item, city))
    ? favorites.filter(item => !sameCity(item, city))
    : [...favorites, city]
}
