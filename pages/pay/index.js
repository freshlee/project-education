// pages/pay/index.js
var app = getApp();
Page({
  data:{},
  pay:function(){
      var acid=app.globalData.uniacid;
      var openid=app.globalData.openid;
      var orderid=this.data.orderid;
       wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=shop2&a=pay&op=pay',
            method: 'GET',
            data: {acid:acid,openid:openid,orderid:orderid},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              console.log(res.data);
              if(res.data.status==0){
                  wx.showToast({
                      title: res.data.dat,
                      icon: 'success',
                      duration: 2000,
                      mask: true
                    })
              }
                wx.requestPayment({
                    'timeStamp': res.data.dat.wechat.timeStamp,
                    'nonceStr': res.data.dat.wechat.nonceStr,
                    'package': res.data.dat.wechat.package,
                    'signType': 'MD5',
                    'paySign': res.data.dat.wechat.paySign,
                    'success':function(res1){
                        wx.request({
                          url: 'https://api.cnmmsc.org?c=shop2&a=pay&op=complete',
                          data: {
                            openid: openid,
                            orderid: orderid,
                            acid: acid
                          },
                          method: 'GET',
                          header: {
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                          success: function (res3) {
                              if(res3.data.status==1){
                                  wx.showToast({
                                    title: '支付成功',
                                    icon: 'success',
                                    duration: 2000,
                                    mask: true
                                  })
                                  if(app.globalData.become_child==2){
                                      var openid2=app.globalData.openid2;
                                          wx.request({  
                                              url: 'https://api.cnmmsc.org/index.php?c=shop2&a=commission&op=reg2',  
                                              header: {  
                                                  'content-type': 'application/json'  
                                              },
                                              data:{acid:acid,openid:openid,openid2:openid2},
                                              success: function(res) {
                                                  
                                              }
                                          })
                                  }
                                  wx.switchTab({
                                    url: '../index/index'
                                  })
                              }else{
                                   wx.showToast({
                                    title: '取消支付！',
                                    icon: 'success',
                                    duration: 2000,
                                    mask: true
                                  })
                              }
                          }

                        });
                    },
                  'fail':function(res2){
                       wx.showToast({
                          title: '支付失败！',
                          icon: 'success',
                          duration: 2000,
                          mask: true
                        })
                  }
              })
            }
        })
  },
  onReady:function(){

  },
  onLoad:function(options){
    console.log(options)
    var that=this;
    var openid=app.globalData.openid
    var acid=app.globalData.uniacid;
    var orderid=options.orderid
    wx.request({
        url: 'https://api.cnmmsc.org?c=shop2&a=pay&op=init',
        data: {
          openid: openid,
          orderid: orderid,
          acid: acid
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            ordersn:res.data.dat.order.ordersn,
            price:res.data.dat.order.price,
            orderid:orderid
          })
        }

      });
  }
})