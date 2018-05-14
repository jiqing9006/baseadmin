$(document).ready(function(){
    $(document).keydown(function(event){
        if(event.keyCode==13){
            $(".login-btn").click();
        }
    });

    $(".login-btn").on('click', function () {
        var user_name = $(".username").val();
        var pass_word = $(".password").val();

        if(!user_name) {
            $(".tips").html('用户名不能为空');
            $(".username").next().css('right', '-130px');
            $(".username").next().css('opacity', 1);
            return false;
        }else {
            $(".username").next().css('opacity', 0);
        }
        if(!pass_word) {
            $(".password").next().css('opacity', 1);
            return false;
        }else {
            $(".password").next().css('opacity', 0);
        }

        $.ajax({
            type: "post",
            url: "/merchant.php/Public/check_login",
            data: {user_name: user_name, pass_word:pass_word},
            dataType: "json",
            success: function(data){
                if(data.errno == 1){
                    window.location.href = data.errdesc;
                }else{
                    $(".tips").html('用户名或密码错误');
                    $(".username").next().css('right', '-144px');
                    $(".username").next().css('opacity', 1);
                }
            }
        });
    });
});

