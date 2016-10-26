export function saga (handler, routeAction) {
  return function (req, res, next) {
    const generator = routeAction(req, res)

    function step (lastValue) {
      const { value, done } = generator.next(lastValue)
      if (done) return Promise.resolve()

      const processer = handler.run(value, req, res)
      return processer.then(step)
    }

    step(generator)
      .then(::res.end)
      .catch(next)
  }
}
