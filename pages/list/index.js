
var app = getApp();
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
function compare2(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false,  
        height:0,
        mask:false,
        dorw:false,
        page:1,
        list:[],
        loadmore:'正在加载中...',
        showload:true,
        canreach:true,
        menu:[
            {id:1,name:'店铺'},
            {id:2,name:'综合'},
            {id:3,name:'评价'},
            {id:4,name:'价格'},
        ],
        menu2:[
            {id:1,name:'专人配送'},
            {id:2,name:'精品品牌'},
            {id:3,name:'超值优惠'},
            {id:4,name:'门店自提'},
            {id:5,name:'最高评价'}
        ],
        dorwlist0:[
        ],
        dorwlist1:[
            {id:2,name:'价格从低到高',sorts:'marketprice'},
            {id:3,name:'价格从高到低',sorts:'g'},
            {id:2,name:'上架时间',sorts:'createtime'},
            {id:3,name:'销量最多',sorts:'salesreal'},
            {id:4,name:'打折最多',sorts:'isdiscount'}
        ],
        dorwlist2:[
            {id:1,name:'好评最多',sorts:'commentss'},
            {id:1,name:'好评最低',sorts:'comments'}
        ],
    },
    onReachBottom: function() {
        var page=this.data.page;
        page++;
        if(this.data.canreach){
            if(this.data.keywords){
                this.getgoods1(page);
            }else if(this.data.init){
                this.getgoods2(page);
            }else{
                this.getgoods3(page);
            }
            this.setData({page:page})
        }
    },
    hidemask:function(){
        var menu=this.data.menu;
        for(var j in menu){
            menu[j].selected=false;
        }
        this.setData({
            menu:menu,
            dorw:false,
            mask:false,
            top:0
        })
    },
    choosemenu:function(e){
        var index=e.currentTarget.dataset.index;
        var menu=this.data.menu;
        for(var j in menu){
            menu[j].selected=false;
            if(j==index){
                menu[j].selected=true;
                if(j==0){
                  var dorwlists=this.data.dorwlist0
                }else if(j==1){
                    var dorwlists=this.data.dorwlist1
                }else if(j==2){
                    var dorwlists=this.data.dorwlist2
                }else if(j==3){
                    var dorwlists=this.data.dorwlist3
                }
                this.setData({
                    dorwlist:dorwlists
                })
            }
        }
        this.setData({
            menu:menu,
            dorw:true,
            mask:true,
            top:0
        })
    },
    choosemenu2:function(e){
        var index=e.currentTarget.dataset.index;
        var menu2=this.data.menu2;
        for(var j in menu2){
            if(j==index){
                menu2[j].selected=!menu2[j].selected
            }
        }
        this.setData({menu2:menu2})
    },
    dorwlist:function(e){
        var index=e.currentTarget.dataset.index;
        var dorwlist=this.data.dorwlist;
        if(dorwlist[0].multiple){
            for(var j in dorwlist){
                if(j==index){
                    dorwlist[j].selected=!dorwlist[j].selected
                }
            }
        }else{
            for(var j in dorwlist){
                dorwlist[j].selected=false;
                if(j==index){
                    dorwlist[j].selected=true;
                }
            }
        }
        this.setData({dorwlist:dorwlist})
    },
    resetsearch:function(){
        var dorwlist=this.data.dorwlist;
        for(var j in dorwlist){
            dorwlist[j].selected=false;
        }
        this.setData({dorwlist:dorwlist})
    },
    suresearch:function(){
        var menu=this.data.menu;
        var dorwlist=this.data.dorwlist;
        var lists=this.data.goods;
        var mername=[];
        var list=[];
        if(!dorwlist[0].multiple){
            for(var i in dorwlist){
                if(dorwlist[i].selected){
                    var sorts=dorwlist[i].sorts;
                    var jia=dorwlist[i].name;
                }
            }
            if(sorts=='g'){
                var list= lists.sort(compare2('marketprice'));
            }else if(sorts=='salesreal'){
                var list= lists.sort(compare2('salesreal'));
            }else if(sorts=='commentss'){
                var list= lists.sort(compare2('comments'));
            }else if(sorts=='jiage'){
                var jiage=jia.split('-');
                for(var n in lists){
                    if(parseFloat(lists[n].marketprice)>=parseFloat(jiage[0]) && parseFloat(lists[n].marketprice)<parseFloat(jiage[1])){
                        list.push(lists[n]);
                    }
                }
            }else{
                var list= lists.sort(compare(sorts));
            } 
        }else{
            for(var i in dorwlist){
                if(dorwlist[i].selected){
                    mername.push(dorwlist[i].name);
                }
            }
            for(var k in lists){
                for(var s=0; s<mername.length; s++){
                    if(lists[k].merchname==mername[s]){
                        list.push(lists[k])
                    }
                }
            }
        }
        wx.showToast({
            title:'加载中',
            icon: 'loading',
            duration: 500,
            mask: true
        })
        for(var j in menu){
            menu[j].selected=false;
        }
        this.setData({
            list:list,
            menu:menu,
            dorw:false,
            mask:false,
            top:0
        })
    },
    getgoods1:function(page){
        var that=this;
        wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=shop3&a=list&op=list',
            method: 'GET',
            data: {acid:app.globalData.uniacid,keywords:that.data.keywords,page:page},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                var goods=that.data.list;
                if(res.data.length!=0){
                    for(var i in res.data){
                        goods.push(res.data[i])
                    }   
                }
                if(res.data.length<20){
                    that.setData({
                        loadmore:'已加载完全部！',
                        showload:false,
                        canreach:false,
                    })
                }
                var mer=[];
                var arr=[];
                var arrs={};
                var arrss=[];
                for(var i in goods){
                    mer.push(goods[i].merchname);
                }
                for(var i = 0; i < mer.length; i++){ 
                    if(arr.indexOf(mer[i]) == -1){  
                        arr.push(mer[i]);
                    }  
                }
                for(var g=0; g<arr.length; g++){
                    arrss.push({name:arr[g],multiple:true})
                }
                wx.setNavigationBarTitle({
                    title: '搜索列表'
                })
                that.setData({
                    list:goods,
                    goods:goods,
                    dorwlist0:arrss,
                    loadingHidden: true
                })
            }
        })
    },
    getgoods2:function(page){
        var that=this;
        wx.request({
                url: 'https://api.cnmmsc.org/index.php?c=shop3&a=goods&op=query_goods',
                method: 'GET',
                data: {acid:app.globalData.uniacid,openid:app.globalData.openid,city:that.data.city,page:page},
                header: {
                    'Accept': 'application/json'
                },
                success: function(res) {
                if(res.data.status==0){
                wx.showModal({
                    title: '提示',
                    content: res.data.msg
                    })
                        that.setData({
                            loadingHidden: true
                        })

                }else{
                    var goods=that.data.list;
                    if(res.data.dat.goods.length!=0){
                        for(var i in res.data.dat.goods){
                            goods.push(res.data.dat.goods[i])
                        }
                    }
                    if(res.data.dat.goods.length<20){
                        that.setData({
                            loadmore:'已加载完全部！',
                            showload:false,
                            canreach:false,
                        })
                    }
                    var mer=[];
                    var arr=[];
                    var arrs={};
                    var arrss=[];
                    for(var i in goods){
                        mer.push(goods[i].merchname);
                    }
                    for(var i = 0; i < mer.length; i++){ 
                        if(arr.indexOf(mer[i]) == -1){  
                            arr.push(mer[i]);
                        }  
                    }
                    for(var g=0; g<arr.length; g++){
                        arrss.push({name:arr[g],multiple:true})
                    }
                    wx.setNavigationBarTitle({
                        title: '全部商品'
                    })
                    that.setData({
                        list: goods,
                        goods:goods,
                        cate:res.data.cate,
                        dorwlist0:arrss
                    })
                    setTimeout(function () {
                        that.setData({
                            loadingHidden: true
                        })
                    }, 1500)
                }
                }
            })
    },
    getgoods3:function(page){
        var that=this;
        wx.request({
                url: 'https://api.cnmmsc.org/index.php?c=shop3&a=list&op=list',
                method: 'GET',
                data: {acid:app.globalData.uniacid,cat:that.data.cat,type:that.data.type,cid:that.data.cid,page:page},
                header: {
                    'Accept': 'application/json'
                },
                success: function(res) {
                    var result=res.data;
                    var goods=that.data.list;
                    if(res.data.length!=0){
                        for(var i in res.data){
                            goods.push(res.data[i]);
                        }
                    }
                    if(res.data.length<20){
                        that.setData({
                            loadmore:'已加载完全部！',
                            showload:false,
                            canreach:false,
                        })
                    }
                    var mer=[];
                    var arr=[];
                    var arrs={};
                    var arrss=[];
                    for(var i in goods){
                        mer.push(goods[i].merchname);
                    }
                    for(var i = 0; i < mer.length; i++){ 
                        if(arr.indexOf(mer[i]) == -1){  
                            arr.push(mer[i]);
                        }  
                    }
                    for(var g=0; g<arr.length; g++){
                        arrss.push({name:arr[g],multiple:true})
                    }
                     that.setData({
                        list:goods,
                        goods:goods,
                        dorwlist0:arrss,
                        loadingHidden: true
                    })
                    if(that.data.n!==undefined){
                            wx.setNavigationBarTitle({
                                title: that.data.n
                        })
                    }else{
                        wx.setNavigationBarTitle({
                            title: that.data.name
                        })
                    }
                   
            }
        })
    },
    onLoad: function(options) {
        var that = this;
        this.setData({
            keywords:options.keywords,
            cart:options.cat,
            city:options.city,
            init:options.init,
            cat:options.cat,
            type:options.type,
            cid:options.cid,
            n:options.n,
            name:options.name
        })
        wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=shop2&a=goods&op=price_range',
            method: 'GET',
            data: {acid:app.globalData.uniacid,openid:app.globalData.openid},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                    dorwlist3:res.data.dat.range
                })
            }
        })
        if(options.keywords){
             this.getgoods1(1);
        }else if(options.init){
            this.getgoods2(1);
        }else{
            this.getgoods3(1);
        }
    }
})



