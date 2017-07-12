const expect = require('chai').expect
const search = require('../app/search')
const nock = require('nock')

describe('Movie Search Command Line Tool', () => {
  describe('searchIMDB', () => {
    it('can find all the titles for Rocky films', (done) => {
      nock('http://www.imdb.com')
        .get('/find')
        .reply(200, `
          <div class='findSection'>
            <table class="findList">
              <tr> <td class="result_text">Rocky (1976)</td> </tr>
              <tr> <td class="result_text">Rocky (1981)</td> </tr>
            </table>
          </div>
        `)

      search.searchIMDB('rocky', (err, results) => {
        console.log('hello friends')
        done()
      })
    })
  })

  afterEach(function() {
   nock.restore()
 })
})
