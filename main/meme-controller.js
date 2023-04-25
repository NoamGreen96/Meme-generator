'use strict'

function onInit() {
  gElCanvas = document.getElementById('my-canvas')
  gCtx = gElCanvas.getContext('2d')
  renderMeme()
  renderGallery()
}

function renderMeme(id) {
  const meme = getMeme()
  const inputImg = getImg(id)
  var img = new Image()
  img.src = inputImg.url
  img.onload = function () {
    gCtx.drawImage(img, 0, 0) // Draws the entire image at (0, 0) on the canvas
    gCtx.font = `${meme[0].size}px Arial`
    gCtx.fillStyle = `${meme[0].color}`
    gCtx.textAlign = `${meme[0].align}`
    gCtx.textBaseline = 'middle' // Set the fill color for the text
    let text = `${meme[0].txt}`
    gCtx.fillText(text, gElCanvas.width / 2, gElCanvas.height / 2)
  }
}

function onChangetxt(txt) {
  const line = getLine()
  line.txt = txt
  renderMeme()
}
