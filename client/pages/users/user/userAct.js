// pages/friend/showFriendAct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = options.openid;
    
    wx.request({
      url: 'http://localhost:3000/active/selectMyActive',//活动明细查询接口地址
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var result = res.data;
        console.log(result[0]);
        that.setData({
          activeInfo: result
        });

      }
    })
  },
  //查询参加的活动
  selectJoinActive: function () {
    var that = this;
    console.log("selectJoinActive openid:" + openid);
    wx.request({
      url: 'http://localhost:3000/active/selectMyJoin',//活动明细查询接口地址
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var result = res.data;
        console.log(result[0]);
        that.setData({
          activeInfo: result
        });

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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})