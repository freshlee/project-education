// index.js
var mycate=undefined;
var mytype=undefined;
var mypay=undefined;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cases: [{ name: "名字", attr1: "测试" }, { name: "名字", attr1: "测试" }],
  cates:0,
  types:0,
  pays:0,
  trans_mycate:"全部",
  trans_mytype : "全部",
  trans_mypay : "全部",
  status:'off',
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  //转跳页面
  statusChange:function(){
     this.setData({
       status:this.data.status=='on'?'off':'on',
     })
  },
  jump:function(event){
    var id = event.currentTarget.dataset.id;
    var type=event.currentTarget.dataset.nav;
    if(type==1){mytype='video'}
    else if (type == 3) { mytype = 'course' }
    else { mytype = 'article' }
    var newurl="../"+mytype+"/index?&id="+id;
    console.log(newurl);
     wx.navigateTo({
       url: newurl,
     })
  },
  chosecate:function(event){
    var trans = event.currentTarget.dataset.trans;
     var cate=event.currentTarget.dataset.cate;
     mycate=cate;
     this.setData({
       cates:cate,
       trans_mycate:trans,
     })
     console.log(this.data.cates);
  },
  chosetype: function (event) {
    var trans = event.currentTarget.dataset.trans;
    var types = event.currentTarget.dataset.type;
    mytype = types;
    this.setData({
      types: types,
      trans_mytype:trans,
    })
  },
  chosepay: function (event) {
    var trans = event.currentTarget.dataset.trans;
    var pay = event.currentTarget.dataset.pay;
    mypay = pay;
    this.setData({
      trans_mypay:trans,
      pays: pay,
    })
  },
  sure: function () {
    var THIS = this;
    var newcate = mycate == undefined || mycate ==0 ? "" : '&pcate=' + mycate;
    var newtype = mytype == undefined || mytype ==0 ? "" : '&doctype=' + mytype;
    var newpay = mypay == undefined || mypay ==0 ? "" : '&priceattr=' + mypay;
    var newurl = "http://192.168.1.16/index.php?c=edu&a=goods&op=query_goods" + newcate + newtype + newpay;
    console.log(newurl);
    this.setData({
      status: 'off'
    })
    wx.request({
      url: newurl,
      success: function (res) {
        THIS.setData({
          cases: res.data.dat.goods,
        })
        console.log(res.data);
      }
    })
    
  },
  onLoad: function (options) {
    var newcate = mycate == undefined ? "" : '&pcate=' + mycate;
    var newtype = mytype == undefined ? "" : '&doctype=' + mytype;
    var newpay = mypay == undefined ? "" : '&priceattr=' + mypay;
    var newurl = "http://192.168.1.16/index.php?c=edu&a=goods&op=query_goods"+newcate+newtype+newpay;
    var type = options.type;
    var cate = options.cate;
    var pay = options.pay;
    var Thetype=options.type;
    var THIS=this;
    console.log(newurl);
     wx.request({
       url: "http://192.168.1.16/index.php?c=edu&a=category&op=list",
       success:function(res){
           THIS.setData({
             type:res.data,
           })
       }
     })
     wx.request({
       url: newurl,
       success: function (res) {
         THIS.setData({
           cases: res.data.dat.goods,
         })
         console.log(res.data);
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