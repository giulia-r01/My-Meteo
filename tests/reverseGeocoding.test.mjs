import assert from 'node:assert/strict'
import { test } from 'node:test'
import { resolveLocationName } from '../src/services/reverseGeocoding.js'

const location = { name: 'La tua posizione', latitude: 45.46, longitude: 9.19, isCurrentLocation: true }

test('mostra città e regione senza spostare le coordinate delle previsioni', async t => {
  const controller = new AbortController()
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    const params = new URL(url).searchParams
    assert.equal(params.get('latitude'), '45.46')
    assert.equal(params.get('longitude'), '9.19')
    assert.equal(params.get('localityLanguage'), 'it')
    assert.equal(options.signal, controller.signal)
    assert.equal(options.credentials, 'omit')
    return { ok: true, json: async () => ({
      city: 'Milano', locality: 'Municipio 1', principalSubdivision: 'Lombardia',
      countryName: 'Italia', latitude: 45.5, longitude: 9.2,
    }) }
  })
  const result = await resolveLocationName(location, controller.signal)
  assert.equal(result.name, 'Milano')
  assert.equal(result.admin1, 'Lombardia')
  assert.equal(result.country, 'Italia')
  assert.equal(result.latitude, location.latitude)
  assert.equal(result.longitude, location.longitude)
  assert.equal(result.isCurrentLocation, true)
  assert.equal(location.name, 'La tua posizione')
})

test('usa il nome della località quando manca il campo città', async t => {
  t.mock.method(globalThis, 'fetch', async () => ({
    ok: true, json: async () => ({ city: ' ', locality: 'San Gimignano' }),
  }))
  const result = await resolveLocationName(location)
  assert.equal(result.name, 'San Gimignano')
  assert.equal(result.admin1, '')
})

test('segnala errori HTTP e risposte senza nome invece di inventare una città', async t => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => ({ ok: false }))
  await assert.rejects(resolveLocationName(location), /non disponibile/)
  fetchMock.mock.mockImplementation(async () => ({ ok: true, json: async () => ({}) }))
  await assert.rejects(resolveLocationName(location), /non disponibile/)
})

test('annulla la ricerca del nome quando si cambia località', async t => {
  const controller = new AbortController()
  t.mock.method(globalThis, 'fetch', async (_url, { signal }) => signal.throwIfAborted())
  controller.abort()
  await assert.rejects(resolveLocationName(location, controller.signal), { name: 'AbortError' })
})
