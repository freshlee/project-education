// index.js
var WxParse = require('../../wxParse/wxParse.js');
var myId;
var content;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    myId = options.id;
    var THIS = this;
    var newUrl = "http://192.168.1.16/index.php?c=edu&a=detail&op=getgoods&id=" + myId + "&openid=1"
    console.log(newUrl);
    wx.request({
      url: newUrl,
      success: function (res) {
        console.log(res);
        var data = res.data.dat;
        if (data.priceattr == 1) {
          THIS.setData({
            show: 1,
          })
        }
        else {
          THIS.setData({
            show: 2,
          })
        }
        console.log(THIS.data.show);
      }
    })
     var article="sss";
     var that = this; 
     WxParse.wxParse('article', 'html', article, that, 5); 
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