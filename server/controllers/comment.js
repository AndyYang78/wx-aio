
const { mysql } = require('../qcloud')
//const { mysql } = qcloud

//根据活动ID查询主评论
async function findCommentByActId(ctx, next) {
  console.log("comment_ctx:", ctx);
  await mysql('t_mainComment').select('*').where('actId', ctx.query.actId).then(function (data) {
    ctx.state.data = data;
  })

}





module.exports = {
  findCommentByActId,
}