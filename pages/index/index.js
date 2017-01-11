//index.js
//获取应用实例

var touchevent = require('touch.js');

var app = getApp()
Page({
  data: {
    motto: 'Hello World1111',
    userInfo: {},
    distancelogs: [123123],
    transformScale:1,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindTouchStart:function(e){
    touchevent.touchstart(e)

  },
   bindTouchMove:function(e){
    
    touchevent.touchmove(e)

  },
  onLoad: function () {
//console.log('onLoad')
    var that = this
  var touchCallback={swip:function(movex,movey){
        console.log(movex,movey)
       return
       var oldscale=that.data.transformScale;
      var newscale=oldscale+movex/300
      newscale=newscale<1?1:newscale;
      newscale=newscale>3?3:newscale;
     // newscale=newscale-0.5;
      //newscale=transform: scale({{transformScale}});
      that.setData({
        motto:newscale,
        transformScale:newscale
      })
  },
    pinch:function(distance){
      var oldscale=that.data.transformScale;
      var newscale=oldscale+distance/300
      newscale=newscale<1?1:newscale;
      newscale=newscale>3?3:newscale;
      that.setData({
        motto:newscale,
         transformScale:newscale
      })
      
      return
      

      var oldlog=that.data.distancelogs;
      oldlog.push(distance)
      that.setData({
        distancelogs:oldlog
      })

    }
}

touchevent.touchCallback(touchCallback)
  
    
    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
