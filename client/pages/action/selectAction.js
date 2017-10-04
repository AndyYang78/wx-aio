//获取应用实例
var app = getApp()
var util = require('../../common/util.js')
// pages/action/selectAction.js
var actId = ''
var storeData={};
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data:{
   // MenlistFlag:true,
    joinners:[],
    activeInfo:{},
    tabs: ["活动详情", "参加人员"],
    activeIndex: "0",
     sliderOffset: 0,
     sliderLeft: 0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    actId = options.actId;

        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
                });
                that.selectActive(actId);
            }
        }); 
  },

  selectActive: function (actId) {
    console.log("a啊啊："+actId);
    var that = this;
       wx.request({
         //url: 'https://littlebearsports.com/bearsport/service/activity/activityMaintain' ,//活动明细查询接口地址
         url: app.gData.iServerUrl + "/activityDetail?actId=" + actId,
            //data: {
            //  actId: actId ,
              //"operationCode": "FAD"
             // sprType:"羽毛球"
            //},
            header: {

                'content-type': 'application/json'
            },
            method: 'GET', 
            success: function(res) {
              var result = res.data.data;
              result[0].actDate = util.formatOnlyDate(new Date(result[0].actDate), "-")
              console.log("message1",result);
                console.log(result[0]);
                that.setData({
                  activeInfo:result[0]
                });
            }
        })
  },
  //活动报名，新增记录
 
  addAct:function(){
      wx.getStorage({
        key: 'userInfo',
        success: function(res) {
          storeData=res.data;
          console.log("storeData:",storeData);
        } 
      }),

   //跳出确认对话框
    wx.showModal({
      title: '提交',
      content: '确认参加活动？',
      success: function(res) {
        if (res.confirm) {
          //点击确认
             wx.request({
               url: 'https://littlebearsports.com/bearsport/service/userActivity/userActivityMaintain',
             data: {
                actId:actId,
                openId :app.gData.userInfo.openId,
                joinRemark:'',
                operationCode:"ACA",
                joinerName: app.gData.userInfo.nickName
              },
             method: 'POST', 
             success: function(res){
           
                var results=res.data.errorCode;
                console.log("addACT:",results);
                if(results[0] == "10000"){
                 //操作成功提示
                   wx.showToast({
                      title: '您已报名过该活动',
                      icon: 'success',
                      duration: 2000
                    })
                }else{
                  //已经报名
                  //操作成功提示
                  wx.showToast({
                     title: '成功',
                      icon: 'success',
                     duration: 2000
                  })
                } 
            },  //sucess-end
              fail: function(res) {
                   wx.showToast({
                     title: '请稍后再试',
                      icon: 'success',
                     duration: 2000
                  })
              }
               
       })
      } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
  },
  //查看活动参加人信息
  showJoin:function(){
    var that=this;
    that.selectJoin();
  },

//发送查询参与人信息请求
 selectJoin:function(){
     //发送请求查询参加人员信息
     var that = this;
           wx.request({
             //url: 'https://littlebearsports.com/bearsport/service/userActivity/getActivityJoiners',
             url: app.gData.iServerUrl + '/joiners?actId=' + actId,
             //data: { actId:actId },
             method: 'GET', 
      
             success: function(res){
            // success
                var tt=res.data;
                for (var i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].joinDate = util.formatOnlyDate(new Date(res.data.data[i].joinDate),"-");

                }
                console.log("selectJoiner:", res);
                that.setData({
                  joinners: res.data.data
                });
              },
              fail: function(res) {
        
              }
              
           })
 },
 
  tabClick: function (e) {
      var that = this;
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
      if(e.currentTarget.id==1){
        that.showJoin();
      }
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