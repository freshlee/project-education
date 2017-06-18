var app = getApp()
Page({
    data: {
        indicatorDots: false,
        vertical: false,
        autoplay: true,
        standard: false,
        mask:false,
        pay:false,
        cart:false,
        size:false,
        isfavorite:false,
        description: false,
        interval: 3000,
        duration: 1200,
        id:0,
        lower:0,
        currentTab: 0,
        nums: 1,
        tab: 0,
        coupon: '未选择优惠劵',
        coupons: [
            {size:30,name:'满300立减30'},
            {size:20,name:'满200立减20'},
            {size:10,name:'满100立减10'},
            {size:40,name:'满400立减40'},
            {size:50,name:'满500立减50'},
            ],
    menu:[{
        name:"图文详情",
        value:"tu",
        currentTab: 0,
        active:true
    },{
        name:"产品参数",
        value:"can",
        currentTab: 1,
        active:false
    },{
        name:"相关推荐",
        value:"tong",
        currentTab: 1,
        active:false
    }]
    },
    onShareAppMessage: function () {
        var title=this.data.shopppingDetails.title;
        var id=this.data.id;
        var openid=app.globalData.openid;
        var acid=app.globalData.uniacid;
        return {
          title: title,
          path: '/pages/details/index?id='+id+'&openid='+openid
        }
  },
  tosale:function(){
      wx.switchTab({
        url: '../sale/index/index'
      })
  },
  tohome:function(){
      wx.switchTab({
        url: '../index/index'
     })
  },
    playphone:function(e){
      var phoneNumber=e.currentTarget.dataset.phone;
      wx.makePhoneCall({
         phoneNumber: phoneNumber
      })
  },
  bindlower:function(){
        var lower=this.data.lower;
        if(lower==0){
            this.getNews('tu');
        }
        lower++;
        this.setData({lower:lower})
    },
  morepj:function(){
      var goodsid=this.data.shopppingDetails.id;
      console.log(goodsid)
      wx.navigateTo({
            url: '../extra/appraise/index?goodsid='+goodsid
        })
  },
  choosecounpon:function(e){
      var index=e.currentTarget.dataset.index;
      this.setData({
          curindex:index
      })
      var coupons=this.data.coupons;
      for(var i in coupons){
          if(i==index){
              coupons[i].choose=true;
              this.setData({
                 coupon:coupons[i].name
              })
          }else{
              coupons[i].choose=false;
          }
      }
  },
  tomer:function(e){
      var merchid=e.currentTarget.dataset.merid;
      if(merchid!=0){
          wx.navigateTo({
             url: '../merchant/index/index?merchid='+merchid
          })
      }
  },
  socang:function(){
      var that=this;
      var isfavorite = this.data.isfavorite;
      if(isfavorite){
          isfavorite=0;
      }else{
          isfavorite=1;
      }
      var acid=app.globalData.uniacid;
      var openid=app.globalData.openid;
      var id=this.data.shopppingDetails.id;
      wx.request({
          url: 'https://api.cnmmsc.org/index.php?c=shop2&a=goods&op=favorite_toggle',
          method: 'GET',
          data: {openid:openid,acid:acid,id:id,isfavorite:isfavorite},
          header: {
              'Accept': 'application/json'
          },
          success: function(res) {
              var favorite=res.data.dat.isfavorite;
              console.log(favorite)
              if(favorite){
                    wx.showToast({
                         title: '收藏商品成功'
                    })
                    that.setData({
                        isfavorite: 1
                    });
              }else{
                    wx.showToast({
                         title: '取消收藏成功'
                    })
                    that.setData({
                        isfavorite: 0
                    });
              }
            console.log(that.data.isfavorite)
          }
      })
  },
  description: function(){
      this.setData({
          mask:true,
          description:true
      })
  },
  closedescription:function(){
      this.setData({
          mask:false,
          description:false
      })
  },
    // 计算总金额
    sum: function() {
        var num = this.data.nums;
        var price= this.data.prices;
        var total = 0;
        var totals =num*price;
        total=totals.toFixed(2);
        this.setData({
            total: total
        });
  },
bindMinus: function(e) {
    var num = this.data.nums;
    if (num > 1) {
      num --;
    }else{
       wx.showToast({
				title: '超过下限了！'
			});
    }
    this.setData({
      nums: num
    });
    this.sum();
  },
  bindPlus: function(e) {
    var num = this.data.nums;
    num ++;
    this.setData({
      nums: num
    });
    this.sum();
  },
  chooseOption: function (e) {
    var index = e.currentTarget.dataset.curindex
    var type = e.currentTarget.dataset.type;
    var opts=new Array();
    var optt=[];
    var str='';
    var price=this.data.price;
    var pricelength=price.length;
    var opss=[];
    for (var x in this.data.option){
        if(x==type){
            for (var y in this.data.option[x].items){
                if(y==index){
                    this.data.option[x].items[y].cur=true;
                    var thumb=this.data.option[x].items[y].thumbs;
                    if(thumb==''){
                        thumb=this.data.thumbss;
                    }
                    this.setData({thumbs:thumb})
                }else{
                this.data.option[x].items[y].cur=false
                }
            }
        }
     }
     this.setData({option : this.data.option});
     for (var x in this.data.option){
        for (var y in this.data.option[x].items){
            if(this.data.option[x].items[y].cur==true){
                this.data.option[x].ck=true
                opts[x]=this.data.option[x].title+':'+this.data.option[x].items[y].title;
                optt[x]=this.data.option[x].items[y].title;
            }
        }
      }
      var op=[];
      for (var x in opts){
        op.push(opts[x]);
      }
       for (var x in optt){
            opss.push(optt[x]);
        }
        for(var l=0; l<opss.length; l++){
            str+='+'+opss[l];
        }
        var st=str.substr(1);
        for(var b in price){
            if(price[b].title==st){
                var marketprice=price[b].marketprice;
                var totle=price[b].stock;
                var title=this.data.title;
                if(price[b].title_s==''){
                   var titles=title;
                }else{
                     var titles=price[b].title_s
                }
                this.setData({
                    op : op,
                    total:marketprice,
                    prices:marketprice,
                    totals:totle,
                    goodsPicsInfo:price[b].thumbs,
                    title:titles
                });
                this.sum();
            }
        }
      
    },
  addtocart: function(){
      var that=this;
      var options = new Array()
    for (var x in this.data.option){
        for (var y in this.data.option[x].items){
            if(this.data.option[x].items[y].cur==true){
            this.data.option[x].ck=true
            options[x]=this.data.option[x].items[y].title
            }
        }
    }
    for (var c in this.data.option){
        if(this.data.option[c].ck==undefined){
            wx.showModal({
                title: '提示',
                content: '请完整商品信息！',
                success: function(res) {
                    return false
                }
            })
            return false
        } 
    }
    var str=''
    if(str==''){
        for (var cd in options){
        str+=options[cd]+'+'
    }
      var acid=app.globalData.uniacid;
      var openid=app.globalData.openid;
      var goodsid=this.data.shopppingDetails.id;
      var nums=this.data.nums;
      wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=shop2&a=cart&op=add',
            method: 'GET',
            data: {goodsid:goodsid,acid:acid,openid:openid,num:nums,param:str},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                    mask:false,
                    standard:false,
                    cartcount:res.data.cartcount
                })
                wx.setStorage({
                    key: "cartcount",
                    data: res.data.cartcount
                })
                if(res.data.status==1){
                     wx.showToast({
                        title: res.data.msg
                    });
                }
                if(res.data.status==0){
                    wx.showToast({
                        title: res.data.msg
                    });
                }
               
            }
        })
    }
    
  },
  buy:function(){
    var options = new Array()
    for (var x in this.data.option){
        for (var y in this.data.option[x].items){
            if(this.data.option[x].items[y].cur==true){
            this.data.option[x].ck=true
            options[x]=this.data.option[x].items[y].title
            }
        }
    }
    for (var c in this.data.option){
        if(this.data.option[c].ck==undefined){
            wx.showModal({
                title: '提示',
                content: '请完整商品信息！',
                success: function(res) {
                    return false
                }
            })
            return false
        } 
    }
    var str=''
    for (var cd in options){
        str+=options[cd]+'+'
    }
     var acid=app.globalData.uniacid;
      var openid=app.globalData.openid;
      var goodsid=this.data.shopppingDetails.id;
      var total=this.data.nums
    var ths=this
    var fromcart=0;
    wx.navigateTo({
        url: '../checkout/index?openid='+openid+'&acid='+acid+'&goodsid='+goodsid+'&total='+total+'&option='+str+'&fromcart='+fromcart
        })
    },
    getNews:function(r){
        var ths=this
            var WxParse = require('../../wxParse/wxParse.js');
            var acid=app.globalData.uniacid 
                wx.request({
                    url: 'https://api.cnmmsc.org?c=shop2&a=detail',
                    method: 'GET',
                    data: {acid:acid,op:r,id:ths.data.id},
                    header: {
                        'Accept': 'application/json'
                    },
                    success: function(res) {
                        if(r=='tu'){
                             WxParse.wxParse('article', 'html', res.data.dat, ths,0);
                             if(res.data.dat!=''){
                                ths.setData({dat :1});
                             }else{
                                ths.setData({dat :''});
                             }
                        }else{
                            ths.setData({dat : res.data.dat});
                        }
                       
                    }
                })
    },
    bindMenu:function(e){
       var name = e.currentTarget.dataset.name;
        var tmp = this.data.menu.map(function (arr, index) {
            if(arr.value == name){   
                arr.active = true;
            }else{
                arr.active = false;
            }
            return arr;             
        });
        this.setData({menu : tmp}); 
        this.getNews(name);        
  },
  choosesize: function(){
      this.setData({
          mask:true,
          standard:true,
          pay:false,
          cart:false,
          size:true
      })
      this.sum();
  },
  addcart:function(){
      this.setData({
          mask:true,
          standard:true,
          pay:false,
          size:false,
          cart:true
      })
      this.sum();
  },
  paynow:function(){
      this.setData({
          mask:true,
          standard:true,
          car:false,
          size:false,
          pay:true,
      })
      this.sum();
  },
  stantreomve:function(){
      this.setData({
          mask:false,
          standard:false
      })
  },
  switchtocart: function(){
      wx.switchTab({
          url: '../cart/index',
          success:function(e){
              var page=getCurrentPages().pop();
              if(page==undefined||page==null) return;
              page.onShow();
          }
      })
  },
   bindMenu:function(e){
        var name = e.currentTarget.dataset.name;
        var tmp = this.data.menu.map(function (arr, index) {
            if(arr.value == name){   
                arr.active = true;
            }else{
                arr.active = false;
            }
            return arr;             
        });
        this.setData({menu : tmp}); 
        this.getNews(name);        
  },
  previewImage:function(e){
      var index=e.currentTarget.dataset.index;
      var id=e.currentTarget.dataset.id;
      var nowsrc=e.currentTarget.dataset.nowsrc;
      var comment=this.data.comment;
      var urls=[];
      for(var i in comment){
          if(comment[i].id==id){
                urls=comment[i].commentimg;
          }
      }
      wx.previewImage({
        current: nowsrc,
        urls: urls,
        success:function(res){
            console.log(nowsrc)
            console.log(urls)
        },
        fail:function(res2){
            console.log(res2)
        }
     })
  },
  ready:function(options){
        this.setData({id:options.id})
        var that = this;
        var acid=app.globalData.uniacid;
        var openid=app.globalData.openid;
        if(options.openid==undefined || options.openid==null){
           app.globalData.openid2=''
           this.setData({tohome:false})
       }else{
            app.globalData.openid2=options.openid;
            this.setData({tohome:true})
            wx.request({  
                url: 'https://api.cnmmsc.org/index.php?c=shop2&a=commission&op=init1',  
                header: {  
                    'content-type': 'application/json'  
                },
                data:{acid:acid,openid2:options.openid,openid:openid},
                success: function(res) {
                    app.globalData.become_child=res.data.dat.become_child;
                    console.log(res.data)
                    if(res.data.dat.become_child==0){
                        console.log('child='+res.data.dat.become_child)
                        wx.request({  
                            url: 'https://api.cnmmsc.org/index.php?c=shop2&a=commission&op=reg2',  
                            header: {  
                                'content-type': 'application/json'  
                            },
                            data:{acid:acid,openid:openid,openid2:options.openid},
                            success: function(res2) {
                                console.log(res2)
                            }
                         })
                    }
                }
            })
       }
       console.log('openid2='+app.globalData.openid2)
        wx.getSystemInfo({
        success: function(res) {
            that.setData({
                width: res.windowWidth,
                height:res.windowHeight
            })
        }
        })
        wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=shop2&a=cart&op=query',
            method: 'GET',
            data: {acid:acid,openid:openid},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              var carts=res.data.total;
              that.setData({
                  cartcount:carts
              })
              
            }
        })
            var acid=app.globalData.uniacid;
            var openid=app.globalData.openid;
            wx.request({
                url: 'https://api.cnmmsc.org?c=shop2&a=detail&op=getgoods&&id=' + options.id,
                method: 'GET',
                data: {acid:acid,openid:openid},
                header: {
                    'Accept': 'application/json'
                },
                success: function(res) {
                    wx.setNavigationBarTitle({
                         title: res.data.dat.title
                    })
                    var comment=res.data.dat.comment;
                    var leve=0;
                    var miao=0;
                    var fu=0;
                    var wu=0;
                    for(var i=0; i<comment.length; i++){
                        leve+=parseInt(comment[i].level);
                        miao+=parseInt(comment[i].miaoshu);
                        fu+=parseInt(comment[i].fuwu);
                        wu+=parseInt(comment[i].wuliu);
                    }
                    var level=Math.round(leve/comment.length);
                    var miaoshu=Math.round(miao/comment.length);
                    var fuwu=Math.round(fu/comment.length);
                    var wuliu=Math.round(wu/comment.length);
                    var thumbs=res.data.dat.pics[0]
                    that.setData({
                        shopppingDetails:res.data.dat,
                        title:res.data.dat.title,
                        goodsPicsInfo: res.data.dat.pics,
                        phone:res.data.info.phone,
                        member:res.data.info.contact,
                        isfavorite:res.data.dat.isfavorite,
                        totals:res.data.dat.total,
                        total:res.data.dat.marketprice,
                        prices:res.data.dat.marketprice,
                        option: res.data.dat.option,
                        thumbs:thumbs,
                        thumbss:thumbs,
                        comment:comment,
                        level:level,
                        miaoshu:miaoshu,
                        fuwu:fuwu,
                        wuliu:wuliu,
                        label:res.data.dat.label,
                        merdes:res.data.merchinfo.des,
                        merlogo:res.data.merchinfo.logo,
                        merid:res.data.merchinfo.id,
                        mername:res.data.merchinfo.name,
                        comment:res.data.dat.comment,
                        price:res.data.price
                    })
                }
            })
  },
    onLoad: function(options) {
        this.setData({
            options:options
        })
    },
     onReady:function(){
        var options=this.data.options;
        this.ready(options)
    }  

})
