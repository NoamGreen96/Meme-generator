'use strict'

function renderGallery() {
  const imgs = getImgs()
  var strHtmls = `<div class="img-gallery" style="margin: auto;">
                    <input type="file" id="BtnUploadHidden" class="img-item file-input btn" name="image" onchange="onUploadImg(event)" style="display: none;"/>
                    <label for="BtnUploadHidden" class="btn-upload" data-trans="upload-img-text">Upload an image</label>
                  </div>`
  strHtmls += imgs
    .map((img) => {
      return `<div class="img-gallery">
                <img src="${img.url}" onclick="onImgSelect(${img.id})">
              </div>`
    })
    .join('')

  const elGallery = document.querySelector('.images-container')
  elGallery.innerHTML = strHtmls
}
