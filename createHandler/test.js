import createHandler from './'

describe('createHandler', function () {
  const handler = createHandler({
    'GET_TEST_VALUE' (action, spy) {
      spy.seen = true
    }
  })

  it('should return a handler which can run actions', async function () {
    const spy = {}
    await handler.run({ type: 'GET_TEST_VALUE' }, spy)
    expect(spy.seen).to.eq(true)
  })
})
