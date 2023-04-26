'use strict'

let gElCanvas
let gCtx
let gCurrLineIdx = 0

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
  { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
  { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
  { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
  { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
  { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
  { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
  { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
  { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
  { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
]

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      align: 'center',
      color: 'black',
      font: 'impact',
      isDrag: true,
      size: 20,
      pos: { x: 120, y: 50 },
    },
    {
      txt: '',
      align: 'center',
      color: 'black',
      font: 'impact',
      isDrag: true,
      size: 20,
      pos: { x: 120, y: 350 },
    },
    {
      txt: '',
      align: 'center',
      color: 'black',
      font: 'impact',
      isDrag: true,
      size: 20,
      pos: { x: 120, y: 170 },
    },
  ],
}

function getMeme() {
  return gMeme
}

// function getImg() {
//   return gImgs[0]
// }

function getLine() {
  return gMeme.lines[gCurrLineIdx]
}
// function getLines() {
//   return gMeme.lines
// }

// editor

function _createLine(font, lineIdx) {
  const newPos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

  if (lineIdx === 1) newPos.y = 50
  if (lineIdx === 2) newPos.y = gElCanvas.height - 80
  if (lineIdx === 3) newPos.y = 250
  if (lineIdx > 3) return

  return {
    txt: '',
    align: 'center',
    color: 'black',
    isDrag: true,
    size: 20,
    pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 },
  }
}

function changeAlign(align) {
  const line = getLine()
  line.align = align

  switch (align) {
    case 'left':
      line.pos.x = 0
      break
    case 'center':
      line.pos.x = gElCanvas.width / 2
      break
    case 'right':
      line.pos.x = gElCanvas.width
      break
  }
}

function changeFontFamily(font) {
  const line = getLine()
  if (!line) return
  line.font = font
  renderCanvas()
}

function swichLine() {
  gCurrLineIdx++
  if (gCurrLineIdx === gMeme.lines.length) gCurrLineIdx = 0
}

function updateLineIdx(lineIdx) {
  gCurrLineIdx = lineIdx
}

function removeLine() {
  gMeme.lines.splice(gCurrLineIdx, 1)
}
