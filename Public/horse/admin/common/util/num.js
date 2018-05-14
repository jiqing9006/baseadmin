/**
 * Created by lvliqi on 2017/3/28.
 */
window.util = window.util || {};

window.util.pad = function(num, n) {
    let len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
};