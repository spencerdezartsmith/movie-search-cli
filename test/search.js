const expect = require('chai').expect
const search = require('../app/search')

describe('Movie Search Command Line Tool', () => {
  describe('Searches IMDB for movie via get request', () => {
    it('returns movie data from IMDB', () => {
      const nemoHTML = search.getMovieData('findingnemo')

      expect(nemoHTML).to.be.a('string')
    })
  })
})
