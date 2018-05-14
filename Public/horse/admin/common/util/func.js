/**
 * Created by lvliqi on 2017/4/30.
 */
window.util = window.util || {};


window.util.open_url = (url, newWindow) => {
    // let el = document.createElement("a");
    // document.body.appendChild(el);
    // el.href = url; //url 是你得到的连接
    // el.target = '_blank'; //指定在新窗口打开
    // el.click();
    // document.body.removeChild(el);

    if(newWindow){
        newWindow.location.href = url;
    } else {
        let id = `m_${Date.now()}`;
        let a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');
        a.setAttribute('id', id);
        // 防止反复添加
        if (!document.getElementById(id)) document.body.appendChild(a);
        a.click();
    }
};