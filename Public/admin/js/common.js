/**
 * Created by tankang on 2017/2/9.
 */
(function(){
    $(document).on('click','.input-group-btn',function () {
        $(this).prev().click();
    }).on('change','.file-real',function () {
        $(this).prev().html($(this).val());
    })
})();