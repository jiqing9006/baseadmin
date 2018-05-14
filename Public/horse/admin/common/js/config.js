let host = ``;

let order_status = {
    '1': '未支付',
    '2': '已支付',
    '3': '配送中',
    '4': '已申请退款',
    '5': '已完成退款',
    '6': '已退款驳回',
    '7': '已完成',
    '8': '已申请退货',
    '9': '已同意退货',
    '10': '退货中',
    '11': '退货已驳回',
    '12': '退货办理中',
    '13': '已完成退货',
    '15': '订单未创建',
    '16': '订单已过期'
};

export default {
    host, order_status,
    cdn_host: '',
    api: {
        userGuestLogin: `/api.php/User/guest_login`,                  //静默登录
        userGuestLogout: `/api.php/User/guest_logout`,                //静默登出
        userLogin: `/api.php/User/login`,                             //登录
        userRegister: `/api.php/User/register`,                       //注册
        userSendSm: `/api.php/User/send_sm`,                          //发送短信验证码
        userUserInfo: `/api.php/User/user_info`,                      //获取用户信息
        userIsLogin: `/api.php/User/is_login`,                        //是否登录
    }
}