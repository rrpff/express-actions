import createHandler from '../../createHandler'

export const SET_COOKIE = 'SET_COOKIE'
export const GET_COOKIE = 'GET_COOKIE'

export default {
  get (key, options = {}) {
    return { type: GET_COOKIE, key, options }
  },

  set (key, value, options = {}) {
    return { type: SET_COOKIE, key, value, options }
  }
}

export const handler = createHandler({
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
