
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
  
  await mysql('t_user').select('*').where('OPEN_ID', ctx.query.openId).then(function (data) {
    ctx.state.data = data;
  })
  
}

async function userLogin(ctx, next) {
  console.log("ctx.query", ctx.query);
  
  await mysql('t_user')
  .where('OPEN_ID', ctx.query.openId)
  .update({
    LATITUDE: ctx.query.latitude,
    LONGITUDE: ctx.query.longitude,
    LOGIN_CITY:ctx.query.city,
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