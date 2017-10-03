var util = require("../../common/util")
var app = getApp();
Page({
  data: {
    isShow: false,//控制emoji表情是否显示
    isLoad: true,//解决初试加载时emoji动画执行一次
    content: "",//评论框的内容
    isLoading: false,//是否显示加载数据提示
    disabled: true,
    cfBg: false,
    _index: 0,
    comments:[],
    emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    //0x1f---
    emoji: [
      "60a", "60b", "60c", "60d", "60f",
      "61b", "61d", "61e", "61f",
      "62a", "62c", "62e",
      "602", "603", "605", "606", "608",
      "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
      "63a", "63b", "63c", "63d", "63e", "63f",
      "64a", "64b", "64f", "681",
      "68a", "68b", "68c",
      "344", "345", "346", "347", "348", "349", "351", "352", "353",
      "414", "415", "416",
      "466", "467", "468", "469", "470", "471", "472", "473",
      "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojis: [],//qq、微信原始表情
    alipayEmoji: [],//支付宝表情
    title: ''//页面标题
  },
  onLoad: function (options) {
    var that = this;
    that.findCommentByActId();
    var em = {}, that = this, emChar = that.data.emojiChar.split("-");
    that.data.emoji.forEach(function (v, i) {
      em = {
        char: emChar[i],
        emoji: "0x1f" + v
      };
      that.data.emojis.push(em)
    });
  },

  onReady: function () {
    // 页面渲染完成
    //设置当前标题
    wx.setNavigationBarTitle({
      title: this.data.title
    })
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
  //上拉加载
  onReachBottom: function () {
    var conArr = [], that = this;
    that.data.cfBg = false;
    console.log("onReachBottom")
    if (that.data._index < 5) {
      for (var i = 0; i < 5; i++) {
        conArr.push({
          avatar: app.gData.userInfo.avatarUrl,
          uName: "雨碎江南",
          time: util.formatTime2(new Date()),
          content: "我是上拉加载的新数据" + i
        })

      }
      //模拟网络加载
      setTimeout(function () {
        that.setData({
          comments: that.data.comments.concat(conArr)
        })
      }, 1000)
    } else {
      that.setData({
        isLoading: false
      })
    }
    ++that.data._index;
  },
  //解决滑动穿透问题
  emojiScroll: function (e) {
    console.log(e)
  },
  //文本域失去焦点时 事件处理
  textAreaBlur: function (e) {
    //获取此时文本域值
    console.log(e.detail.value)
    this.setData({
      content: e.detail.value
    })

  },
  //文本域获得焦点事件处理
  textAreaFocus: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },
  //点击表情显示隐藏表情盒子
  emojiShowHide: function () {
    this.setData({
      isShow: !this.data.isShow,
      isLoad: false,
      cfBg: !this.data.false
    })
  },
  //表情选择
  emojiChoose: function (e) {
    //当前输入内容和表情合并
    this.setData({
      content: this.data.content + e.currentTarget.dataset.emoji
    })
  },
  //点击emoji背景遮罩隐藏emoji盒子
  cemojiCfBg: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },

  //发送评论评论 事件处理
  send: function () {
    var that = this, 
    conArr = [];
   
      if (that.data.content.trim().length > 0) {
        conArr.push({
          commentSeq:'',
          actId: '0003',
          openId: app.gData.userInfo.openId,
          nickName: app.gData.userInfo.nickName,
          comment: that.data.content,
          commentDate: util.formatTime2(new Date()),
          replyCount: 0,
          goodCount: 0,
          avatarUrl: app.gData.userInfo.avatarUrl,
        })
        that.setData({
          comments: that.data.comments.concat(conArr),
          content: "",//清空文本域值
          isShow: false,
          cfBg: false
        })
        //数据发送到后台保存
        console.log("conArr", conArr);
        wx.request({
          url: app.gData.iServerUrl + '/addMainComment',
          data: { comment: conArr[0] },
          header: { 'content-type': 'application/json'  },
          method: 'GET',
          success: function (res) {
            let result = res.data;
            console.log("*******insert", result);
          },
          fail: function (res) { }
        })  //end request

      } else {
        that.setData({
          content: ""//清空文本域值
        })
      }

  },
  findCommentByActId: function () {
      var that = this;
     
      wx.request({
        url: app.gData.iServerUrl + '/findCommentByActId',
        data:{
          actId:"0003"
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          let  result = res.data.data;
          console.log("*******测试评论message", result);
        
            that.setData({
              comments: result
            });
        },
        fail: function (res) {
          console.log("查询评论失败");
        }
      })  //end request
  },
})