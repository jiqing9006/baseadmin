import request from './request'

export default {
    getHomeCMS: (data) => (request('/admin.php/AppIndex/getAppIndexData', data, 'POST')),
    setHomeCMS: (data) => (request('/admin.php/AppIndex/setAppIndexData', data, 'POST')),
    getHomeGood: (data) => (request('/admin.php/Goods/appIndexGoodsInfo', data, 'POST')),

}
