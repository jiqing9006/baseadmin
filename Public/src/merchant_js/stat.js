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


    $(".search_diy_btn").on('click', function () {
        var pathname = window.location.pathname;
        var year = $("#year").val();
        var month = $("#month").val();
        var types = $("#type").val();
        var status = $("#search_status").val();
        var tail = '?search=1';
        if(year){
            tail += '&year='+year;
        }
        if(month){
            tail += '&month='+month;
        }
        if(types){
            tail += '&types='+types;
        }

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

    $(".get_info").on('click', function () {
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

});
