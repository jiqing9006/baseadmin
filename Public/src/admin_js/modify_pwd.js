
$(".cancel-btn").on('click', function () {
    window.history.back(-1);
    return false;
});

$("#send").on('click', function () {
    var password = $("#password").val();
    var password2 = $("#password2").val();
    var password3 = $("#password3").val();

    $.ajax({
        type: "post",
        url: "/admin.php/Public/check_modify_pwd",
        data: {password: password, password2:password2, password3:password3},
        dataType: "json",
        success: function(data){
            if(data.errno == 1){
                alert(data.errdesc);
                window.location.reload();
            }else{
                alert(data.errdesc);
                return false;
            }
        }
    });
});

$("#sended").on('click', function () {
    var password2 = $("#password2").val();
    var password3 = $("#password3").val();
    var id = $("#edit_id").val();
    $.ajax({
        type: "post",
        url: "/admin.php/Public/check_admin_modify_pwd",
        data: {password2:password2, password3:password3, edit_id:id},
        dataType: "json",
        success: function(data){
            if(data.errno == 1){
                alert(data.errdesc);
                window.location.href = '/admin.php/Public/admin_list';
            }else{
                alert(data.errdesc);
                return false;
            }
        }
    });
});
