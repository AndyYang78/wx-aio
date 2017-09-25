//获取应用实例
var app = getApp()
var util = require('../../common/util.js')
// pages/action/selectAction.js
var actId = ''
var storeData={};
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var openId='';
Page({
  data:{
   // MenlistFlag:true,
    joinners:[],
    activeInfo:{},
    tabs: ["发起的活动", "参加的活动"],
    activeIndex: "0",
     sliderOffset: 0,
     sliderLeft: 0,
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.selectMyActive();
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
                
                });
            }
        });  
  },
//查询发起的活动
  selectMyActive: function () {
    var that = this;
       wx.request({
            url: 'https://littlebearsports.com/bearsport/service/activity/activityMaintain' ,//活动明细查询接口地址
            data: {
                openId:app.gData.userInfo.openId,
                operationCode:"AFO"
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
            success: function(res) {
              var result=res.data.listData;
          for (var i = 0; i < result.length; i++) {
            result[i].actDate = util.formatOnlyDate(new Date(result[i].actDate),"-")
          }
              console.log(result[0]);
               that.setData({
                 activeInfo:result
               });
              
            }
        })
  },
  //查询参加的活动
  selectJoinActive: function () {
    var that = this;
    console.log("selectJoinActive openid:" + openId);
    wx.request({
      url: 'http://localhost:3000/active/selectMyJoin',//活动明细查询接口地址
      data: {
        openId: app.gData.userInfo.openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var result = res.data;
        console.log(result[0]);
        that.setData({
          activeInfo: result
        });

      }
    })
  },


  tabClick: function (e) {
      var that = this;
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
      if(e.currentTarget.id==0){
        that.selectMyActive(); //发起的活动查询
      }else{
        that.selectJoinActive();  //参加的活动查询
      }
      //根据点击的tab调用不同的事件处理
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
})