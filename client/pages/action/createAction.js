//获取应用实例
var app = getApp();
var util = require('../../common/util.js');
// pages/action/createAction.js
var openId='';
var storage = {};
Page({
  data:{ 
   // subject:"",
    actDate:"",
    actTime:"",
    dateDisabled:false,
    userInfo: {},
    actTypes: ["约战","陪练","看比赛"],
    actTypeIndex: 0,
    sprTypes: ["足球","篮球","羽毛球"],
    sprTypeIndex: 0 ,
    feeTypes: ["均摊","我请客","比赛决定"],
    feeTypeIndex: 0,
    actTerms: ["只一次","每天","周一至周五","周末"],
    actTermIndex: 0,
    actTermDisabled: false,
    message:'',
    areaName:' ',
    areaAddress:' ',
    planPeople:'0',
    words:'',
    hideSearch: false,
    action:{},
    latitude:"",
    longitude:""
  },
  
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
   // console.log('createAction onLoad', options);
    var that = this
    //调用应用实例的方法获取全局数据
      wx.getStorage({
        key: 'userInfo',
        success: function(res) {
          openId=res.data.openid;
          storage = res.data;
         } 
      })
      //获取nagative带来的参数
      that.setData({
      areaName: options.areaName
    })
      that.setData({
      areaAddress: options.areaAddress
    })
      that.setData({
        latitude: options.latitude
      })
    that.setData({
      longitude:options.longitude
    })
    that.setDateAndTime()
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
  
//表单提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this;
    console.log("action:" + that.data.action);
    var iData = e.detail.value;
    iData.operationCode = 'CA'
    iData.nickName = app.gData.userInfo.nickName
    iData.openId = app.gData.userInfo.openId
    iData.userId = app.gData.userInfo.userId
   // iData.areaLocation.latitude = this.data.latitude
   // iData.areaLocation.longitude = this.data.longitude
    console.log("创建活动发送数据",iData);
    wx.request({
      // url: 'http://59.110.165.245/Lbs_back/servlet/PositionInsert', //位置新增接口地址
      url: 'https://littlebearsports.com/bearsport/service/activity/activityMaintain',
      data: iData,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log("创建活动返回信息", res.data)
        //活动成果后页面跳转
        wx.switchTab({
          url: 'actionList',
          complete: function (res) {
            console.log(res)
          }
        })
      },
      fail: function (res) {
        console.log('失败');
      }

    })



  },
   

  setDateAndTime:function (){
    var that = this
    //设置当前日期和时间
    that.setData({
      actDate: util.formatOnlyDate(new Date,'-'),
      actTime: util.formatHourAndMinu(new Date,':')
    });
    console.log('date:'+that.data.date+",time:"+that.data.time)
  },
//输入活动标题时
  actSubjectChange:function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },

//活动类型改变
  actTypeChange:function(e){
    this.setData({
      actTypeIndex: e.detail.value
    })
  },
//运动类型改变
  sprTypeChange:function(e){
    this.setData({
      sprTypeIndex: e.detail.value
    })
    console.log("choice:"+e.detail.value);
    // //查找按钮隐藏判断，跑步不用查找场馆
    // if (e.detail.value == 0) {
    //   this.setData({
    //     hideSearch: true
    //   })
    // } else {
    //   this.setData({
    //     hideSearch: false
    //   })
    // }
  },
//活动周期改变
  actTermChange:function(e){
    this.setData({
      actTermIndex: e.detail.value
    })
  },

//活动日期改变
  actDateChange:function(e){
    this.setData({
      actDate: e.detail.value
    })
  },
//活动时间改变
  actTimeChange:function(e){
    this.setData({
      actTime: e.detail.value
    })
  },
//输入场馆名称
  areaNameInput: function (e) {
    this.setData({
      areaName: e.detail.value
    })
   
  },
//输入场馆地址
  areaAddressInput: function (e) {
    this.setData({
      areaAddress: e.detail.value
    })
  },
// //计划人数
//   planPeopleInput:function(e){
//     this.setData({
//       planPeople: e.detail.value
//     })
//   },
//费用类型改变
  feeTypeChange:function(e){
    this.setData({
      feeTypeIndex: e.detail.value
    })
  },
//留言输入
  wordsInput:function(e){
    this.setData({
      words: e.detail.value
    })
  },
 
 
     


//点击提交后页面跳转
   submitActive:function (e) {
     var that = this;
     console.log("action:" + that.data.action);
     wx.request({
       // url: 'http://59.110.165.245/Lbs_back/servlet/PositionInsert', //位置新增接口地址
       url: 'https://littlebearsports.com/bearsport/service/activity/activityMaintain',
       data: {
         operationCode:'CA',
         actSubject: that.data.actTitle,                             //活动标题
         sprType: that.data.sprTypes[that.data.sprTypeIndex],        //活动类型
         actType: that.data.actTypes[that.data.actTypeIndex],       //运动类型
         feeType: that.data.feeTypes[that.data.feeTypeIndex],       //费用类型
         feeEst : 1 ,                                               //费用预估
         planPeople: that.data.planPeople,                          //人数限制
         actDate: that.data.actDate,                                //活动日期
         actTime: that.data.actTime,                                //活动时间
        // actTerm: that.data.actTerms[that.data.actTermIndex],
         areaName: that.data.areaName,                              //场馆名称
         areaAddress: that.data.areaAddress,                        //场馆地址
         areaLocation: { "latitude": 34.34, "longitude": 108.94 },  //场馆坐标
         openId: openId,    //后续添加ID标记发起用户
         wordsInput: that.data.words,                               //留言
       },
       header: {
         'content-type': 'application/json'
       },
       method: 'POST', 
       success: function (res) {
      console.log("创建活动返回信息",res.data)
        //活动成果后页面跳转
         wx.switchTab({
           url: 'actionList',
           complete: function (res) {
             console.log(res)
           }
         })
      },
      fail:function(res){
        console.log('失败');
      }
       
     })




 
     },
  

})
