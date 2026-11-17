import { useCallback, useEffect, useRef, useState } from 'react'
import { getCurrentLocation } from '../services/geolocation'
import { resolveLocationName } from '../services/reverseGeocoding'

export default function useGeolocation(onLocate) {
  const [locating, setLocating] = useState(false)
  const [locationMessage, setLocationMessage] = useState('')
  const version = useRef(0)
  const lookup = useRef(null)

  const locate = useCallback(async () => {
    lookup.current?.abort()
    const requestVersion = ++version.current
    setLocating(true)
    setLocationMessage('Ricerca della tua posizione…')
    try {
      let location = await getCurrentLocation()
      if (version.current !== requestVersion) return
      setLocationMessage('Posizione rilevata. Cerco il nome della città…')
      const controller = new AbortController()
      lookup.current = controller
      const timeout = setTimeout(() => controller.abort(), 5000)
      let nameAvailable = false
      try {
        location = await resolveLocationName(location, controller.signal)
        nameAvailable = true
      } catch {
        if (version.current !== requestVersion) return
      } finally {
        clearTimeout(timeout)
      }
      if (version.current !== requestVersion) return
      onLocate(location)
      setLocationMessage(nameAvailable
        ? `Posizione rilevata: ${[location.name, location.admin1].filter(Boolean).join(', ')}.`
        : 'Posizione rilevata, ma il nome della città non è disponibile. Il meteo usa comunque le coordinate del dispositivo; riprova per verificare la località.')
    } catch (error) {
      if (version.current === requestVersion) setLocationMessage(error.message)
    } finally {
      if (version.current === requestVersion) setLocating(false)
    }
  }, [onLocate])

  const cancel = useCallback(() => {
    version.current += 1
    lookup.current?.abort()
    setLocating(false)
    setLocationMessage('')
  }, [])

  useEffect(() => {
    const initialVersion = version.current
    if (globalThis.isSecureContext && navigator.permissions?.query) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(permission => {
          if (permission.state === 'granted' && version.current === initialVersion) locate()
        })
        .catch(() => {})
    }
    return () => {
      version.current += 1
      lookup.current?.abort()
    }
  }, [locate])

  return { locate, cancel, locating, locationMessage }
}
