<?php
class MeiyueApi {
	//public $appid = 'app_dayima';

	//private $secret = 'ndZWcZ0GEwDYfPpfydQ32E36A677C05E5A50FDD8F8DC3A5BE19';
	
	private static function _accessApi($cmd,$data) {
		$url = '';
		vendor("Func.Http");
		list($host) = explode(":", $_SERVER ['HTTP_HOST']);
		if($host =='marketing.yoloho.com'){
			$url = 'http://mall.meiyue.com';
		}elseif($host == 'marketing.test.yoloho.com' || $host == 'local.marketing.yoloho.com'){
			$url = 'http://testmall.meiyue.com';
		}else{
			$url = 'http://testmall.meiyue.com';
		}
			
		$url .= $cmd;
		
		$response = Http::doPost($url,$data,15);
		return json_decode($response, true);
	}
	
	public static function getCoupon($uid,$activityId){
		$data = array();
		$data['activityId']		= $activityId;
		
		vendor("Func.Http");
		list($host) = explode(":", $_SERVER ['HTTP_HOST']);
		if($host =='marketing.yoloho.com'){
			//	online线上 切到线上的时候用此处
			$data['appid'] 			= 'app_dayima';
			$data['secret']   		= 'NjbmjI3P0p2yRnhSZJ7996FC16B44A32279591F6B56AEBE7D4';
		}elseif($host == 'marketing.test.yoloho.com' || $host == 'local.marketing.yoloho.com'){
			$data['appid'] 			= 'app_dayima';
			$data['secret']   		= 'ndZWcZ0GEwDYfPpfydQ32E36A677C05E5A50FDD8F8DC3A5BE19';
		}else{
			//	online线上 切到线上的时候用此处
			$data['appid'] 			= 'app_dayima';
			$data['secret']   		= 'NjbmjI3P0p2yRnhSZJ7996FC16B44A32279591F6B56AEBE7D4';
		}
		
		$data['uid'] 			= $uid;
		$b = $data;
		
		$sign = md5(json_encode($data));
		unset($data['secret']);
		$data['sign']			= strtoupper($sign);
		
		$b['sign'] = $data['sign'];
		$b['time'] = date('Y-m-d H:i:s',time());
		$str='<?php $array=' . var_export($b,true) . '; ?>';
		file_put_contents('/tmp/yuanhao_24.log', $str,FILE_APPEND);		
	
		$cmd = '/api/coupon/grantCouponByAct.do';
		$json = self::_accessApi($cmd,$data);
		
		$a = $json;
		if(!$a || $a['err_msg'] != ''){
			$a['time'] = date('Y-m-d H:i:s',time());
			$a['uid'] = $uid;
			$a['activityId'] = $activityId;
			$str='<?php $array=' . var_export($a,true) . '; ?>';
			file_put_contents('/tmp/yuanhaos_error_24.log', $str,FILE_APPEND);
			
			$christmas_error = M('christmas_error');
			$save = array();
			$save['uid'] = $uid;
			$save['aid'] = $activityId;
			$save['errortime'] = date('Y-m-d H:i:s',time());
			$save['isfix'] = 0;
			$christmas_error->add($save);
		}else{
			$a['time'] = date('Y-m-d H:i:s',time());
			$str='<?php $array=' . var_export($a,true) . '; ?>';
			file_put_contents('/tmp/yuanhaos_24.log', $str,FILE_APPEND);
		}
		
		return $json;
	}
	
	public static function getCouponbyYh($uid,$activityId){
		$data = array();
		$data['activityId']		= $activityId;
	
		vendor("Func.Http");
		list($host) = explode(":", $_SERVER ['HTTP_HOST']);
		if($host =='marketing.yoloho.com'){
			//	online线上 切到线上的时候用此处
			$data['appid'] 			= 'app_dayima';
			$data['secret']   		= 'NjbmjI3P0p2yRnhSZJ7996FC16B44A32279591F6B56AEBE7D4';
		}elseif($host == 'marketing.test.yoloho.com' || $host == 'local.marketing.yoloho.com'){
			$data['appid'] 			= 'app_dayima';
			$data['secret']   		= 'ndZWcZ0GEwDYfPpfydQ32E36A677C05E5A50FDD8F8DC3A5BE19';
		}else{
			//	online线上 切到线上的时候用此处
			$data['appid'] 			= 'app_dayima';
			$data['secret']   		= 'NjbmjI3P0p2yRnhSZJ7996FC16B44A32279591F6B56AEBE7D4';
		}
	
		$data['uid'] 			= $uid;
		$b = $data;
	
		$sign = md5(json_encode($data));
		unset($data['secret']);
		$data['sign']			= strtoupper($sign);
	
		$b['sign'] = $data['sign'];
		$b['time'] = date('Y-m-d H:i:s',time());
		$str='<?php $array=' . var_export($b,true) . '; ?>';
		file_put_contents('/tmp/new_yuanhao.log', $str,FILE_APPEND);
	
		$cmd = '/api/coupon/grantCouponByAct.do';
		$json = self::_accessApi($cmd,$data);
	
		$a = $json;
		$a['time'] = date('Y-m-d H:i:s',time());
		$str='<?php $array=' . var_export($a,true) . '; ?>';
		file_put_contents('/tmp/new_yuanhaos.log', $str,FILE_APPEND);
	
		return $json;
	}
	
	public static function test($uid,$activityId){
		$christmas_error = M('christmas_error');
		$save = array();
		$save['uid'] = $uid;
		$save['aid'] = $activityId;
		$save['errortime'] = date('Y-m-d H:i:s',time());
		$christmas_error->add($save);
	}
}