const http = require('http')
const searchTerm = process.argv.slice(2).join('+')

const getMovieData = (title) => {
  const url = `http://www.imdb.com/find?ref_=nv_sr_fn&q=${title}&s=all`
  console.log(url)
}

getMovieData(searchTerm)

module.exports = {
  getMovieData
}
