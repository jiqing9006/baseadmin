$(document).ready(function() {
    $(".side-menu li:eq(2)").addClass("active");
    $(".side-menu li:eq(2) ul li:eq(0)").addClass("current-page");
    $(".side-menu li:eq(2) ul").css("display","block");

    $('#datatable').dataTable({
        "aaSorting": [
            [ 0, "desc" ]
        ],
        "aoColumnDefs": [{
            "bSortable" : false,
            "aTargets" : [1,2,4,6,7,8,9,10]
        }]
    });

    var table = $('#datatable').DataTable();
    var page = $("#page").val();
    var pathname = window.location.pathname;

    table.page( parseInt(page) ).draw(false);

    $("#datatable tbody").on('click', '.edit-btn', function () {
        var current_page = table.page();
        var id = $(this).data('id');
        var url = '/admin.php/Coupon/edit?id=' + id + '&page=' + current_page;
        window.location.href = url;
    });

    $("#datatable tbody").on('click', '.cancel-dong-btn', function () {
        var current_page = table.page();
        var id = $(this).data('id');
        $.ajax({
            type: "post",
            url: "/admin.php/Coupon/cancel_dong",
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
    });

    $("#datatable tbody").on('click', '.set-dong-btn', function () {
        var current_page = table.page();
        var id = $(this).data('id');
        $.ajax({
            type: "post",
            url: "/admin.php/Coupon/set_dong",
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
