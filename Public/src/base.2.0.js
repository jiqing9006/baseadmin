/**
 * Created by lvlq on 16/2/24.
 */
// +----------------------------------------------------------------------
// | Tjs [ Sucry 自己改造的js库  此文件一般改造系统变量for Html5 ] 基于jquery
// +----------------------------------------------------------------------
// | v1.6.2 release  2014.12.18
// +----------------------------------------------------------------------
// | Copyright (c) 2014-2015 http://www.dayima.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: Sucry <sqboytan@126.com><tankang@dayima.com>
// +----------------------------------------------------------------------

/*************************************************************************
 * 改造系统alert
 * param  str  传入要弹出的str
 *          pos  弹出的位置        1
 *                            2
 *                            3
 * return false
 *************************************************************************/
window.alert = function (str, pos) {
    if (document.getElementById("tAlert") || !str) {
        return false;
    }
    var position = '';
    var pos = pos || 1;
    var tAlert_wrap = document.createElement("div");
    tAlert_wrap.setAttribute("id", "tAlert");
    tAlert_wrap.style.textAlign = "center";
    tAlert_wrap.style.position = "fixed";
    tAlert_wrap.style.zIndex = "100";
    switch (pos) {
        case 1:
            position = '10%';
            break;
        case 2:
            position = '40%';
            break;
        case 3:
            position = "65%";
            break;
        default:
            position = "10%";
            break;
    }
    tAlert_wrap.style.top = position;
    tAlert_wrap.style.width = "100%";
    document.getElementsByTagName("body")[0].appendChild(tAlert_wrap);
    var tAlert_in = document.createElement("div");
    tAlert_in.style.padding = "0.125rem 0.4375rem";
    tAlert_in.style.maxWidth = "6.25rem";
    tAlert_in.style.zIndex = "99";
    tAlert_in.style.fontSize = "0.375rem";
    tAlert_in.style.textShadow = "none";
    tAlert_in.style.display = "inline-block";
    tAlert_in.style.lineHeight = "0.5rem";
    tAlert_in.style.backgroundColor = "#000000";
    tAlert_in.style.color = "#ffffff";
    tAlert_in.style.borderRadius = "0.1875rem";
    tAlert_in.style.opacity = "0.8";
    tAlert_in.style.wordBreak = "break-all";
    tAlert_in.textContent = str;
    document.getElementById("tAlert").appendChild(tAlert_in);
    setTimeout(function () {
        document.getElementsByTagName("body")[0].removeChild(tAlert_wrap);
    }, 2000);
    return false;
}


/*************************************************************************
 *　方法:Array.remove(dx)   此函数是已知数组下标进行删除。
 *　功能:删除数组元素.
 *　参数:dx删除元素的下标.
 *　返回:在原数组上修改数组
 *************************************************************************/
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
}
/*************************************************************************
 *　方法:Array.removeValue(dx)   此函数是已知数值进行删除数组中对应的数组元素。
 *　功能:删除数组元素.
 *　参数:dx删除元素的值.
 *　返回:在原数组上修改数组
 *************************************************************************/
Array.prototype.removeValue = function (dx) {
    //if(isNaN(dx)||dx>this.length){return false;}
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != dx) {
            this[n++] = this[i];
        } else {
            this.length -= 1
        }
    }
}

/*************************************************************************
 *　对象名:tReg
 *　功能    :  一些正则的集合。
 *　参数    :  @param telphone、email and so on
 *　返回    :  返回true or false
 *************************************************************************/
var tReg = function () {
};
/*
 * 正则匹配手机号码  传入tels 返回true or false
 * */
tReg.prototype.matchTels = function (tels) {
    var telReg = !!tels.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
    return telReg;
}


/*
 * 获取对象的长度
 * */

function getObjecLength(obj) {
    var i = 0;
    for (v in obj) {
        i++;
    }
    return i;
}


/*************************************************************************
 *　对象名    :    t_animationEvent
 *　功能        :   CSS3动画执行完毕\开始\循环执行后执行的一些事件  兼容webkit\Mozilla\Opera\MS等浏览器
 *　参数        :    @param 无
 *　返回        :    返回 事件参数
 *************************************************************************/
var t_animationEvent = function () {
};
t_animationEvent.prototype.t_transitionend = function () {
    var t;
    var el = document.createElement('t_element');
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MsTransition': 'msTransitionEnd'
    }
    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

t_animationEvent.prototype.t_animationstart = function () {
    var t;
    var el = document.createElement('t_element');
    var animations = {
        'animation': 'animationstart',
        'OAnimation': 'oAnimationStart',
        'MozAnimation': 'animationstart',
        'WebkitAnimation': 'webkitAnimationStart',
        'MsAnimation': 'msAnimationStart'
    }
    for (t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}

t_animationEvent.prototype.t_animationend = function () {
    var t;
    var el = document.createElement('t_element');
    var animations = {
        'animation': 'animationend',
        'OAnimation': 'oAnimationEnd',
        'MozAnimation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd',
        'MsAnimation': 'msAnimationEnd'
    }
    for (t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}

t_animationEvent.prototype.t_animationiteration = function () {
    var t;
    var el = document.createElement('t_element');
    var animations = {
        'animation': 'animationiteration',
        'OAnimation': 'oAnimationIteration',
        'MozAnimation': 'animationiteration',
        'WebkitAnimation': 'webkitAnimationIteration',
        'MsAnimation': 'msAnimationIteration'
    }
    for (t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}

/**
 * 获取url中得参数
 * @author lvliqi
 * @param name
 * @returns {null}
 */
window.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 数字补零
 * @author lvliqi
 * @param num
 * @param n
 * @returns {string}
 */
window.pad = function (num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
};

/**
 * 重写默认confirm
 * @param str
 * @param cb 回调一个bool值
 * @param title 默认是'美月优选提示您'
 */
window.confirm = function (str, cb, title) {
    title = title || '系统提示您';
    var html =
        '<style>#cancel:active,#affirm:active{background-color: #e7e7e7}</style>' +
        '<div style="position:fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0.7);z-index: 999999;">' +
        '    <div style="position:absolute;top: 50%;left: 50%;margin-top:-2.34375rem;margin-left: -4.0625rem;width: 8.125rem; border-radius: 0.15625rem;background-color: #f5f5f5;">' +
        '        <div style="min-height: 2.65625rem;border-bottom: 1px solid #dadada;">' +
        '            <div style="text-align: center;padding-top: 0.6875rem;color: #333333;font-size: 0.53125rem;font-weight: bold;">' +
        title +
        '            </div>' +
        '            <div style="margin-top: 0.34375rem;color: #333333;font-size: 0.40625rem;text-align: center;padding: 0 0.3125rem;word-break: break-all;margin-bottom: 0.3125rem;">' +
        str +
        '            </div>' +
        '        </div>' +
        '        <div style="text-align: center;">' +
        '            <span id="cancel" style="border-bottom-left-radius: 0.15625rem;font-weight: bold;display: table-cell;line-height: 1.375rem;width: 4.0625rem;text-align: center;color: #007aff;font-size: 0.5rem;border-right: 1px solid #dadada;">' +
        '                取消' +
        '            </span>' +
        '            <span id="affirm" style="border-bottom-right-radius:0.15625rem;display: table-cell;line-height: 1.375rem;width: 4.0625rem;text-align: center;color: #007aff;font-size: 0.5rem;">' +
        '                确认' +
        '            </span>' +
        '        </div>' +
        '    </div>' +
        '</div>';
    var $dialog = $(html);
    $("body").append($dialog);

    $dialog.find("#cancel").off("click").on("click", function () {
        cb(false);
        $dialog.remove();
    });

    $dialog.find("#affirm").off("click").on("click", function () {
        cb(true);
        $dialog.remove();
    });
};

/**
 * 判断浏览器版本
 * @type {{versions: {webKit, ios, android, weixin, txnews, sinawb, mqq}, language: string}}
 */
window.browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            webKit: u.indexOf('AppleWebKit') > -1,
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            weixin: u.indexOf('MicroMessenger') > -1,
            txnews: u.indexOf('qqnews') > -1,
            sinawb: u.indexOf('weibo') > -1,
            mqq: u.indexOf('QQ') > -1
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

/**
 * 动态加载js
 * @param url
 * @param callback
 */
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                if (callback) {
                    callback()
                }
            }
        }
    } else {
        script.onload = function () {
            if (callback) {
                callback()
            }
        }
    }
    script.src = url;
    document.body.appendChild(script)
}

window.public_params = {
    uid: document.getElementById("uid").value,
    token: document.getElementById("token").value,
    openid: document.getElementById("openid").value,
    headimgurl: document.getElementById("headimgurl").value,
    nickname: document.getElementById("nickname").value,
    sex: document.getElementById("sex").value
};

var oldAjax = $.ajax;
$.ajax = function (data) {
    data.url += "?no_cache=" + new Date().getTime();
    data.data = data.data || {};
    $.extend(data.data, public_params);
    oldAjax(data);
};


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}