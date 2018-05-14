$(document).ready(function() {
    $(".side-menu li:eq(1)").addClass("active");
    $(".side-menu li:eq(1) ul li:eq(2)").addClass("current-page");
    $(".side-menu li:eq(1) ul").css("display","block");

    $('#datatable').dataTable({
      'ordering' :false,
    });

    var table = $('#datatable').DataTable();
    var page = $("#page").val();
    var pathname = window.location.pathname;

    table.page( parseInt(page) ).draw(false);

    $("#datatable tbody").on('click', '.blank_express', function () {
        var id = $(this).data('order_id');
        $("#add_express_order_id").val(id);
        var flag = $(this).data('flag');
        if(flag == 1){
            $.ajax({
                type: "post",
                url: "/admin.php/Orders/get_express_info",
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
        }

        $(".p_mask").show();
        $(".diy_yh").show();
    });

    $(".close-links").on('click', function () {
        $(".p_mask").hide();
        $(".diy_yh").hide();
        $(".diy_yuanh").hide();
    });

    $("#add-express-btn").on('click', function () {
        var order_id = $("#add_express_order_id").val();
        var express_id = $("#select_express").val();
        var express_code = $("#express_code").val();
        var current_page = table.page();

        $.ajax({
            type: "post",
            url: "/admin.php/Orders/add_express",
            data: {order_id: order_id, express_id: express_id, express_code: express_code},
            dataType: "json",
            success: function(data){
                if(data.errno == 1){
                    $(".p_mask").hide();
                    $(".diy_yh").hide();
                    alert(data.errdesc);
                    window.location.href = "http://" + window.location.host + pathname + '?page=' + current_page;
                }else{
                    alert(data.errdesc);
                    return false;
                }
            }
        });
    });

    $(".get_order_btn").on('click', function () {
        var order_id = $(this).attr('data-id');
        var current_page = table.page();

        $.ajax({
            type: "GET",
            url: "/merchant.php/Index/changeStatusToGet",
            data: {'id' : order_id},
            dataType: "json",
            success: function(data){
              console.log(data);
                if(data.errno == 1){
                    window.location.href = "http://" + window.location.host + pathname + '?page=' + current_page;
                }else{
                    alert(data.errdesc);
                    return false;
                }
            }
        });
    });


    $(".to_end_btn").on('click', function () {
        var order_id = $(this).attr('data-id');
        var current_page = table.page();

        $.ajax({
            type: "GET",
            url: "/merchant.php/Index/changeStatusToEnd",
            data: {'id' : order_id},
            dataType: "json",
            success: function(data){
              console.log(data);
                if(data.errno == 1){
                    window.location.href = "http://" + window.location.host + pathname + '?page=' + current_page;
                }else{
                    alert(data.errdesc);
                    return false;
                }
            }
        });
    });

    $(".search_diy_btn").on('click', function () {
        var pathname = window.location.pathname;
        var order_id = $("#search_order_id").val();
        var telphone = $("#search_telphone").val();
        var add_time = $("#search_time").val();
        var status = $("#search_status").val();
        var tail = '?search=1';
        if(order_id){
            tail += '&order_id='+order_id;
        }
        if(telphone){
            tail += '&telphone='+telphone;
        }
        if(add_time){
            tail += '&create_time='+add_time;
        }
        tail += '&status='+status;
        window.location.href = "http://" + window.location.host + pathname + tail;
    });
});

$(document).ready(function() {
    var handleDataTableButtons = function() {
        if ($("#datatable-buttons").length) {
            $("#datatable-buttons").DataTable({
                dom: "Bfrtip",
                buttons: [
                    {
                        extend: "copy",
                        className: "btn-sm"
                    },
                    {
                        extend: "csv",
                        className: "btn-sm"
                    },
                    {
                        extend: "excel",
                        className: "btn-sm"
                    },
                    {
                        extend: "pdfHtml5",
                        className: "btn-sm"
                    },
                    {
                        extend: "print",
                        className: "btn-sm"
                    },
                ],
                responsive: true
            });
        }
    };

    TableManageButtons = function() {
        "use strict";
        return {
            init: function() {
                handleDataTableButtons();
            }
        };
    }();

    $('#datatable').dataTable();

    $('#datatable-keytable').DataTable({
        keys: true
    });

    $('#datatable-responsive').DataTable();

    $('#datatable-scroller').DataTable({
        ajax: "js/datatables/json/scroller-demo.json",
        deferRender: true,
        scrollY: 380,
        scrollCollapse: true,
        scroller: true
    });

    $('#datatable-fixed-header').DataTable({
        fixedHeader: true
    });

    var $datatable = $('#datatable-checkbox');

    $datatable.dataTable({
        'order': [[ 1, 'asc' ]],
        'columnDefs': [
            { orderable: false, targets: [0] }
        ]
    });
    $datatable.on('draw.dt', function() {
        $('input').iCheck({
            checkboxClass: 'icheckbox_flat-green'
        });
    });

    TableManageButtons.init();
});
