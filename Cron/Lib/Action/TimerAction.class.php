<?php
/**
 * Created by PhpStorm.
 * User: jiqing
 * Date: 18-5-12
 * Time: 下午6:56
 */

class TimerAction extends Action
{
    // 清除无效的订单
    public function clearOrder() {
        $car_order_model = M('car_order');
        $time = time()-6*60*60;
        $sql = "UPDATE `tf_car_order` SET `status` = 7 WHERE `status` = 1 AND `begin_time` < ".$time;
        $count = $car_order_model->execute($sql);
        echo "本次共清理了".$count."条订单\n";
    }

    public function clearSms() {
        $sms_code_model = M('sms_code');
        $time = time()-5*60;
        $sql = "UPDATE `tf_sms_code` SET `status` = 2 WHERE `status` = 1 AND `addtime` < ".$time;
        $count = $sms_code_model->execute($sql);
        echo "本次共清理了".$count."条验证码\n";
    }
}