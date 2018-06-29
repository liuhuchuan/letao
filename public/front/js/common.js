

$(function () {
  //通过mui 的选择器初始化一个mui实例对象,就可以调用 mui 方法了.
  mui('.mui-scroll-wrapper').scroll({
    deceleration:0.005,
    indicators:false
  });

  //获取slider插件
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:3000
  })
})