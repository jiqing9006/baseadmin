/**
 * Created by lvliqi on 2017/3/20.
 */
window.util = window.util || {};

window.util.cdnUrl = ({url, w, h}) => {
    return `${url}?imageView2/1/w/${w}/h/${h}/interlace/1`
};