// pages/discovery/placeDetail.js
Page({
  data:{
    place:{},
    trainer: [
      { avatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI8PEStcoheI3qib7F5Qr5SQlp5CCaMCpzyGq7DiaibpolsN1pmRHLY0TgdLKDviaNZhdNy91YOicAbU7g/0" }, 
    { avatar:"http://wx.qlogo.cn/mmhead/PiajxSqBRaELydAya2EC9Mm6C0UtuD1O5Eia8quYRbvXrzMicbl44Cd1A/132"},
    { avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqNtOcrlVe81WSq9mOEVtzc91YRY5BI6nico6G7MXia0RGXtb7UFYLQWuzgJYrGRXfLiaOvjBDYRUFmA/0" }]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
     
     place:options,
      
   });

    
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

  //点击添加活动
  addAction:function(){
    wx.navigateTo({
      url: '../action/createAction?areaAddress=' + this.data.place.address + '&areaName=' + this.data.place.title
    })
  }

  
})