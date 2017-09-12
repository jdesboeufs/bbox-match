'use strict'

const test = require('ava')
const regions = require('@etalab/fr-bounding-boxes').regions
const departements = require('@etalab/fr-bounding-boxes').departements
const epci = require('@etalab/fr-bounding-boxes').epci
const communes = require('@etalab/fr-bounding-boxes').communes
const bboxMatch = require('./')

const adminLevelsMatch = bboxMatch(regions.concat(departements).concat(epci).concat(communes))

test('region matching', t => {
  const bbox = [1.447448, 48.153260, 3.518371, 49.226566]
  t.is(adminLevelsMatch(bbox).id, 'fr:region:11')
})

test('departement matching', t => {
  const bbox = [7.146606, 48.129434, 8.239746, 49.221185]
  t.is(adminLevelsMatch(bbox).id, 'fr:departement:67')
})

test('overseas matching', t => {
  const bbox = [-61.872253, 15.887376, -61.026306, 16.541430]
  t.is(adminLevelsMatch(bbox).id, 'fr:region:01')
})

test('none matches', t => {
  const bbox = [-4.21875, 41.967659, -0.571289, 44.213709]
  t.falsy(adminLevelsMatch(bbox))
})
