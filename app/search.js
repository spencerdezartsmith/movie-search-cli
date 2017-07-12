const http = require('http')
const cheerio = require('cheerio')

const searchIMDB = (searchTerm) => {
  http.get({
    host: 'www.imdb.com',
    path: `/find?ref_=nv_sr_fn&q=${searchTerm}&s=all`
  }, (res) => {
    const { statusCode } = res

    let error
    if (statusCode !== 200) {
      error = new Error(`Request Failed.\n Status Code: ${statusCode}`)
    }

    if (error) {
      console.error(error)
      res.resume
      return
    }

    res.setEncoding('utf8')
    let rawHTML = ''
    res.on('data', (chunk) => { rawHTML += chunk })
    res.on('end', () => { printTitles(getMovieTitles(rawHTML)) })
  }).on('error', (error) => console.error(error.message))
}

const getMovieTitles = (html) => {
  const $ = cheerio.load(html)
  const movieTitles = $('.findSection')
    .first()
    .find('.result_text')
    .map((i, elem) => $(elem).text())
    .toArray()

    return movieTitles
}

const printTitles = (titlesArr) => {
  titlesArr.forEach(title => console.log(title))
}

const runSearch = () => {
  const searchTerm = process.argv.slice(2).join('+')
  searchIMDB(searchTerm)
}

runSearch()

module.exports = {
  searchIMDB,
  getMovieTitles,
  runSearch
}
