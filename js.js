//dpr-setting
(function(){
  var dpr, rem, scale;
  var docEl = document.documentElement;
  var metaEl = document.createElement('meta');
  metaEl.setAttribute('name', 'viewport');
  dpr = window.devicePixelRatio || 1;
  if(dpr>2&&dpr<3){
    if(dpr>=2.75){
      dpr=2.75;
    }else if(dpr>=2.5){
      dpr=2.5;
    }else{
      dpr=2
    }
  }else{
    dpr = parseInt(dpr);
  }
  rem = docEl.clientWidth * dpr / 10;
  scale = 1 / dpr;
  // 设置viewport，进行缩放，达到高清效果
  metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
  document.head.appendChild(metaEl);
  // 设置data-dpr属性，留作的css hack之用
  docEl.setAttribute('data-dpr', dpr);
  // 动态写入样式
  //docEl.firstElementChild.appendChild(fontEl);
  docEl.style.fontSize =  rem + 'px';

  // 给js调用的，某一dpr下rem和px之间的转换函数
  /*window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
  };
  window.px2rem = function(v) {
    v = parseFloat(v);
    return v / rem;
  };*/
  window.dpr = dpr;
  window.rem = rem;
})();
// picture
(function(){
  var size = parseInt(document.documentElement.dataset.dpr);
  switch(size){
    case 1:size="";break;
    case 2:;
    case 3:size="@"+size+"x";break;
    default:size="@3x";
  }
  var els = document.querySelectorAll("img[data-url]");
  for(var i=0;i<els.length;i++){
    els[i].setAttribute("src",els[i].dataset.url+size+els[i].dataset.type);
  }
})();
