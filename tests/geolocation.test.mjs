import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getCurrentLocation } from '../src/services/geolocation.js'

function mockBrowser(t, geolocation, secure = true) {
  for (const [name, value] of Object.entries({ navigator: { geolocation }, isSecureContext: secure })) {
    const original = Object.getOwnPropertyDescriptor(globalThis, name)
    Object.defineProperty(globalThis, name, { value, configurable: true })
    t.after(() => {
      if (original) Object.defineProperty(globalThis, name, original)
      else delete globalThis[name]
    })
  }
}

test('la posizione produce una località utilizzabile direttamente dal servizio meteo', async t => {
  mockBrowser(t, {
    getCurrentPosition(success, _error, options) {
      assert.equal(options.enableHighAccuracy, false)
      assert.equal(options.timeout, 10000)
      success({ coords: { latitude: 45.46, longitude: 9.19 } })
    },
  })
  const city = await getCurrentLocation()
  assert.equal(city.name, 'La tua posizione')
  assert.equal(city.latitude, 45.46)
  assert.equal(city.longitude, 9.19)
  assert.equal(city.isCurrentLocation, true)
})

for (const [code, message] of [[1, /Permesso di posizione negato/], [2, /Posizione non disponibile/], [3, /troppo tempo/]]) {
  test(`errore di posizione ${code}: mantiene disponibile la ricerca manuale`, async t => {
    mockBrowser(t, { getCurrentPosition(_success, fail) { fail({ code }) } })
    await assert.rejects(getCurrentLocation(), message)
  })
}

test('gestisce browser senza geolocalizzazione e connessioni non sicure', async t => {
  mockBrowser(t, undefined)
  await assert.rejects(getCurrentLocation(), /non supporta/)
  Object.defineProperty(globalThis, 'isSecureContext', { value: false, configurable: true })
  await assert.rejects(getCurrentLocation(), /HTTPS/)
})
