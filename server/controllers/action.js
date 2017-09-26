
const { mysql } = require('../qcloud')

async function actionFindAll(ctx, next) {
  console.log("actionFindAll_ctx:", ctx);
  await mysql('t_activity').then(function (data) {
    ctx.state.data = data;
  })
}

  module.exports = {
    actionFindAll
  }