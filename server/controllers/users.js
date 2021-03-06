
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
  
  await mysql('t_user').select('*').where('openId', ctx.query.openId).then(function (data) {
    ctx.state.data = data;
  })
  
}

async function userLogin(ctx, next) {
  console.log("ctx.query", ctx.query);
  
  await mysql('t_user')
  .where('openId', ctx.query.openId)
  .update({
    latitude: ctx.query.latitude,
    longitude: ctx.query.longitude,
    loginCity:ctx.query.city,
    lastLoginTime: ctx.query.lastLoginTime
    //LEVEL:   
  })
  //.increment('LEVEL', 1)
  .then(function (data) {
    ctx.state.data = data;
  })

}
module.exports = {
  userLogin,
  userFindAll,
  discoverNearby,
  userList,
  userFindByOpenId
}