<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends CommonAction {
    public function _initialize(){
        parent::_initialize();
    }

    /***
     * @param $where_today  今天订单条件
     * @param $where_seven  7天内订单条件
     * @param $order_fee_today  今天订单结果
     * @param $order_fee_seven  7天内订单结果
     * @param $order_unfund_num  未处理订单数量
     * @param $new_user_num     7天内新增用户数量
     *
     */
    public function index(){
        $car_order_model = M('car_order');
        $user = M('user');
        $backstage_person = M('backstage_person');
        $user_coupon = M('user_coupon');
        $now = time();

        $today_time = strtotime(date('Y-m-d'));
        $seven_time = strtotime('-7 day');

        $where_today['addtime'] = array(
            array('gt', $today_time),
            array('lt', $now)
        );

        $where_seven['addtime'] = array(
            array('gt', $seven_time),
            array('lt', $now)
        );

        $order_fee_today = $car_order_model->where($where_today)->sum('total_price');
        $order_fee_seven = $car_order_model->where($where_seven)->sum('total_price');
        $order_fee_today   =   (int)$order_fee_today/100;
        $order_fee_seven   =   (int)$order_fee_seven/100;
        $order_num = $car_order_model->where(array('status'=>1))->count();
        $user_map = array(
            'create_time'   =>array('gt',strtotime("-70 days")),
            'status'        =>  1
        );
        $new_user_num = $user->where($user_map)->count();
        $car_model = M('car');
        $order_flag = $car_order_model->order('id desc')->where(array('status'=>array('egt',1)))->limit('5')->select();
        for($i=0;$i<count($order_flag);$i++){
            $user_flag=$user->where(array('id'=>$order_flag[$i]['uid']))->find();
            $car_flag =$car_model->where(['id'=>$order_flag[$i]['car_id']])->find();
            $order_flag[$i]['telphone']=$user_flag['telphone'];
            $order_flag[$i]['car_name']=$car_flag['name'];
            $order_flag[$i]['begin_time']=date('Y-m-d H:i',$order_flag[$i]['begin_time']);
            $order_flag[$i]['end_time']=date('Y-m-d H:i',$order_flag[$i]['end_time']);
        }

        $backstage_person_flag=$backstage_person->order('id desc')->limit(1)->select();
        $this->assign('person',$backstage_person_flag);
        $this->assign('result',$order_flag);
        $this->assign('today_price',$order_fee_today);
        $this->assign('seven_day_price',$order_fee_seven);
        $this->assign('order_num',$order_num);
        $this->assign('new_user_num',$new_user_num);
        $this->display();
    }
}