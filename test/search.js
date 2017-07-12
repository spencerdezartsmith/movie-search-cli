const expect = require('chai').expect
const search = require('../app/search')

describe('Movie Search Command Line Tool', () => {
  describe('#searchIMDB', () => {
    it('is a function', () => {
      expect(search.searchIMDB).to.be.a('function')
    })
  })

  describe('#getMovieTitles', () => {
    it('is a function', () => {
      expect(search.getMovieTitles).to.be.a('function')
    })
  })

  describe('#run',() => {
    it('is a function', () => {
      expect(search.run).to.be.a('function')
    })
  })
})
