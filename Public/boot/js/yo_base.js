/*create by memory*/

/*drag插件使模态框可以拖拽*/
(function(){
    $("#myModal").children().eq(0).css("position", "absolute").css({
          "margin":"0px",
          "top": function () {
              return  "200px";
          },
          "left": function () {
              return ($("#myModal").width() - $("#myModal").children().eq(0).width()) / 2 + "px";
          }
      });
   $.fn.drag=function(tag){ 
        var _move=false;//移动标记  
        var _x,_y;//鼠标离控件左上角的相对位置  
        $(this).on("mousedown",function(e){  
            _move=true;  
            _x=e.pageX-parseInt($(tag).css("left"));  
            _y=e.pageY-parseInt($(tag).css("top"));  
            //$(tag).fadeTo(20, 0.5);//点击后开始拖动并透明显示    
            })
        $(document).on("mousemove",function(e){  
            if(_move){  
                var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置  
                var y=e.pageY-_y;  
                $(tag).css({top:y,left:x});//控件新位置  
            }  
        }).mouseup(function(){  
        _move=false;  
        //$(tag).fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明  
      });   3
   }
})();
/*alert插件：alert_success();alert_error();*/
(function(){
    $.yo_alert=function(ops){
        var tagDom=ops.tagDom;
        var title=ops.title;
        var detail=ops.detail;
        var style=ops.style;
        var ohtml='<div class="alert alert-'+style+'">'+
                        '<button type="button" class="close" data-dismiss="alert">×</button>'+
                        '<h4>'+title+'</h4>'+detail+
                    '</div>';
        tagDom.html(ohtml);
        tagDom.find(".close").on("click",function(){
            tagDom.html("");
        })
    }
    
})();