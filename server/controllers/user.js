
const { mysql } = require('../qcloud')
//const { mysql } = qcloud


async function userFindAll(ctx, next) {
  await mysql('cSessionInfo').select('*').then(function (data) {
    ctx.state.data = data;
  })
  
}

async function discoverNearby(ctx, next) {
  await mysql('t_user').select('*').then(function (data) {
    ctx.state.data = data;
  })

}

async function userList(ctx, next) {
  ctx.state.data = { msg: 'Hello World' }
}

async function userFindByOpenId(ctx, next) {
  ctx.state.data = { msg: 'Hello World' }
}


module.exports = {
  userFindAll,
  discoverNearby,
  userList,
  userFindByOpenId
}