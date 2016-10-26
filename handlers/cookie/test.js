import express from 'express'
import cookieParser from 'cookie-parser'
import processTestApp from '../../test/processTestApp'
import cookie, { handler as cookieHandler } from './'

describe('handlers', function () {
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

    describe('handler', function () {
      describe('SET_COOKIE', function () {
        it('should set a cookie when unsigned', function () {
          const app = express().use(cookieParser('secret'))

          return processTestApp(app, cookieHandler, function* (req, res) {
            yield cookie.set('unsigned', '123')
            expect(res._headers['set-cookie']).to.include('unsigned=123')
          })
        })

        it('should set a signed cookie when signed is true', function () {
          const app = express().use(cookieParser('secret'))

          return processTestApp(app, cookieHandler, function* (req, res) {
            yield cookie.set('signed', '456', { signed: true })
            const signed = 'signed=s%3A456.0ysdNf0RXEpJbgb9jfZ%2B7YBXaIsXFAos7zZcsjWBcQI; Path=/'
            expect(res._headers['set-cookie']).to.include(signed)
          })
        })
      })
    })
  })
})
