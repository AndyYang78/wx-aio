// pages/discovery/placeList.js

// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
const ak = 'bfwtSbwjqSnIPWGIjKssrQdsPZn0Q87g'
var app = getApp()
var hasMore = false;
var hidden = false;
var pageNum = 0;
var len = 0;
var location = '';
var query = '';
Page({
  data: {
    cityName: "",
    scrollTop: 0,
    scrollHeight: 0,
    sprType:''

  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      sprType:options.sprType
    });

    console.log("sprType:" + that.data.sprType);
    // 页面初始化 options为页面跳转所带来的参数
  

    //调用百度
    that.getCity();
    that.loadBaiDu();

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },




  //调用百度api获取数据
  loadBaiDu: function (pageNum, query) {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: ak
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {

      wxMarkerData = data.wxMarkerData;
     
      len = wxMarkerData.length;
      if (len === 0) {
        console.log("没有了");
        return;
      };
     
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });

      //发送数据到后台台
      that.sendData(wxMarkerData);

    }

    // 发起POI检索请求 
    //console.log(location);
    BMap.search({
      "query": this.data.sprType || '羽毛球',
      fail: fail,
      success: success,
      // 此处需要在相应路径放置图片文件 
      iconPath: '../../img/marker_red.png',
      // 此处需要在相应路径放置图片文件 
      iconTapPath: '../../img/marker_red.png',
      page_num: pageNum
    });

  },

  //发送数据请求
  sendData: function (datas) {
    console.log(datas);
    wx.request({
      url: 'https://59.110.165.245/Lbs_back/servlet/PositionInsert', //位置新增接口地址
      data: {
        positions: datas
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },

  //上拉获取更多
  loadMore: function () {
    var that = this;
    that.setData({
      hasMore: true
    });
    pageNum = pageNum + 1;
    this.loadBaiDu(pageNum, query);
    that.setData({
      hasMore: false
    });
    console.log("down" + pageNum);
  },
  //下拉刷新
  doFresh: function () {

    (pageNum == 0) ? pageNum = 0 : pageNum = pageNum - 1;
    this.loadBaiDu(pageNum, query);
    console.log("up" + pageNum);

  },
  //获取城市信息
  getCity: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: ak
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });

      that.setData({
        cityName: wxMarkerData[0].city
      });
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
      //  iconPath: '../../img/marker_red.png', 
      //  iconTapPath: '../../img/marker_red.png' 
    });

  },
  //点击场馆跳转回新增活页面
  choicePlace:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;   //获取被点击list的Id 
    var place = that.data.markers[id];
    var pages = getCurrentPages();   //获取当前的页面栈
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      areaName: place.title,
      areaAddress: place.address,
      latitude: place.latitude,
      longitude: place.longitude
    })
    wx.navigateBack();
  },


})