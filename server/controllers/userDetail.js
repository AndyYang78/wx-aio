const { mysql } = require('../qcloud');

module.exports = async (ctx, next) => {
  await mysql('t_user').select('*').where('openId', ctx.query.openId).then(function (data) {
    ctx.state.data = data;
  })
}