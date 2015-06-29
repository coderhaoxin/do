'use strict'

/**
 * @param {String|Image} img
 * @param {Object} opts
 *   - opts.type: center, scale
 *   - opts.scale
 *   - opts.width
 *   - opts.height
 */
function resize(img, opts) {
  opts = opts || {}

  var getImg = () => {
    return new Promise((resolve, reject) => {
      if (img instanceof Image) {
        resolve(img)
      } else if (typeof img === 'string') {
        var dataURL = img
        img = new Image()
        img.src = dataURL
        img.onload = () => {
          resolve(img)
        }
        img.onerror = reject
      }
    })
  }

  return getImg()
    .then(() => {
      var canvas = document.createElement('canvas')

      var ctx = canvas.getContext('2d')

      var originX = 0
      var originY = 0
      var originW = img.width
      var originH = img.height

      var canvasX = 0
      var canvasY = 0
      var canvasW
      var canvasH

      if (opts.type === 'scale') {
        var scale = opts.scale
        canvasW = (originW * scale) | 0
        canvasH = (originH * scale) | 0
      }

      canvas.width = canvasW
      canvas.height = canvasH

      console.log(originX, originY, originW, originH, canvasX, canvasY, canvasH, canvasW)
      ctx.drawImage(img, originX, originY, originW, originH, canvasX, canvasY, canvasW, canvasH)

      return canvas.toDataURL('image/jpeg', 0.7)
    })
}

function dataURL2Blob(dataURL) {
  var byteString
  if (dataURL.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURL.split(',')[1])
  } else {
    byteString = unescape(dataURL.split(',')[1])
  }

  var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]

  var bytes = new Uint8Array(byteString.length)
  for (var i = 0; i < byteString.length; i++) {
    bytes[i] = byteString.charCodeAt(i)
  }

  return new Blob([bytes], {
    type: mimeString
  })
}

export {
  dataURL2Blob,
  resize
}
