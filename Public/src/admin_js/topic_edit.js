$(".side-menu li:eq(2)").addClass("active");
$(".side-menu li:eq(2) ul li:eq(0)").addClass("current-page");
$(".side-menu li:eq(2) ul").css("display","block");

$(".add-zujian").on('click', function () {
    var offset = $("#offset").val();
    var html = '';
    html += '<div class="item form-group">';
    html +=     '<label for="site_upload" class="control-label col-md-3 col-sm-3 col-xs-6">图片' + offset + '</label>';
    html +=     '<div class="col-md-3 col-sm-3 col-xs-6" style="margin-top: 7px;">';
    html +=         '<a href="javascript:void(0);" onclick="myfile' + offset + '.click();"  class="file_m">+上传图片(宽:750)</a>';
    html +=         '<input type="hidden" class="counNum" value="0">';
    html +=         '<input type="file" name="file" id="myfile' + offset + '" onChange="change(' + offset + ',\'myfile' + offset + '\')" style="filter:alpha(opacity=0); opacity:0; margin-top:-15px;">';
    html +=         '<div id="appThis_' + offset + '" class="file_v"></div>';
    html +=     '</div>';
    html += '</div>';
    html += '<div class="item form-group">';
    html +=     '<label for="link' + offset + '" class="control-label col-md-3 col-sm-3 col-xs-12">链接' + offset + '</label>';
    html +=     '<div class="col-md-3 col-sm-3 col-xs-6">';
    html +=         '<input id="link' + offset + '" type="text" name="link' + offset + '" class="form-control col-md-3 col-xs-6" />';
    html +=     '</div>';
    html += '</div>';

    $("#zujian").append(html);
    $("#offset").val(parseInt(offset) + 1);
    return false;
});

var myDate;
function change(nums,fileId){
    var myDates = new Date();
    myDates= myDates.getTime();
    if(!myDate || myDates-myDate>5){
        myDate = myDates;
        $.ajaxFileUpload({
            url:'/admin.php/Annex/index/folder/bgimg?size=2&width=750',
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
                    var htmls = '';
                    htmls+='<img src="'+c+'" class="yulan'+nums+'"" style="width: 100%;margin-top: -30px;" />';
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

function delsys(num){
    $(".file_m").show();
    $("#fj_"+num).remove();
    $(".yulan"+num).remove();
}

function delsy(num){
    $("#appThis_"+num).parents(".uploadimg").find(".file_m").show();
    $("#fj_"+num).remove();
    $(".yulan"+num).remove();
}

var page = $("#page").val();

$("#add_form").ajaxForm({
    dataType: "json",
    success : function(obj){

        if(obj.errno == 1){
            alert(obj.errdesc);
            window.location.href='/admin.php/Topic/index?page=' + page;
        }else{
            alert(obj.errdesc);
        }
        return false;
    }
})

$("#add_btn").on("click", function(){
    $("#add_form").submit();
    return false;
})

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
