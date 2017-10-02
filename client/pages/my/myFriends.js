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

var location = '';
var query = '';
var newFriendList = [];

var populateData = function(value) {
  return {
    "user": {
      "id": value.id,
      "userId": value.userId,
      "nickName": value.nickName,
      "gender": value.gender,
      "language": value.languange,
      "city": value.city,
      "province": value.province,
      "country": value.country,
      "avatarUrl": value.avatarUrl,
      "description": value.description,
      "level": value.level,
      "creditLevel": value.creditLevel,
      "favType1": value.favType1,
      "favType2": value.favType2,
      "favType3": value.favType3,
      "firstLoginTime": value.firstLoginTime,
      "lastLoginTime": value.lastLoginTime,
      "openId": value.openId,
      "latitude": value.latitude,
      "longitude": value.longitude,
      "loginCity": value.loginCity
    },
    "validationMessage": value.validationMsg,
    "relationshipStatus": value.relationshipStatus == '0' ? false : true,
    "applyStatus": value.relationshipStatus == '0' ? false : true
  };
};


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
    /**    newFriends: [{ nickName: "张三", applyMessage: "我是张三", time: "2017/09/17", applyStatus:false},
          { nickName: "李四", applyMessage: "我是李四", time: "2017/09/17", applyStatus: false},
          {
            nickName: "王二麻子", applyMessage: "赶紧的，加我", time: "2017/09/10", applyStatus: false
    },]**/
    newFriends: []
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

    that.getMyFriendsList();

    //  that.getLocationInfo();

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

    // 页面显示
    //获取熊友初始数据
    // this.getUsers();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  // tabClick: function (e) {
  //   this.setData({
  //     sliderOffset: e.currentTarget.offsetLeft,
  //     activeIndex: e.currentTarget.id
  //   });
  // },
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

  //获取熊友初始数据  -- 计算距离
  getUsers: function (e) {

    var that = this;
    var dest = "";
    var iData = {};
    iData.operationCode = "UF"
    wx.request({
      url: app.gData.iServerUrl + '/friends?currentUserId=' + app.gData.userInfo.openId,
      //method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      method: 'GET',
      // header: {}, // 设置请求的 header
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log("获取熊友列表信息：", res.data);
        //var rlt = res.data.listData;  //result
        //console.log("rlt", rlt);
        if (res.data.code == 0) {

          for (var i = 0; i < res.data.data.length; i++) {

            res.data.data[i].lastLoginTime = util.formatTimestamp(res.data.data[i].lastLoginTime);
            if (dest != "") {
              dest = dest + "|"
            }
            dest = dest + res.data.data[i].latitude + "," + res.data.data[i].longitude
          }
        }
        console.log("location345", dest);

        that.setData({
          destinations: dest
        });
        that.setData({
          friendList: res.data.data
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

  //好友审批
  getMyFriendsList: function (e) {

    var that = this;
    wx.request({
      url: app.gData.iServerUrl + '/friendRequestList?currentUserId=' + app.gData.userInfo.openId,
      //method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      method: 'GET',
      // header: {}, // 设置请求的 header
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log("===========" + app.gData.userInfo.openId);
        that.newFriendList = [];

        for (var i = 0; i < res.data.data.length; i++) {
          //if (res.data.data[i].relationshipStatus == 0) {
            //res.data.data[i].relationshipStatus = false;
            //that.newFriendList[i].applyStatus = false;
          var item = populateData(res.data.data[i]);
              that.newFriendList.push(item);
          //} else {
            //res.data.data[i].relationshipStatus = true;
            //that.newFriendList[i].applyStatus = true;
          //}
        }

        that.setData({
          newFriends: that.newFriendList
        });

        console.log("friend", that.data.newFriends);

      },

      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  //同意好友申请
  approveRequest: function (e) {
    var that = this;

    wx.request({
      // url: 'http://59.110.165.245/Lbs_back/servlet/PositionInsert', //位置新增接口地址
      //url: 'https://littlebearsports.com/bearsport/service/friend/friendRequestApproval',
      url: app.gData.iServerUrl + '/friendRequestApproval',
      data: {
          "friendOpenId": e.target.dataset.openid,
          "relationshipStatus": "1",
          "openId": app.gData.userInfo.openId
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '添加好友成功',
          icon: 'success',
          duration: 2000
        })

        for (var i = 0; i < (that.data.newFriends).length; i++) {
          if (e.target.dataset.openid == that.data.newFriends[i].user.openId) {
            that.newFriendList[i].applyStatus = true;
          }
        }
        that.setData({
          newFriends: that.newFriendList
        });
      },
      fail: function (res) {
        console.log('失败');
      }

    })
  },

  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  // 点击tab切换 
  swichNavi: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  apply: function (e) {
    console.log("接受按钮");
  }
})
