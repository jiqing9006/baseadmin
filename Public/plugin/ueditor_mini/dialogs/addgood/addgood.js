(function () {
    var utils = UM.utils;

    function hrefStartWith(href, arr) {
        href = href.replace(/^\s+|\s+$/g, '');
        for (var i = 0, ai; ai = arr[i++];) {
            if (href.indexOf(ai) == 0) {
                return true;
            }
        }
        return false;
    }

    // UM.registerWidget('addgood', {
    //     tpl: "<div style='padding: 30px;'>" +
    //     "<div>" +
    //     "<label for='cm_good_ids'>推荐商品组id:</label>" +
    //     "<input type='text' id='cm_good_ids' style='margin-left: 15px;'>" +
    //     "</div>" +
    //     "</div>",
    //     initContent: function (editor) {
    //         var html = $.parseTmpl(this.tpl);
    //         this.root().html(html);
    //     },
    //     initEvent: function (editor, $w) {
    //
    //     },
    //     buttons: {
    //         'ok': {
    //             exec: function (editor, $w) {
    //                 var goods = $('#cm_good_ids').val();
    //                 if (goods) {
    //                     var html = '<img class="cm_good_recommend" data-id="' + goods + '"/>';
    //                     editor.execCommand('insertHtml', html, true);
    //                 }
    //             }
    //         },
    //         'cancel': {}
    //     },
    //     width: 400
    // })
})();

