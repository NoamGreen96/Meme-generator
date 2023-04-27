'use strict'

function renderGallery() {
  const imgs = getImgs()
  var strHtmls = `<div class="img-gallery" style="margin: auto;">
                  </div>`
  strHtmls = imgs
    .map((img) => {
      return `<div class="img-gallery">
                <img src="${img.url}" onclick="onImgSelect(${img.id})">
              </div>`
    })
    .join('')

  const elGallery = document.querySelector('.images-container')
  elGallery.innerHTML = strHtmls
}

function onImgSelect(id) {
  setimgById(id)
  _moveToEditorPage()
  renderCanvas()
}
