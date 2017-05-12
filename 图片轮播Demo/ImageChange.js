$(function ($) {
    var index = 0;  //图片轮换下标
    var stop = false;   //是否停止轮换
    var $img = $("#scroll_main").find("#scroll_img").children("li"); //获取图片li
    var $index = $("#scroll_main").find("#scroll_number").children("li"); //获取下标li  
    //为第一个下标添加样式，其同辈元素移除样式
    $index.eq(index).removeClass("normal").addClass("hover").stop(true, true).siblings().removeClass("hover").addClass("normal");
    //鼠标悬浮在下标时
    $index.mouseover(function () {
        stop = true;
        index = $index.index($(this));   //将轮换的图片下标改为鼠标悬浮的那个下标
        $img.eq(index).stop(true, true).fadeIn().siblings().fadeOut();  //下标对应的图片显示，同辈元素隐藏
        $(this).removeClass("normal").addClass("hover").stop(true, true).siblings().removeClass("hover").addClass("normal");
    }).mouseout(function () {
        stop = false;
    });
    //自动轮换
    setInterval(function () {
        if (stop) {
            return;
        }
        index++;    //下标更新
        if (index >= $img.length) {
            index = 0;  
        }
        $img.eq(index).stop(true, true).fadeIn().siblings().fadeOut();  //下标对应的图片显示，同辈元素隐藏
        //对应下标添加样式，其同辈元素移除样式
        $index.eq(index).removeClass("normal").addClass("hover").stop(true, true).siblings().removeClass("hover").addClass("normal");
    },1800)
});