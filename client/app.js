/**
 * @fileOverview 微信小程序的入口文件
 */
// 引入 QCloud 小程序增强 SDK
var qcloud = require('./vendor/wafer2-client-sdk/index');
// 引入配置
var config = require('./config');

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
    userInfo: {}
  },
  /**
   * 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
   */
  onLaunch() {
    qcloud.setLoginUrl(config.service.loginUrl);
    console.log("小程序启动，设置登录地址：", config.service.loginUrl);

    console.log("************开始登录处理流程");
    showBusy('正在登录');
    qcloud.login({
      success(result) {
        showSuccess('登录成功');
        console.log('登录成功', result);
      },

      fail(error) {
        showModel('登录失败', error);
        console.log('登录失败', error);
      }
    });

  }


});