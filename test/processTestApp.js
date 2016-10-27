const http = require('http')
const MockRequest = require('supertest').Test
const { saga } = require('../')

module.exports = function processTestApp (app, handler, scenario) {
  app.use(saga(handler, scenario))

  return new Promise(function (accept, reject) {
    const server = http.createServer(app)
    const mock = new MockRequest(server, 'get', '/')
    mock.expect(200).end(function (err, res) {
      if (err) reject(err)
      accept()
    })
  })
}
