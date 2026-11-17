export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!globalThis.isSecureContext) {
      reject(new Error('La posizione richiede una connessione HTTPS. Puoi cercare una città manualmente.'))
      return
    }
    if (!globalThis.navigator?.geolocation) {
      reject(new Error('Questo browser non supporta la posizione. Cerca una città manualmente.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({
        name: 'La tua posizione',
        latitude: coords.latitude,
        longitude: coords.longitude,
        isCurrentLocation: true,
      }),
      error => {
        const messages = {
          1: 'Permesso di posizione negato. Puoi abilitarlo nel browser oppure cercare una città.',
          2: 'Posizione non disponibile. Riprova oppure cerca una città.',
          3: 'La ricerca della posizione sta impiegando troppo tempo. Riprova oppure cerca una città.',
        }
        reject(new Error(messages[error.code] ?? 'Non riusciamo a trovare la posizione. Cerca una città.'))
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    )
  })
}
