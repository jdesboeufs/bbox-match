'use strict'

const rbush = require('rbush')

module.exports = function (items) {
  const tree = rbush()

  // Index items
  items.forEach(item => {
    tree.insert({
      minX: item.bbox[0],
      minY: item.bbox[1],
      maxX: item.bbox[2],
      maxY: item.bbox[3],
      item
    })
  })

  return bbox => {
    const indexResults = tree.search({
      minX: bbox[0],
      minY: bbox[1],
      maxX: bbox[2],
      maxY: bbox[3]
    })

    const eligibleResults = indexResults
      .map(result => ({
        item: result.item,
        score: computeMatchScore(bbox, result.item.bbox)
      }))
      .filter(result => result.score > 0.7)
      .sort((a, b) => {
        if (a.score > b.score) {
          return -1
        }
        if (a.score < b.score) {
          return 1
        }
        return 0
      })

    if (eligibleResults.length === 0) {
      return null
    }

    const result = eligibleResults[0]

    return Object.assign({_score: result.score}, result.item)
  }
}

function computeMatchScore(bbox1, bbox2) {
  const minX = Math.max(bbox1[0], bbox2[0])
  const minY = Math.max(bbox1[1], bbox2[1])
  const maxX = Math.min(bbox1[2], bbox2[2])
  const maxY = Math.min(bbox1[3], bbox2[3])
  if (minX > maxX || minY > maxY) {
    throw new Error('Unable to compute score for non intersecting bboxes')
  }
  const bbox1Area = computeArea(bbox1)
  const bbox2Area = computeArea(bbox2)
  const intersectionArea = computeArea([minX, minY, maxX, maxY])
  return (intersectionArea * intersectionArea) / (bbox1Area * bbox2Area)
}

function computeArea(bbox) {
  return (bbox[2] - bbox[0]) * (bbox[3] - bbox[1])
}
