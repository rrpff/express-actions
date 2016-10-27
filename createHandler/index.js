module.exports = function createHandler (handlers) {
  return {
    async run (action, ...args) {
      const handler = handlers[action.type]
      await handler(action, ...args)
    }
  }
}
