const createHandler = require('../../createHandler')

const SET_COOKIE = exports.SET_COOKIE = 'SET_COOKIE'
const GET_COOKIE = exports.GET_COOKIE = 'GET_COOKIE'

exports.get = function (key, options = {}) {
  return { type: GET_COOKIE, key, options }
}

exports.set = function (key, value, options = {}) {
  return { type: SET_COOKIE, key, value, options }
}

exports.handler = createHandler({
  [GET_COOKIE] (action, req, res) {
    if (action.options.signed) {
      return res.signedCookies[action.key]
    } else {
      return res.cookies[action.key]
    }
  },

  [SET_COOKIE] (action, req, res) {
    res.cookie(action.key, action.value, action.options)
  },
})
