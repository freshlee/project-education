// index.js
var price;
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
     num:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  cal:function(){
    var res=this.data.num*100;
    this.setData({
      total: res,
    })    
  },
  add:function(){
    this.setData({
      num:this.data.num+1,
    })
    this.cal();
  },
  del: function () {
    if(this.data.num!==0){
      this.setData({
        num: this.data.num - 1,
      })
      this.cal();
    }
  },
  onLoad: function (options) {
     this.setData({
       price:options.price,
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.cal();
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