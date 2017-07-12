const http = require('http')
const cheerio = require('cheerio')

const searchIMDB = (searchTerm, cb) => {
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
    res.on('end', () => {
      const movieTitles = getMovieTitles(rawHTML)
      cb(null, movieTitles)
    })
  }).on('error', error => cb(error))
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

const printTitles = (titles) => {
  return titles.forEach(title => console.log(title))
}

const runSearch = () => {
  const searchTerm = process.argv.slice(2).join('+')

  searchIMDB(searchTerm, (error, movieTitles) => {
    if (error) throw error
    printTitles(movieTitles)
  })
}

if (require.main === module) {
  runSearch()
}

module.exports = {
  searchIMDB,
  getMovieTitles,
  printTitles,
  runSearch
}
