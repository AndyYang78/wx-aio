// pages/common/editValue.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parms:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options);
     this.setData({parms:options});
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
  formSubmit: function(e){
    //app.gData.editValue = e.detail.value
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var field = this.data.parms.field
    prevPage.setData({
      field: e.detail.value
    })
    wx.navigateBack({
      delta: 1
    })
  }
})