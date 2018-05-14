/**
 * Created by lvliqi on 2017/6/23.
 */
import 'es5-shim'
import 'es5-shim/es5-sham'
import 'babel-regenerator-runtime'
import 'babel-polyfill'
import 'es6-promise/auto'
import './common/lib/gsap/TweenLite.min'

import './common/util'
import dva from 'dva';
import {browserHistory} from 'dva/router';
import './common/scss/common.scss'
// import './mall/scss/index.scss'
import {message} from 'antd'

const app = dva({
    history: browserHistory,
    onError(e) {
        console.error(e.message);
        message.error(e.message, 2);
    },
});

app.router(require('./route'));
app.start('#root');