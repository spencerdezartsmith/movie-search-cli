require('sepia')
const expect = require('chai').expect
// const nock = require('nock')
const { searchIMDB, getMovieTitles } = require('../app/search')


describe('sepia', () => {
  it('can find rocky', (done) => {
    searchIMDB('rocky', (err, result) => {
      expect(err).to.be.null
      expect(result).to.have.length(2)
      done()
    })
  })
})

// describe('nock it out', () => {
//   nock('http://www.imdb.com')
//     .get('/find')
//     .reply(200, `
//       <div class='findSection'>
//         <table class="findList">
//           <tr> <td class="result_text">Rocky</td> </tr>
//           <tr> <td class="result_text">Rocky II</td> </tr>
//         </table>
//       </div>
//       <div class='findSection'>
//         <table class="findList">
//           <tr> <td class="result_text">do not return</td> </tr>
//         </table>
//       </div>
//     `)
//
//   it('can find rocky', (done) => {
//     searchIMDB('rocky', (err, result) => {
//       expect(err).to.be.null
//       expect(result).to.have.length(2)
//       done()
//     })
//   })
//
//   afterEach(() => {
//     nock.restore()
//   })
// })

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
    expect(result).to.deep.eq(['Rocky (1976)', 'Rocky (1981)'])
    done()
  })
})
