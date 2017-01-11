
var touchData={
clientXs:[],
clientYs:[],
deltaXs :[],
deltaYs :[],
touchs:[],
pinchDistance:0,
touchCallback:{
  swip:null,
  pinch:null,
}

}
var touchOb={
  touchCallback:function(touchfuns){
    touchData.touchCallback=touchfuns;
  },
  touchstart:function(e){
      touchData.touchs=e.touches ;
      touchData.clientXs=[];
      touchData.clientYs=[];
     for(var i=0;i<touchData.touchs.length;i++){
        touchData.clientXs[i] = e.touches[i].clientX;
        touchData.clientYs[i] = e.touches[i].clientY;
     }
     if(touchData.touchs.length==2){
        this.caculateDistance(true);
        }
  },
  touchend:function(e){
    touchData.deltaXs=[]
    touchData.deltaYs=[]
    for(var i=0;i<touchData.touchs.length;i++){
      touchData.deltaXs[i] = e.touches[i].clientX - touchData.clientXs[i];
      touchData.deltaYs[i] = e.touches[i].clientY - touchData.clientYs[i];
    }
  // this.analyzeType();
  },
  touchmove:function(e){
    
    touchData.touchs=e.touches ;
    touchData.deltaXs=[]
    touchData.deltaYs=[]
    
    for(var i=0;i<touchData.touchs.length;i++){
      touchData.deltaXs[i] = e.touches[i].clientX - touchData.clientXs[i];
      touchData.deltaYs[i] = e.touches[i].clientY - touchData.clientYs[i];
    }

    touchData.clientXs=[];
    touchData.clientYs=[];
    for(var i=0;i<touchData.touchs.length;i++){
        touchData.clientXs[i] = e.touches[i].clientX;
        touchData.clientYs[i] = e.touches[i].clientY;
     }
    this.analyzeType();
  },caculateDistance:function(call){
      var distancex=touchData.clientXs[0]-touchData.clientXs[1]
      var distancey=touchData.clientYs[0]-touchData.clientYs[1]

      var distance=Math.sqrt(distancex*distancex+distancey*distancey);
      var distanceChange=distance-touchData.pinchDistance;
      touchData.pinchDistance=distance;
      if(touchData.touchCallback.pinch&&!call){
        touchData.touchCallback.pinch(distanceChange);
      }
  },
  analyzeType:function(){
   // console.log(touchData.deltaXs);
    if( touchData.touchs.length==2){
        this.caculateDistance();
    }
    else{
      if(touchData.touchCallback.swip){
       touchData.touchCallback.swip(touchData.deltaXs[0],touchData.deltaYs[0])
      }
    }

  }

}
module.exports = touchOb