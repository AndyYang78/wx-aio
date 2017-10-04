
const { mysql } = require('../qcloud')

async function actionFindAll(ctx, next) {
  console.log("actionFindAll_ctx:", ctx);
  await mysql('t_activity').then(function (data) {
    ctx.state.data = data;
  })
}

async function activityDetail(ctx, next){
  const actId =  ctx.query.actId;
  await mysql.select('a.id', 'a.actId', 'a.actType', 'a.feeType','a.planPeople', 'a.sprType', 'a.actDate', 'a.actTime','a.areaName', 'a.areaAddress', 'u.creditLevel').from(function(){
    this.select('id', 'actId','actType', 'feeType','planPeople', 'sprType', 'actDate', 'actTime','userId','openId','heat','createDate','actStatus','fee','areaName', 'areaAddress','areaLatitude','areaLongitude','wordInput','actSubject','nickName','contactNum','enrPeople').from('t_activity').where('actId', actId).as('a')
  }).innerJoin('t_user as u', 'a.openId', 'u.openId').then(function(data){
    ctx.state.data = data;
  })
}

async function getActJoiners(ctx, next){
  const actId = ctx.query.actId;
  await mysql('t_useractivity').select('*').where('actId', actId).then(function(data){
    ctx.state.data = data;
  })
}

async function joinActivity(ctx, next){
  const params = ctx.request.body;
  await mysql('t_useractivity').insert(params).then(function(data){
    ctx.state.data = data;
  })
}

  module.exports = {
    actionFindAll,
    activityDetail,
    getActJoiners,
    joinActivity
  }