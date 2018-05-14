$(document).ready(function() {
    $(".side-menu li:eq(4)").addClass("active");
    $(".side-menu li:eq(4) ul li:eq(0)").addClass("current-page");
    $(".side-menu li:eq(4) ul").css("display","block");

    $('#datatable_merchant').dataTable({
        "aaSorting": [
            [ 0, "desc" ]
        ],
        "aoColumnDefs": [{
            "bSortable" : false,
            "aTargets" : [1,2,3,4,5,6,7]
        }]
    });

    var table = $('#datatable').DataTable();
    var page = $("#page").val();
    var pathname = window.location.pathname;
    var table_merchant = $('#datatable_merchant').DataTable();
    table_merchant.page( parseInt(page) ).draw(false);

    $("#datatable tbody").on('click', '.edit-btn', function () {
        var current_page = table.page();
        var id = $(this).data('id');
        var url = '/admin.php/Merchant/edit?id=' + id + '&page=' + current_page;
        window.location.href = url;
    });


    $("#datatable_merchant tbody").on('click', '.del-btn', function () {
        if(confirm('您真的要删除吗？删除的话~ 将不会被恢复!')){
            var current_page = table_merchant.page();
            var id = $(this).prev().val();
            $.ajax({
                type: "post",
                url: "/admin.php/Merchant/delete",
                data: {id: id},
                dataType: "json",
                success: function(data){
                    if(data.errno == 1){
                        alert(data.errdesc);
                        window.location.href = "http://" + window.location.host + pathname + '?page=' + current_page;
                    }else{
                        alert(data.errdesc);
                        return false;
                    }
                }
            });
        }
    });

    $("#datatable_merchant tbody").on('click', '.disable-btn', function () {
        if(confirm('您真的要封禁吗？')){
            var current_page = table_merchant.page();
            var id = $(this).prev().val();
            $.ajax({
                type: "post",
                url: "/admin.php/Merchant/disable",
                data: {id: id},
                dataType: "json",
                success: function(data){
                    if(data.errno == 1){
                        alert(data.errdesc);
                        window.location.href = "http://" + window.location.host + pathname + '?page=' + current_page;
                    }else{
                        alert(data.errdesc);
                        return false;
                    }
                }
            });
        }
    });

    $("#datatable_merchant tbody").on('click', '.enable-btn', function () {
        if(confirm('您真的要解封吗？')){
            var current_page = table_merchant.page();
            var id = $(this).prev().val();
            $.ajax({
                type: "post",
                url: "/admin.php/Merchant/enable",
                data: {id: id},
                dataType: "json",
                success: function(data){
                    if(data.errno == 1){
                        alert(data.errdesc);
                        window.location.href = "http://" + window.location.host + pathname + '?page=' + current_page;
                    }else{
                        alert(data.errdesc);
                        return false;
                    }
                }
            });
        }
    });

    $("#datatable_merchant tbody").on('click', '.reset-pwd-btn', function () {
        var current_page = table_merchant.page();
        var id = $(this).data('id');
        var url = '/admin.php/Merchant/resetPass?id=' + id + '&page=' + current_page;
        window.location.href = url;
    });

    $("#datatable_merchant tbody").on('click', '.edit-btn', function () {
        var current_page = table_merchant.page();
        var id = $(this).data('id');
        var url = '/admin.php/Merchant/edit?id=' + id + '&page=' + current_page;
        window.location.href = url;
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
