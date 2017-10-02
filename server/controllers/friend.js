const { mysql } = require('../qcloud')

async function makeFriend(ctx, next) {
  const params = ctx.request.body;
  /*await mysql('t_friends').insert({ openId: params.openId, 
                                    friendOpenId: params.friendOpenId, 
                                    relationshipStatus: '0', 
                                    validationMsg: params.validationMsg }).
       then(function (data) {
          ctx.state.data = data;
  })*/
  await mysql('t_friends').insert(params).then(function (data) {
      ctx.state.data = data;
    })
}

async function fetchFriendList(ctx, next) {
  await mysql.select('*').from(function(){
    this.select('friendOpenId as id').from('t_friends').where('openId', ctx.query.currentUserId).andWhere('relationshipStatus', '1').as('a')
  }).innerJoin('t_user', 't_user.openId', 'a.id').union(function(){
    this.select('*').from(function () {
      this.select('openId as id').from('t_friends').where('friendOpenId', ctx.query.currentUserId).andWhere('relationshipStatus', '1').as('b')
    }).innerJoin('t_user', 't_user.openId', 'b.id')
  }).then(function (data) {
    ctx.state.data = data;
  })
}

async function friendRequestList(ctx, next) {
  await mysql.select('u.id as id', 'u.userId as userId', 'u.nickName as nickName', 'u.gender as gender', 'u.language as language', 'u.city as city', 'u.province as province', 'u.country as country', 'u.avatarUrl as avatarUrl', 'u.description as description', 'u.level as level', 'u.creditLevel as creditLevel', 'u.favType1 as favType1', 'u.favType2 as favType2', 'u.favType3 as favType3', 'u.firstLoginTime as firstLoginTime', 'u.lastLoginTime as lastLoginTime', 'u.openId as openId', 'u.latitude as latitude', 'u.longitude as longitude', 'u.loginCity as loginCity', 'a.validationMsg as validationMsg', 'a.relationshipStatus as relationshipStatus').from(function () {
    this.select('friendOpenId as friendOpenId', 'validationMsg as validationMsg', 'openId as openId', 'relationshipStatus as relationshipStatus').from('t_friends').where('friendOpenId', ctx.query.currentUserId)
    //.andWhere('relationshipStatus', '1')
    .as('a')
  }).innerJoin('t_user as u', 'u.openId', 'a.openId').then(function (data) {
    ctx.state.data = data;
  })
}

async function updateRelationshipStatus(ctx, next){
  const params = ctx.request.body;
  await mysql('t_friends').where('openId', '=', params.openId).andWhere('friendOpenId', '=', params.friendOpenId).update('relationshipStatus', params.relationshipStatus).then(function(data){
    ctx.state.data = data;
  });
}

module.exports = {
  makeFriend,
  fetchFriendList,
  friendRequestList,
  updateRelationshipStatus
}