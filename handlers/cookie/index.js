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
