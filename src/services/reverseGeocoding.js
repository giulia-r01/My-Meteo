const REVERSE_GEOCODING_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

export async function resolveLocationName(location, signal) {
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    localityLanguage: 'it',
  })
  const response = await fetch(`${REVERSE_GEOCODING_URL}?${params}`, {
    signal,
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
  })
  if (!response.ok) throw new Error('Nome della località non disponibile')

  const data = await response.json()
  const city = typeof data.city === 'string' ? data.city.trim() : ''
  const locality = typeof data.locality === 'string' ? data.locality.trim() : ''
  const name = city || locality
  if (!name) throw new Error('Nome della località non disponibile')

  return {
    ...location,
    name,
    admin1: typeof data.principalSubdivision === 'string' ? data.principalSubdivision.trim() : '',
    country: typeof data.countryName === 'string' ? data.countryName.trim() : '',
  }
}
