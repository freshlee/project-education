// index.js
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    back: "white",
    fontcolor:"black",
    fontsize:35
  },

  /**
   * 生命周期函数--监听页面加载
   */
  night:function(){
   this.setData({
     back: this.data.back=="black"?"white":"black",
     fontcolor: this.data.fontcolor=="white"?"black":"white",
   })
   console.log(this.data.back);
  },
  onLoad: function (options) {
    var THIS=this;
    wx.getSystemInfo({
      success: function (res) {
        THIS.setData({
          eqheight:res.windowHeight,
        })
      }
    })
  },
  sm:function(){
    this.setData({
      fontsize: this.data.fontsize-5,
    })
  },
  lg: function () {
    this.setData({
      fontsize: this.data.fontsize + 5,
    })
  },
  onLoad:function(option){
    var id=option.id;
    wx.request({
      url: '',
      data:{},
      success:function(res){

      }
    })
    var article = "sss";
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