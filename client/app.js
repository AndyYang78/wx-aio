/**
 * @fileOverview 微信小程序的入口文件
 */
// 引入 QCloud 小程序增强 SDK
var qcloud = require('./vendor/wafer2-client-sdk/index');
// 引入配置
var config = require('./config');
var util = require('/common/util.js');
var bmap = require('/libs/bmap-wx.js');
const ak = 'bfwtSbwjqSnIPWGIjKssrQdsPZn0Q87g';
var wxMarkerData = [];
// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});
// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};
App({

  gData: {
    iServerUrl: "https://yfaq43ae.qcloud.la/weapp",
    userInfo: {},
    lbsUserInfo:{},
    location:{}
  },
  /**
   * 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
   */
  onLaunch() {
    var that = this;
    qcloud.setLoginUrl(config.service.loginUrl);
    console.log("小程序启动，设置登录地址：", config.service.loginUrl);

    console.log("************开始登录处理流程");
    //showBusy('正在登录');
    qcloud.login({
      success(result) {
        //showSuccess('登录成功');
        console.log('登录成功', result);
        that.gData.userInfo = result;
        
        that.updateLocation();


      },

      fail(error) {
        showModel('登录失败', error);
        console.log('登录失败', error);
      }
    });

  },

  

  updateLocation:function(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // success    
        that.gData.location.longitude = res.longitude
        that.gData.location.latitude = res.latitude
        
        console.log("location:", that.gData.location);
        that.loadCity(that.gData.location.longitude, that.gData.location.latitude);
        that.updateUserBiz();
        //that.loadCity(that.gData.longitude, that.gData.latitude)
      },
      fail: function (res) {
        console.log("fail:", res)
      },
      complete: function (res) {
        console.log("complete:", res)
      }
    })
    
  },

  updateUserBiz: function () {
    var that = this;
    console.log("更新登录用户业务信息",that.gData);
    wx.request({
      url: that.gData.iServerUrl + '/userLogin',
      data: {
        openId: that.gData.userInfo.openId,
        longitude: that.gData.location.longitude,
        latitude: that.gData.location.latitude,
        city: that.gData.location.city
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("用户业务信息", res.data)
        that.gData.lbsUserInfo = res.data.data[0];

        console.log("全局变量：", that.gData);
      }
    })
  },

  loadCity: function (longitude, latitude) {
    console.log("获取登录城市信息")
    var that = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + ak + '&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success    
        console.log("百度定位信息", res);
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        that.gData.location.city = city;
        that.gData.location.district = district;
      },
      fail: function () {
        that.gData.cityName = "获取定位失败";
      },

    })
  }
});