/**
 * Created by 42013 on 2018/6/25.
 */

// 5. 如果当前用户没有登录, 需要拦截到登陆页面
//    前端是不知道用户是否登陆了的, 但是后台知道, 想知道, 问后台, (访问后台接口即可)
//    注意: 需要将登录页, 排除在外面, 就是登录页可以不登录就访问的
 if (location.href.indexOf("login.html") === -1) {
   // 如果索引为 -1, 说明在地址栏参数中没有 login.html 需要登陆拦截

   $.ajax ({
     type:"get",
     url:"/employee/employeeLogin",
     dataType:"josn",
     success: function (info) {
       if(info.error === 400) {
         //没登陆, 拦截登陆
         location.href("login.html");
       }
       if (info.success) {
         //d当前用户已登录

       }
     }
   });
 }

// 实现进度条功能 (给 ajax 请求加), 注意需要给所有的 ajax 都加
// 发送 ajax 开启进度条, ajax结束, 关闭进度条

//第一个ajax发送时,开启进度条
$(document).ajaxStart(function () {
  NProgress.start();
});

//所有ajax请求完成时调用,关闭进度条
$(document).ajaxStop(function () {
  //模拟网络延迟
  setTimeout(function () {
    NProgress.done();
  }, 500)


})