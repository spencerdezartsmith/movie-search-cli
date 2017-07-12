const expect = require('chai').expect
const { searchIMDB, getMovieTitles } = require('../app/search')

describe('the easy way', () => {
  it('can find rocky', (done) => {
    searchIMDB('rocky', (err, result) => {
      expect(err).to.be.null
      expect(result).to.have.length(2)
      done()
    })
  })
})

describe('unit testing', () => {
  it('can find the titles for rocky', (done) => {
    const html = `
      <div class='findSection'>
        <table class='findList'>
          <tr><td class='result_text'>Rocky (1976)</tr></td>
          <tr><td class='result_text'>Rocky (1981)</tr></td>
        </table>
      </div>
    `
    const result = getMovieTitles(html)
    expect(result).to.be.an('array')
    expect(result).to.have.length(2)
    done()
  })
})
