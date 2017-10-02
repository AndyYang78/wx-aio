// pages/friends/friend/applyFriend.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
   applyOpenId:"",
   applyMessage:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.applyOpenId = options.openId;
    this.data.applyMessage = options.applyMessage;
    console.log("applyOpenId", this.data.applyOpenId);
  },

  applyMessage:function(e) {
    this.setData({
      applyMessage:e.detail.value
    })
  },

  formSubmit: function(e){
    console.log(e);
    wx.request({
      //url: app.gData.iServerUrl + '/bearsport/service/friend/makeFriend',
      url: app.gData.iServerUrl + '/makeFriend',
      method: 'POST',
      data:  {
          "friendOpenId": this.data.applyOpenId,
          "openId": app.gData.userInfo.openId,
          "validationMsg":this.data.applyMessage
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})