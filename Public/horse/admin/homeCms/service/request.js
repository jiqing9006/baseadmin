/**
 * Created by lvliqi on 2017/2/27.
 */

let Q = require('q');

let request = (url, data, type) => {
    let defer = Q.defer();
    data = data || {};
    data.from = 'pc';

    $.ajax({
        url,
        data,
        type: type || 'GET',
        dataType: 'JSON',
        success: (data) => {
            if (data.errno) {
                // if (data.errno == 'weijingmodenglu') {
                //     request(url, data, type);
                // } else if (data.errno == 'weidenglu') {
                //     //TODO 跳转登录页面
                //
                // } else {
                //     defer.reject(new Error(data.errdesc));
                // }

                window.doError(data)

            } else {
                defer.resolve(data);
            }
        },
        error: () => {
            defer.reject(new Error('网络错误'));
        }
    });

    return defer.promise;
};


export default request;