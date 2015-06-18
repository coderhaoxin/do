'use strict'

/**
 * remove html tag
 */
function removeTag(s) {
  return String(s).replace(/(<([^>]+)>)/ig, '')
}

/**
 * wrap word by tag
 */
function tagWord(str, words, tag) {
  str = String(str)

  if (typeof words === 'string') {
    words = [words]
  }

  words.forEach((word) => {
    var reg = word
    if (!(reg instanceof RegExp)) {
      reg = new RegExp(word, 'gi')
    }

    str = str.replace(reg, '<' + tag + '>' + word + '</' + tag + '>')
  })

  return str
}

export { removeTag, tagWord }
