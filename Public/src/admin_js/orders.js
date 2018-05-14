$(function () {
    $("#add_coupon").on('click',function () {
        window.location.href= '__URL__/add';
    })

    $(".coupon_edit").on('click',function () {
        var id = $(this).data('id');

        var page = $("#page").val();
        if(page){
            var str = '&page='+page;
        }else{
            var str = '';
        }

        window.location.href= '__URL__/edit?id='+id+str;
    });

    $(".coupon_del").on('click',function () {
        if(confirm('确定要删除吗')){
            var id = $(this).data('id');
            $.ajax({
                type:'POST',
                url:'del',
                data: {id: id},
                dataType:'json',
                success:function(data){
                    if(data.errno == 0){
                        alert(data.errdesc);
                        window.location.reload();
                    }else{
                        alert(data.errdesc);
                        return false;
                    }
                }
            });
        }
    });

    $("#search").on('click', function () {
        var pathname = window.location.pathname;

        var id = $("#id").val();
        var uid = $("#uid").val();
        var time = $("#time").val();
        var status = $("#status").val();

        var tail = '?search=1';

        if(id){
            tail += '&id='+id;
        }
        if(uid){
            tail += '&uid='+uid;
        }
        if(time){
            tail += '&time='+time;
        }
        if(status){
            tail += '&status='+status;
        }
        window.location.href = "http://" + window.location.host + pathname + tail;

    });

    //订单详情
    $(".order_detail").on('click', function () {
        var id = $(this).data('id');
        $(".p_mask").show();
        $(".diy_yuanh").show();
        $("#download-order").attr('href', 'download_orders?id=' + id);
        $("#print-order").attr('href', 'print_orders?id=' + id);

        $.ajax({
            type: "post",
            url: "/admin.php/Order/get_detail",
            data: {order_id: id},
            dataType: "json",
            success: function(data){
                $("#scroll_goods").html('');
                var data = data.data;
                $("#scroll_goods").append(data.html);

                var orders_info = data['orders_info'];
                $("#pay_type").html(orders_info['pay_type_name']);
                $("#pay_type_num").html(orders_info['transaction_id']);
                $("#orders_id").html(orders_info['id']);
                $("#orders_origin").html(orders_info['orders_origin']);
                $("#status_str").html(orders_info['status_str']);
                $("#create_time_str").html(orders_info['create_time_str']);
                $("#pay_time_str").html(orders_info['pay_time_str']);

                var ship_info = data['ship_info'];
                $("#ship_name").html(ship_info['ship_name']);
                $("#ship_tel").html(ship_info['ship_tel']);
                $("#ship_address").html(ship_info['ship_address']);
                $("#ship_remark").html(ship_info['ship_remark']);

                var express_info = data['express_info'];
                $("#express_create_time").html(express_info['create_time_str']);
                $("#company_name").html(express_info['company_name']);
                $("#express_code_new").html(express_info['code']);
            }
        });
    });

    //退货申请详情弹出
    $(".refund_apply_detail").on('click', function () {
        var id = $(this).data('id');
        $.ajax({
            type: "post",
            url: "/admin.php/Order/get_refund_express_info",
            data: {order_id: id},
            dataType: "json",
            success: function(data){
                var info = data.info;
                var express_id = info['express_id'];
                var express_code = info['express_code'];
                var remark = info['remark'];
                $("#express_code_refund_apply").val(express_code);
                $("#select_express_refund_apply").val(express_id);
                $("#refund_remark").html(remark);

                $(".p_mask").show();
                $(".diy_thsqxq").show();
            }
        });
    });

    //退款理由弹出
    $(".refund_money_reason").on('click', function () {
        var id = $(this).data('id');
        var flag = $(this).data('flag');
        $.ajax({
            type: "post",
            url: "/admin.php/Order/get_refund_reason",
            data: {order_id: id},
            dataType: "json",
            success: function(data){
                var info = data.info;
                $(".dialog_reason_content").html(info['remark']);
                if(flag == 1){
                    $("#refund_money_goods_reason").html('退款申请理由');
                }else if(flag == 2){
                    $("#refund_money_goods_reason").html('退货申请理由');
                }
                $(".p_mask").show();
                $(".diy_tkly").show();
            }
        });
    });

    //填写快递弹出
    $(".blank_express").on('click', function () {
        var id = $(this).data('id');
        $("#add_express_order_id").val(id);
        var flag = $(this).data('flag');
        if(flag == 1){
            //修改快递
            $("#circle_1").hide();
            $("#circle_1_img").show();
            $("#left_red_line").hide();
            $("#left_white_line").show();
            $("#circle_2").css('color', '#ababab');
            $("#circle_2").css('background', '#ffffff');
            $("#circle_2").show();
            $("#circle_2_img").hide();
            $("#right_red_line").hide();
            $("#right_white_line").show();
            $("#circle_3").show();
            $("#circle_3_img").hide();
            $("#blank_express_dialog").show();
            $(".bylogisticsbox").html('');
            $("#express_info_node").hide();
            $("#express_complete").hide();
            $("#click_btn").css('cursor', 'default');
            $("#click_btn").removeClass("click_btn");
            $("#click_btn_two").css('cursor', 'default');
            $("#click_btn_two").removeClass("click_btn_two");

            $.ajax({
                type: "post",
                url: "/admin.php/Order/get_express_info",
                data: {order_id: id},
                dataType: "json",
                success: function(data){
                    var info = data.info;
                    var express_id = info['express_id'];
                    var express_code = info['express_code'];
                    $("#express_code").val(express_code);
                    $("#select_express").val(express_id);
                }
            });
        }else if(flag == 0){
            //填写快递
            $("#circle_1").show();
            $("#circle_1_img").hide();
            $("#left_red_line").hide();
            $("#left_white_line").show();
            $("#circle_2").css('color', '#ababab');
            $("#circle_2").css('background', '#ffffff');
            $("#circle_2").show();
            $("#circle_2_img").hide();
            $("#right_red_line").hide();
            $("#right_white_line").show();
            $("#circle_3").show();
            $("#circle_3_img").hide();
            $("#blank_express_dialog").show();
            $(".bylogisticsbox").html('');
            $("#express_info_node").hide();
            $("#express_complete").hide();
            $("#click_btn").css('cursor', 'default');
            $("#click_btn").removeClass("click_btn");
            $("#click_btn_two").css('cursor', 'default');
            $("#click_btn_two").removeClass("click_btn_two");

            $("#express_code").val('');
            $("#select_express").val('');
        }else if(flag == 2){
            //物流节点
            $("#circle_1").hide();
            $("#circle_1_img").show();
            $("#left_red_line").show();
            $("#left_white_line").hide();
            $("#circle_2").css('color', '#ffffff');
            $("#circle_2").css('background', '#ff805e');
            $("#right_red_line").hide();
            $("#right_white_line").show();
            $("#circle_3").show();
            $("#circle_3_img").hide();
            $("#blank_express_dialog").hide();
            $("#blank_express_dialog").hide();
            $("#express_complete").hide();
            $("#click_btn").css('cursor', 'default');
            $("#click_btn_two").css('cursor', 'default');
            $("#click_btn").removeClass("click_btn");
            $("#click_btn_two").removeClass("click_btn_two");

            $.ajax({
                type: "post",
                url: "/admin.php/Order/get_express_node",
                data: {order_id: id},
                dataType: "json",
                success: function(data){
                    var info = data.info;
                    $(".bylogisticsbox").html(info);
                    $("#express_info_node").show();
                }
            });
        }else if(flag == 3){
            //已完结
            $("#circle_1").hide();
            $("#circle_1_img").show();
            $("#left_red_line").show();
            $("#left_white_line").hide();
            $("#circle_2").hide();
            $("#circle_2_img").show();
            $("#right_red_line").show();
            $("#right_white_line").hide();
            $("#circle_3").hide();
            $("#circle_3_img").show();
            $("#blank_express_dialog").hide();
            $("#click_btn").css('cursor', 'pointer');
            $("#click_btn_two").css('cursor', 'pointer');
            $("#click_btn").addClass("click_btn");
            $("#click_btn_two").addClass("click_btn_two");

            $.ajax({
                type: "post",
                url: "/admin.php/Order/get_express_node",
                data: {order_id: id},
                dataType: "json",
                success: function(data){
                    var info = data.info;
                    $(".bylogisticsbox").html(info);
                    $("#express_info_node").hide();
                    $("#express_complete").show();
                }
            });
        }

        $(".p_mask").show();
        $(".diy_yh").show();
    });

    $("#click_btn").on('click', function () {
        if($(this).hasClass("click_btn")){
            $("#express_complete").hide();
            $("#express_info_node").show();
        }
    });

    $("#click_btn_two").on('click', function () {
        if($(this).hasClass("click_btn_two")){
            $("#express_complete").show();
            $("#express_info_node").hide();
        }
    });

    //填写快递提交
    $("#add-express-btn").on('click', function () {
        var order_id = $("#add_express_order_id").val();
        var express_id = $("#select_express").val();
        var express_code = $("#express_code").val();
        var is_refund = $("#is_refund").val();

        if(is_refund == 1){
            $.ajax({
                type: "post",
                url: "/admin.php/Order/add_refund_express",
                data: {order_id: order_id, express_id: express_id, express_code: express_code},
                dataType: "json",
                success: function(data){
                    if(data.errno == 1){
                        $(".p_mask").hide();
                        $(".diy_yh").hide();
                        alert(data.errdesc);
                        window.location.reload();
                    }else{
                        alert(data.errdesc);
                        return false;
                    }
                }
            });
        }else{
            $.ajax({
                type: "post",
                url: "/admin.php/Order/add_express",
                data: {order_id: order_id, express_id: express_id, express_code: express_code},
                dataType: "json",
                success: function(data){
                    if(data.errno == 1){
                        $(".p_mask").hide();
                        $(".diy_yh").hide();
                        alert(data.errdesc);
                        window.location.reload();
                    }else{
                        alert(data.errdesc);
                        return false;
                    }
                }
            });
        }
    });

    //驳回退款
    $(".refund_return").on('click', function () {
        if(confirm('确定驳回退款吗？点击确定后将不会被恢复!')){
            var order_id = $(this).data('id');
            $.ajax({
                type: "post",
                url: "/admin.php/Order/refund_return",
                data: {order_id: order_id},
                dataType: "json",
                success: function(data){
                    alert(data.errdesc);
                    if(data.errno == 1){
                        window.location.reload();
                    }else{
                        return false;
                    }
                }
            });
        }
    });

    //完成退款
    $(".finish_refund").on('click', function () {
        if(confirm('确定完成退款了吗？点击确定后将不会被恢复!')){
            var order_id = $(this).data('id');
            $.ajax({
                type: "post",
                url: "/admin.php/Order/finish_refund",
                data: {order_id: order_id},
                dataType: "json",
                success: function(data){
                    alert(data.errdesc);
                    if(data.errno == 1){
                        window.location.reload();
                    }else{
                        return false;
                    }
                }
            });
        }
    });

    //同意退货
    $(".make_rejected").on('click', function () {
        if(confirm('确定同意退货吗？点击确定后将不会被恢复!')){
            var order_id = $(this).data('id');
            $.ajax({
                type: "post",
                url: "/admin.php/Order/make_rejected",
                data: {order_id: order_id},
                dataType: "json",
                success: function(data){
                    alert(data.errdesc);
                    if(data.errno == 1){
                        window.location.reload();
                    }else{
                        return false;
                    }
                }
            });
        }
    });

    //驳回退货
    $(".refuse_rejected").on('click', function () {
        if(confirm('确定驳回退货吗？点击确定后将不会被恢复!')){
            var order_id = $(this).data('id');
            $.ajax({
                type: "post",
                url: "/admin.php/Order/refuse_rejected",
                data: {order_id: order_id},
                dataType: "json",
                success: function(data){
                    alert(data.errdesc);
                    if(data.errno == 1){
                        window.location.reload();
                    }else{
                        return false;
                    }
                }
            });
        }
    });

    //收到退货已退款
    $(".complete_rejected").on('click', function () {
        if(confirm('确定收到退货并且已退款了吗？点击确定后将不会被恢复!')){
            var order_id = $(this).data('id');
            $.ajax({
                type: "post",
                url: "/admin.php/Order/complete_rejected",
                data: {order_id: order_id},
                dataType: "json",
                success: function(data){
                    alert(data.errdesc);
                    if(data.errno == 1){
                        window.location.reload();
                    }else{
                        return false;
                    }
                }
            });
        }
    });

    //关闭按钮
    $(".close-links").on('click', function () {
        $(".p_mask").hide();
        $(".diy_yuanh").hide();
        $(".diy_yh").hide();
        $(".diy_thsqxq").hide();
        $(".diy_tkly").hide();
    });

    //打印按钮
/*    $("#print-order").on('click', function () {
        var id = $(this).data('id');
        window.location.href = 'print_order?id='+id;
        //window.print();
    });*/
})