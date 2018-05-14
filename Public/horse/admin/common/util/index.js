/**
 * Created by lvliqi on 2017/3/20.
 */
import './image'
import './num'
import './func'

import React from 'react'
import {Modal, message} from 'antd';

window.url = window.url || {};

window.url.jump = (url) => {
    window.location.href = url;
};

window.warningAlert = (msg) => {
    message.warning(msg, 2);
};

window.successAlert = (msg) => {
    message.success(msg, 2);
};

window.errorAlert = (msg) => {
    message.error(msg, 2);
};

window.confirm = ({
                      title = '系统提示',
                      content,
                      onCancel = () => {
                      },
                      onOk = () => {
                      }
                  }) => {
    Modal.confirm({
        title: title,
        content: content,
        okText: '确认',
        cancelText: '取消',
        onOk: onOk,
        onCancel: onCancel
    });
};

window.alert = (str) => {
    Modal.info({
        title: '系统提示',
        content: (
            <div>
                <p>{str}</p>
            </div>
        )
    })
};

window.toTop = () => TweenLite.to(document.body, 0.5, {scrollTop: 0});
