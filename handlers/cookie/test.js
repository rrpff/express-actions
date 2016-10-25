import cookie from './'

describe('cookie', function () {
  describe('actions', function () {
    it('should return a get cookie action when given a key', function () {
      const action = { type: 'GET_COOKIE', key: 'test', options: {} }
      expect(cookie.get('test')).to.deep.equal(action)
    })

    it('should return a get cookie action when given a key and options', function () {
      const action = { type: 'GET_COOKIE', key: 'test', options: { signed: true } }
      expect(cookie.get('test', { signed: true })).to.deep.equal(action)
    })

    it('should return a set cookie action when given a key and value', function () {
      const action = { type: 'SET_COOKIE', key: 'test', value: '12345', options: {} }
      expect(cookie.set('test', '12345')).to.deep.equal(action)
    })

    it('should return a set cookie action when given a key, value, and options', function () {
      const action = { type: 'SET_COOKIE', key: 'test', value: '12345', options: { signed: true } }
      expect(cookie.set('test', '12345', { signed: true })).to.deep.equal(action)
    })
  })
})
