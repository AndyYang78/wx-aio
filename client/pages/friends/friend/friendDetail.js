// pages/friend/showFriend.js
var app = getApp()
var util = require('../../../common/util.js');
Page({
  data:{
   person:[],
   grids: [0, 1, 2, 3, 4, 5],
   myActiveCount:0,
   openId:'',
   friends: [{ name: "老猫", actParticipate: 100,level:4,avatarUrl:"http://www.qqleju.com/uploads/allimg/160622/22-101309_76.jpg"},
     { name: "猪八戒", actParticipate: 80 ,level:7,avatarUrl: "http://www.qqleju.com/uploads/allimg/160622/22-101309_76.jpg" }, 
     { name: "沙和尚", actParticipate: 50, level:2,avatarUrl: "http://www.qqleju.com/uploads/allimg/160622/22-101309_76.jpg" },]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  console.log("页面接收参数：",options)
  var that = this;  
  that.setData({   
    openId:options.openId,
  });
  
  that.getActiveCount(); 
   
 //获取用户信息
  var iData = {};
  iData.operationCode = "UFO";
  iData.openId = this.data.openId;
  wx.request({
    url: app.gData.iServerUrl + '/bearsport/service/user/userMaintain',
          data: iData,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
             console.log("获取用户详情信息：",res); 
             res.data.listData[0].lastLoginTime=util.getLocalTime(res.data.listData[0].lastLoginTime);
             res.data.listData[0].firstLoginTime=util.getLocalTime(res.data.listData[0].firstLoginTime);

             that.setData({ 
                person:res.data.listData[0] 
               }); 
            
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })


},
   
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
   
  //查询参加的活动数量
  getActiveCount: function () {
    var that=this;
    console.log("oid111:" + that.data.openId);
    wx.request({
      url: 'https://localhost:3000/active/myActiveCount',
      data: { openId: that.data.openId },
      method: 'get',
      success: function (res) {
        console.log("count:" + res.data);
        that.setData({
          myActiveCount: res.data
        })
      },
      fail: function (res) {
        console.log("showfriend fail");
      },
      complete: function (res) {
        // complete
      
      }
    })
  },

  submit:function(){

    wx.showActionSheet({
      itemList: ['留言', '约战', '申请入圈'],
      success: function (res) {
        
        switch (res.tapIndex) {
          case 0:
            break;
          case 1:
            wx.navigateTo({
              url: '../common/bbs?value=' + app.gData.userInfo.openId + '&type=text&desc=请留言'
            })
            break;
          case 2:
            break;
          case 3:
            break;
          default:
            
        }
        
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
})