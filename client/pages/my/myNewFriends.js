// pages/friend/friend.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var util = require('../../common/util.js');
var wxMarkerData = [];
const ak = 'bfwtSbwjqSnIPWGIjKssrQdsPZn0Q87g'
var app = getApp()
var hasMore = false;
var hidden = false;
var pageNum = 0;
var len = 0;
var sports = ['羽毛球', '篮球', '网球'];
var location = '';
var query = '';
// 滑动条选项
var order = ['h1', 'h2', 'h3', 'h4', 'h5'];

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    tabs: ["找熊友", "场馆"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    cityName: "",
    sportsArray: ['羽毛球', '篮球', '网球'],
    distanceArray: ['5km内', '15km内', '30km内'],
    choiceSport: '',
    index1: 0,
    index2: 0,
    scrollTop: 0,
    scrollHeight: 0,
    selectFlag: false,
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    destinations: '',
    origins: '',
    //测试数据，等后台服务准备好后替换
    friendList: [],
    friendRequestList:[],
  },

  toNearby: function () {
    wx.navigateTo({
      url: 'map'
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });

      }
    });

    // //获取熊友初始数据
    // that.getUsers();

    //从全局变量获取城市信息和经纬度
    that.getCity();

    that.getUsers();


    //  that.getLocationInfo();

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

    this.setData({
      cityName: app.gData.cityName
    })
    this.setData({
      origins: app.gData.latitude + "," + app.gData.longitude
    });
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
 },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
 
  approveRequest: function (e) {
   var that = this;

    wx.request({
      // url: 'http://59.110.165.245/Lbs_back/servlet/PositionInsert', //位置新增接口地址
      url: 'https://littlebearsports.com/bearsport/service/friend/friendRequestApproval',
      data:{
        
        "params": {
          "friendOpenId": e.target.dataset.openid,
          "relationshipStatus": "1",
          "openId": app.gData.userInfo.openId
        }
      
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      
        console.log(res);
      },
      fail: function (res) {
        console.log('失败');
      }

    })
  },

  selectMore: function (e) {

    if (this.data.selectFlag == false) {
      this.setData({
        selectFlag: true
      });
    }
    else {
      this.setData({
        selectFlag: false
      });
    }
  },
  selectOk: function (e) {

    this.setData({
      selectFlag: false
    });


  },

  //好友审批
  getUsers: function (e) {

    var that = this;
    var dest = "";
    var iData = {};
    iData.operationCode = "UF"
    wx.request({
      url: app.gData.iServerUrl + '/bearsport/service/friend/friendRequestList?currentUserId=' + app.gData.userInfo.openId,
      //method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      method: 'GET',
      // header: {}, // 设置请求的 header
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log("获取熊友列表信息：", res.data);
        //var rlt = res.data.listData;  //result
        //console.log("rlt", rlt);
        if (res.data.result == "00000") {

          for (var i = 0; i < res.data.listData.length; i++) {

            res.data.listData[i].lastLoginTime = util.formatTimestamp(res.data.listData[i].lastLoginTime);
            if (dest != "") {
              dest = dest + "|"
            }
            dest = dest + res.data.listData[i].location.latitude + "," + res.data.listData[i].location.longitude
          }
        }
        console.log("location345", dest);

        that.setData({
          destinations: dest
        });
        that.setData({
          friendList: res.data.listData
        });

        //计算自己与好友间的距离
        that.getdistance()

        console.log("friend", that.data.friendList);

      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },

  //ܱ根据经纬度计算距离
  getdistance: function () {
    var that = this;
    console.log("aaa", that.data.destinations);
    console.log("bbb", that.data.origins)
    wx.request({
      url: 'http://api.map.baidu.com/routematrix/v2/driving?',
      data: {
        output: "json",
        origins: that.data.origins,    //坐标格式为：lat<纬度>,lng<经度>|lat<纬度>,lng<经度>  多个用|分开,最多传50个点，且起终点乘积不超过50
        destinations: that.data.destinations, // 同上
        ak: "x01RzuY9Guop6j45QvMhQGO7YqTlUp1i",
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success 
        console.log("ret", res.data);
        var status = res.data.status;
        var rst = res.data.result;
        console.log("rst", rst);
        var listData = that.data.friendList;

        for (var i = 0; i < rst.length; i++) {
          listData[i].distance = rst[i].distance;
        }

        console.log("listData111", listData);
        that.setData({
          friendList: listData
        });
      },
      fail: function () { },
      complete: function () { }
    })
  },



})
