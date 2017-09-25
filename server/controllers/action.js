

async function findAll(ctx, next) {
  ctx.state.data = { msg: 'Hello World' }
}

  module.exports = {
    findAll
  }