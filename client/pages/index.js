//index.js
var common = require('../common/common.js')
var app = getApp()
//var hasMore=false;
//var pageNum=0;
//var len = 0;
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    toutiao: [
      '乘风破浪，开张大吉！',
      '合作伙伴招募,乘风破浪，开张大吉！新人大礼包，速速领取！',
      '合作伙伴招募'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,

    inputShowed: false,
    inputVal: "",
    arrayList: [], 
    userInfo: {},
    cityName:"",
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    animationData: {}
  }, 
  
  onLoad: function(options) {
    var that = this;
    console.log("cityName:" + app.gData.cityName); 
    
    that.getCity();
    

      //that.getdistance();
     
//  app.userInfo(function(userInfo){
//       //更新数据
//       that.setData({
//         userInfo:userInfo
//       })
//     })



 
       
  },
  onShow: function () {
    console.log("onShow")
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 5000,
      timingFunction: 'linear',
    })

    this.animation = animation

    animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.translate(30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },
  rotateAndScale: function () {
    // 旋转同时放大
    this.animation.rotate(45).scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateThenScale: function () {
    // 先旋转后放大
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  rotateAndScaleThenTranslate: function () {
    // 先旋转同时放大，然后平移
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  },
  //获取城市信息
  getCity: function () {


    this.setData({
      cityName: app.gData.cityName
    });


  },

  library: function (e) {
    wx.navigateTo({
      url: './library/library'
    })
  },
})
