'use strict'

function onInit() {
  gElCanvas = document.getElementById('my-canvas')
  gCtx = gElCanvas.getContext('2d')
  addListeners()
  renderCanvas()
  renderGallery()
}

function renderCanvas() {
  const meme = getMeme()
  var img = new Image()
  img.src = `img/${meme.selectedImgId}.jpg`
  img.onload = function () {
    gCtx.drawImage(img, 0, 0) // Draws the entire image at (0, 0) on the canvas

    meme.lines.forEach((line) => {
      gCtx.font = `${line.size}px ${line.font}`
      gCtx.fillStyle = line.color
      gCtx.textAlign = line.align
      gCtx.textBaseline = 'middle' // Set the fill color for the text
      let text = line.txt
      gCtx.fillText(text, line.pos.x, line.pos.y)
      drawBorder()
    })
  }
}

function drawBorder() {
  const line = getLine()
  if (!line) return
  gCtx.beginPath()
  gCtx.rect(
    line.pos.x - gCtx.measureText(line.txt).width / 2 - 10,
    line.pos.y - 10,
    gCtx.measureText(line.txt).width + 20,
    line.size + 20
  )
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'orange'
  gCtx.stroke()
  gCtx.closePath()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  // gElCanvas.addEventListener('mousemove', onMove)
  // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  // gElCanvas.addEventListener('touchmove', onMove)
  // gElCanvas.addEventListener('touchend', onUp)
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
  // Listen for resize ev
  // window.addEventListener('resize', () => {
  //   onInit()
  // })
}

function onDown(ev) {
  const { offsetX, offsetY } = ev
  const isClicked = isLineClicked(offsetX, offsetY)
}

function isLineClicked(offsetX, offsetY) {
  const lines = getLines()
  const clickedLineIdx = lines.findIndex((line) => {
    const lineWidth = gCtx.measureText(line.txt).width
    const lineHeight = line.size
    return (
      offsetX >= line.pos.x - lineWidth / 2 - 10 &&
      offsetX <= line.pos.x + lineWidth + 20 &&
      offsetY >= line.pos.y - 10 &&
      offsetY <= line.pos.y + lineHeight + 20
    )
  })
  if (clickedLineIdx !== -1) {
    updateLineIdx(clickedLineIdx)
    console.log('clickedLineIdx', clickedLineIdx)

    return true
  }
  return false
}

function onDownloadMeme(elLink) {
  const memeContent = gElCanvas.toDataURL()
  // console.log(memeContent)
  elLink.href = memeContent
}

// Eaditing tool
function onAddLine(font) {
  const lines = getLine()
  if (lines.length === 3) return
  const lineIdx = lines.length + 1
  const newLine = _createLine(font, lineIdx)
  gMeme.lines.push(newLine)
  gCurrLineIdx = gMeme.lines.length - 1
}

function onMoveLine(direction) {
  const diff = direction === 'up' ? -5 : 5
  moveLine(diff, 'y')
  renderCanvas()
}

function onChangeAlign(direction) {
  changeAlign(direction)
  renderCanvas()
}

function onChangeFontFamily(font) {
  changeFontFamily(font)
  renderCanvas()
}

function onRemoveLine() {
  if (confirm('Are you sure you would like to delete this item?')) {
    removeLine(gCurrLineIdx)
    renderCanvas()
  }
}

function onChangetxt(txt) {
  const line = getLine()
  line.txt = txt
  renderCanvas()
}

function onChangetxtcolor(color) {
  gMeme.lines[gCurrLineIdx].color = color
  renderCanvas()
}

function increaseFont() {
  gMeme.lines[gCurrLineIdx].size++
  renderCanvas()
}

function decreaseFont() {
  gMeme.lines[gCurrLineIdx].size--
  renderCanvas()
}

function toggleLine() {
  swichLine()
  renderCanvas
}
