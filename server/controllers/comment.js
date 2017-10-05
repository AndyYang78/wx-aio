
const { mysql } = require('../qcloud')
//const { mysql } = qcloud

//根据活动ID查询主评论
async function findCommentByActId(ctx, next) {
  console.log("comment_ctx:", ctx);
  await mysql('t_mainComment').select('*').where('actId', ctx.query.actId).then(function (data) {
    ctx.state.data = data;
  })
}

  //根据活动ID查询回复评论
  async function findReplyCommentByActId(ctx, next) {
    let comments={};
  //  查询主评论
    await mysql('t_mainComment').select('*').where('actId', ctx.query.actId).andWhere('commentSeq', ctx.query.commentSeq).then(function (data) {
      comments.mainComment=data;
    })
    //查询评论回复
    await mysql('t_replyComment').select('*').where('actId', ctx.query.actId).andWhere('mainCommentSeq', ctx.query.commentSeq).then(function (data) {
      comments.replyComment = data;
      ctx.state.data=comments;
    })
}

//新增主评论
async function addMainComment(ctx, next) {
  console.log("ctx.request", ctx.request);
  console.log("ctx.query", ctx.query);
  const params = ctx.query;
  await mysql('t_mainComment').insert(params).then(function (data) {
    ctx.state.data = data;
  })
}
//新增评论回复
async function addReplyComment(ctx, next) {
  //console.log("****insert comment******", ctx);
  const params = ctx.query;
  
  await mysql('t_replyComment').insert(params).then(function (data) {
    ctx.state.data = data;
  })
}


module.exports = {
  findCommentByActId,
  findReplyCommentByActId,
  addMainComment,
  addReplyComment,
}