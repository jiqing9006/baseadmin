$(".side-menu li:eq(0)").addClass("active");
$(".side-menu li:eq(0) ul li:eq(2)").addClass("current-page");
$(".side-menu li:eq(0) ul").css("display","block");

$("#add_form").ajaxForm({
    dataType: "json",
    success : function(obj){

        if(obj.errno == 1){
            alert(obj.errdesc);
            window.location.href='/admin.php/Title/index';
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

$('input[name="type"]').change(function () {
    var val = $(this).val();
    if(val == 0){
        $(".man_show").hide();
        $(".price_show").hide();
    }else if(val == 1){
        $(".man_show").hide();
        $(".price_show").show();
    }else if(val == 2){
        $(".man_show").show();
        $(".price_show").show();
    }
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
});