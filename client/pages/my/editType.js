// pages/my/editType.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.gData.userInfo
    });
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
  
  },
  //确认修改
  formSubmit: function (e) {

    app.gData.userInfo.favType1 = e.detail.value.favType1;
    var iData = app.gData.userInfo;
    iData.operationCode = "UPD";
    wx.request({
      url: app.gData.iServerUrl + '/bearsport/service/user/userMaintain',
      data: iData,
      method: 'POST',
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log("获取用户详情信息：", res);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    }) 
    wx.navigateBack({
      delta: 1
    })

  }
})