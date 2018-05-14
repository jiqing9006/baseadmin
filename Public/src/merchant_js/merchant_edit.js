$(".side-menu li:eq(2)").addClass("active");
$(".side-menu li:eq(2) ul li:eq(0)").addClass("current-page");
$(".side-menu li:eq(2) ul").css("display","block");

UM.getEditor('myEditor');

$("input[name='type']").change(function() {
    var type_index = $(this).val();
    if(type_index == 0) {
        $(".man_show").show();
    }else if(type_index == 1) {
        $(".man_show").hide();
    }
});

var page = $("#page").val();

$("#add_form").ajaxForm({
    dataType: "json",
    success : function(obj){

        if(obj.errno == 1){
            alert(obj.errdesc);
            window.location.href='/merchant.php';
        }else{
            alert(obj.errdesc);
        }
        return false;
    }
})

 $(".x_content").on('click', '.btn-car', function () {
      $("#masker").show();
      $(".diy_yh").show();
  });
   $(".close-links").on('click', function () {
        $("#masker").hide();
        $(".diy_yh").hide();
        $(".diy_yuanh").hide();
    });
$('.car-search').on('click', function () {
  if ($("#car-key").val() == '') {
    alert('请输入关键字');
    return;
  }
  $('.car-input').remove();
  var car = $('#car-key').val();
  $('.diy_yh').css('z-index', 10000);

  $.get('/merchant.php/Car/get?key='+car, function(res) {
    if (res.errno != 0) {
      alert('搜索失败')
    }

    var car_html = '';
    var result = res.result;
    for (var i in result) {
      car_html += '<div class="widget_summary car-input" style="font-size: 20px;"><div class="w_right w_25" style="width: 35%;"><input id="car-key" style="height:26px;line-height:14px;" type="text" name="car-key" class="form-control col-md-2 col-xs-6" required="required" value="'+result[i].name+'" readonly></div><div class="w_center w_55" style="margin-left: 5%;"><button data="'+result[i].id+'" car="'+result[i].name+'"class="car-search btn btn-success btn-sm set-hot-btn car-add">添加</button></div><div class="clearfix"></div></div>';
    }

    $('.car-search-div').after(car_html);
  }, 'json');
});

$('.car-div').on('click', '.car-add', function (){
  var carId = $(this).attr('data')
    , name = $(this).attr('car');
  $('.car-list').append('<span class="label label-primary car-model"  style="margin-right:10px;" data ="'+carId+'">'+name+'<i class="fa fa-remove"></i></span>');
  $(".close-links").click(); 

})

function delsy(num){
    $("#appThis_"+num).parents(".uploadimg").find(".file_m").show();
    $("#fj_"+num).remove();
    $(".yulan"+num).remove();
    $('#upload_img').val("");
}

function change(nums,fileId,width,height){
  var myDate;
    var myDates = new Date();
    myDates= myDates.getTime();
    if(!myDate || myDates-myDate>5){
        myDate = myDates;
        $.ajaxFileUpload({
            url:'/merchant.php/Merchant/upload/folder/bgimg?size=2&width='+width+'&height='+height,
            secureuri:false,
            fileElementId:fileId,
            dataType: 'json',
            success : function (data, status){
                if(data.msg){
                    var us=data['old_name'];
                    var a = data.all;
                    var b = a.split('"');
                    var c = b[3];
                    c = c.replace(/(\\)/g,"");
                    $('#upload_img').val(a);
                    var htmls = '';
                    htmls+='<img src="'+c+'" class="yulan'+nums+'"" style="width: 100%;margin-top: -25px;" />';
                    htmls+='<div id="fj_'+nums+'" style="height:20px;">';
                    htmls+='<span style="display:block; float:left;" class="file_p">'+us+'</span>';
                    htmls+='<input type="hidden" name="'+fileId+'[]" value="'+escape(data['all'])+'" />';
                    htmls+='<a href="javascript:;" class="delate_p"  onclick="delsy('+nums+')" style="margin-left:10px;margin-top:6px;"></a>';
                    htmls+='</div>';
                    $("#appThis_"+nums).append(htmls);
                    $("#u_waite").remove();
                    $("#appThis_"+nums).parents(".uploadimg").find(".file_m").hide();
                }else{
                    alert(data.error);
                    $("#u_waite").remove();
                }
            },
            error:function(data,status,e){
                alert('上传失败');
            }
        });
    }
    return false;
}

$("#add_btn").on("click", function(){
    var s = $('.car-model');
    $('.car-model').each(function (i, it) {
      $('.addForm').append('<input type="hidden" name="car[]" value="'+$(it).attr('data')+'">')
    });

    $("#add_form").submit();
    return false;
})

$('.car-models').on('click', '.car-model', function () {
  $(this).remove();
});

// initialize the validator function
validator.message.date = 'not a real date';

// validate a field on "blur" event, a 'select' on 'change' event & a '.reuired' classed multifield on 'keyup':
$('form')
    .on('blur', 'input[required], input.optional, select.required', validator.checkField)
    .on('change', 'select.required', validator.checkField)
    .on('keypress', 'input[required][pattern]', validator.keypress);

$('.multi.required').on('keyup blur', 'input', function() {
    validator.checkField.apply($(this).siblings().last()[0]);
});

$(".cancel-btn").on('click', function () {
    window.history.back(-1);
    return false;
});
