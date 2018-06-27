

$(function () {
  //一进入页面 进行ajax请求  请求数据 渲染页面
  var currentPage = 1;//当前页
  var pageSize = 2;  //每页多少条

  // 一进入页面,先调用一次
  render();
  function render() {
    $.ajax ({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data: {
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success: function (info) {
        console.log(info);
        // 将数据和模板结合
        var htmlStr  = template('tpl', info);
        $('tbody').html(htmlStr);

        //分页初始化
        $('#paginator').bootstrapPaginator({
          //指定版本号
          bootstrapMajorVersion: 3,
          //指定总页数
          totalPages: Math.ceil(info.total / info.size),
          //指定当前页
          currentPage : info.page,
          onPageClicked: function (a,b,c, page) {
            //跟新当前页面
            currentPage = page;
            //重新渲染页面
            render();
          }
        })
      }
    })
  }

  // 点击添加按钮,显示分类模态框
   $('#addBtn').click(function () {
    $('#addModal').modal('show');
   })

  //通过表单校验插件,实现表单校验
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon gly phicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    //配置字段
    fields: {
      categoryName: {
        //配置校验规则
        validators: {
          //非空校验
          notEmpty: {
            message:"一级分类名称不能为空"
          }
        }
      }
    }
  });

  // 4. 注册表单校验成功事件, 阻止默认成功的提交, 通过 ajax 进行提交
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$('#form').serialize(),
      dataType:"json",
      success: function (info) {
        if(info.success) {
          //添加成功
          //关闭模态框
          $('#addModal').modal('hide');
          //重新渲染页面
          currentPage = 1;
          render();

         // 3. 重置模态框的表单, 传 true 不仅重置校验状态, 还重置表单内容
         $('#form').data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })
})