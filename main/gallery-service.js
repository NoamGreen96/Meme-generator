'use strict'
var gFillterWord = 'all'

function getImgs() {
  if (gFillterWord === 'all') return gImgs
  return gImgs.filter((img) => img.keywords.includes(gFillterWord))
}