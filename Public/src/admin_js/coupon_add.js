$(".side-menu li:eq(2)").addClass("active");
$(".side-menu li:eq(2) ul li:eq(0)").addClass("current-page");
$(".side-menu li:eq(2) ul").css("display","block");

$("input[name='type']").change(function() {
    var type_index = $(this).val();
    if(type_index == 0) {
        $(".man_show").show();
    }else if(type_index == 1) {
        $(".man_show").hide();
    }
});

$("#add_form").ajaxForm({
    dataType: "json",
    success : function(obj){

        if(obj.errno == 1){
            alert(obj.errdesc);
            window.location.href='/admin.php/Coupon/index';
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
