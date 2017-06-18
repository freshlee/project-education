Page({
  data: {

  },
moveToMore:function(){
  wx.navigateTo({
    url: '../filter/index?type=3',
  })
},
moveToArticle:function(event){
  var newurl = '../article/index?'+event.currentTarget.dataset.id;
  wx.navigateTo({
    url: newurl,
  })
},
onReady:function(){
  var THIS=this;
  wx.request({
    url: 'http://192.168.1.16/index.php?c=edu&a=index&op=init', 
    data: {
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res.data)
      var videos=[];
      var mainLogos;
      var subLogos=[];
      var courses=[];
      var article=[];
      var bannerUrl=[];
      var banner=res.data.adv;
      var list1 = res.data.video_list;
      var list2 = res.data.adv;
      var list3 = res.data.course_list;
      var list4 = res.data.article_list;
      for (var i in banner) {
        bannerUrl.push({ url: banner[i].link, thumb: banner[i].thumb });
      }
      for(var i in list1){
        var element = "../video/index?doctype=" + list1[i].doctype + "&id=" + list1[i].id;
        var list1_thumb=list1[i].thumb;
        videos.push({url:element,thumb:list1_thumb});
      }
      //组装list2
      for (var i in list2) {
        if (i == 0){mainLogos={url: list2[i].link, thumb: list2[i].thumb };continue;}
        else if (i <= 4) { subLogos.push({ url: list2[i].link, thumb: list2[i].thumb });}
        else {break;}
      }
      console.log(subLogos);
      for (var i in list3) {
        var element = "../course/index?doctype=" + list3[i].doctype + "&id=" + list3[i].id;
        var list3_thumb = list3[i].thumb;
        courses.push({ url: element, thumb: list3_thumb ,price:list3[i].productprice,name:list3[i].name});
      }
      for (var i in list4) {
        var element = "../course/index?doctype=" + list4[i].doctype + "&id=" + list4[i].id;
        var list4_thumb = list4[i].thumb;
        article.push({ url: element, thumb: list4_thumb, title:list4[i].title, subscript: list4[i].labelname,content:list4[i].subtitle});
      }
      console.log(article);
       
      THIS.setData({
        title:res.data.nav,
        video:videos,
        mainLogo:mainLogos,
        subLogo:subLogos,
        courseData:courses,
        articleData:article,
        bannerUrls:bannerUrl,
        
      });
    }
  })
}
})

