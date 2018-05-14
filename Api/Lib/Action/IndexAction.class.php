<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends CommonAction {
    public function _initialize(){
        parent::_initialize();
    }
    public function index(){
        $this->json->setAttr('baike',array('admin'=>'tankang','password'=>'123456'));
        $this->json->Send();
    }

    /**
     * 获取用户余额
     * 获取最近商铺id
     */
    public function get_info()
    {
        $info = [];
        $openid = trim($_POST['openid']);
        if (!$openid){
            $this->json->setErr(10000,'缺少参数');
            $this->json->Send();
        }

        $user = M('user');

        $where = [];
        $where['openid'] = $openid;
        $user_balance = $user->where($where)->getField('balance');
        $info['balance'] = $user_balance;

        $start_lon=trim($_POST['lon']);
        if (!$start_lon){
            $this->json->setErr(10002,'缺少参数');
            $this->json->Send();
        }
        $start_lat=trim($_POST['lat']);
        if (!$start_lat){
            $this->json->setErr(10003,'缺少参数');
            $this->json->Send();
        }

        $aboutus = M('aboutus');
        $aboutus_flag = $aboutus->where(array('status'=>1,'is_del'=>0))->order('id desc')->select();
        for($i=0;$i<count($aboutus_flag);$i++){
            $end_lon=$aboutus_flag[$i]['longitude'];
            $end_lat=$aboutus_flag[$i]['latitude'];
            $aboutus_flag[$i]['shop_name'] = $aboutus_flag[$i]['name'];
            $aboutus_flag[$i]['distance']=$this->getDistance($start_lon,$start_lat,$end_lon,$end_lat,$unit=2, $decimal=2);
            $aboutus_flag[$i]['headImage'] = $aboutus_flag[$i]['headpic'];
            $aboutus_flag[$i]['positionImage'] =$aboutus_flag[$i]['position_img'];
            $aboutus_flag[$i]['addr_name'] = $aboutus_flag[$i]['aboutinfor'];
        }
        //排序
        $distance_sort=[];
        foreach ($aboutus_flag as $key => $item) {
            $distance_sort[$key] = $item['distance'];
        }
        array_multisort($distance_sort, SORT_ASC, $aboutus_flag);
        $info['shop_id'] = $aboutus_flag[0]['id'];
        $info['address'] = $aboutus_flag[0]['address'];

        $this->json->setAttr('info',$info);
        $this->json->Send();
    }

    /**
     * 获取用户可用优惠券
     */
    public function get_can_use_coupon()
    {
        $openid = trim($_POST['openid']);
        if (!$openid){
            $this->json->setErr(10000,'缺少参数');
            $this->json->Send();
        }

        $pay_money = trim($_POST['pay_money']);
        if(!$pay_money)
        {
            $pay_money = 0;
        }

        //step1. 获取uid
        $user = M('user');

        $where = [];
        $where['openid'] = $openid;
        $uid = $user->where($where)->getField('id');

        //step2. 获取用户可用优惠券
        $now = time();
        $where = [];
        $where['uid'] = $uid;
        $where['start_time'] = ['lt', $now];
        $where['end_time'] = ['gt',$now];
        $where['is_use'] = 0;
        $where['status'] = 0;
        $user_coupon = M('user_coupon')->where($where)->select();
        if(!$user_coupon)
        {
            $this->json->setAttr('coupon_list',[]);
            $this->json->Send();
        }

        //step3. 处理用户优惠券,根据支付金额,筛选出可用优惠券
        $couponModel = M('coupon');
        $new_user_coupon = [];
        foreach ($user_coupon as $k => $v)
        {
            $coupon_id = $v['coupon_id'];
            $coupon_info = $couponModel->where('id=' . $coupon_id)->find();
            if($coupon_info['status'] == 0 && $coupon_info['start_time'] < time() && $coupon_info['end_time'] > time())
            {
                if($coupon_info['type'] == 1)
                {
                    //立减券
                    $new_user_coupon[] = $v;
                    continue;
                }
                else
                {
                    //满减券
                    $man_price = $coupon_info['conditions'];
                    if($pay_money*100 >= $man_price)
                    {
                        $new_user_coupon[] = $v;
                        continue;
                    }
                }
            }
        }

        $this->json->setAttr('coupon_list',$new_user_coupon);
        $this->json->Send();
    }

    /**
     * 计算两点地理坐标之间的距离
     * @param Decimal $longitude1 起点经度
     * @param Decimal $latitude1 起点纬度
     * @param Decimal $longitude2 终点经度
     * @param Decimal $latitude2 终点纬度
     * @param Int   $unit    单位 1:米 2:公里
     * @param Int   $decimal  精度 保留小数位数
     * @return Decimal
     */
    public function getDistance($longitude1, $latitude1, $longitude2, $latitude2, $unit=2, $decimal=2){
        $EARTH_RADIUS = 6370.996; // 地球半径系数
        $PI = 3.1415926;
        $radLat1 = $latitude1 * $PI / 180.0;
        $radLat2 = $latitude2 * $PI / 180.0;
        $radLng1 = $longitude1 * $PI / 180.0;
        $radLng2 = $longitude2 * $PI /180.0;
        $a = $radLat1 - $radLat2;
        $b = $radLng1 - $radLng2;
        $distance = 2 * asin(sqrt(pow(sin($a/2),2) + cos($radLat1) * cos($radLat2) * pow(sin($b/2),2)));
        $distance = $distance * $EARTH_RADIUS * 1000;
        if($unit==2){
            $distance = $distance / 1000;
        }
        return round($distance, $decimal);
    }
}