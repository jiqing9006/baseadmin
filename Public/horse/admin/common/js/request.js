/**
 * 该方法仅支持IE8以上
 * 网络请求方法
 * url：请求地址
 * options = {
*   catchs: 异常处理，控制台抛出的异常是否自己处理：true 是，false 否 由公共方法统一处理优化显示给用户 默认 false
*   credentials: 请求带上cookies，是每次请求保持会话一直
*   method: 请求使用的方法，如 GET、POST
*   headers: 请求的头信息，形式为 Headers 对象或 ByteString。
*   body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
*   mode: 请求的模式，如 cors、no-cors 或者same-origin。是否允许跨域请求
*   cache:  请求的 cache 模式: default, no-store, reload, no-cache, force-cache, or only-if-cached.
* }
 */

export default (url, options) => {
    var init = {
        credentials: 'include',
        method: (options && options.method) || 'GET',
        cache: (options && options.cache) || 'default'
    };
    if (options && options.body) {
        init.body = JSON.stringify(options.body)
    }
    return fetch(url, init)
        .then(function (response) {
            if (response.ok) {
                if (options && options.dataType == 'text') {
                    return response.text();
                } else {
                    return response.json();
                }
            } else {
                if (options && options.catchs) {
                    throw new Error(response.statusText);
                } else {
                    throw new Error(response.statusText);
                }
            }
        })
};