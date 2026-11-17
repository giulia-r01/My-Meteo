import assert from 'node:assert/strict'
import { test } from 'node:test'
import { sanitizeFavorites, toggleCityFavorite } from '../src/utils/favorites.js'

const firenze = { name: 'Firenze', latitude: 43.77, longitude: 11.25 }
const roma = { name: 'Roma', latitude: 41.9, longitude: 12.49 }

test('aggiunge un preferito e lo rimuove anche dopo aver ritrovato la stessa città', () => {
  const initial = [roma]
  const added = toggleCityFavorite(initial, firenze)
  assert.deepEqual(added, [roma, firenze])
  assert.deepEqual(initial, [roma])
  const reloaded = { ...firenze, admin1: 'Toscana' }
  assert.deepEqual(toggleCityFavorite(added, reloaded), [roma])
})

test('ignora preferiti corrotti senza perdere quelli validi', () => {
  assert.deepEqual(sanitizeFavorites([null, {}, { name: 'Roma' }, firenze]), [firenze])
  assert.deepEqual(sanitizeFavorites('valore non valido'), [])
})
