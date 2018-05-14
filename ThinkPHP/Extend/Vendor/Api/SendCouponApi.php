<?php
class SendCouponApi {
	private static function _accessApi($url,$type, $data = array()){
		vendor("Func.Func");
		vendor("Func.Http");
		if($type=='GET'){
			$response = Http::doGet($url,15);
		}elseif($type=='newGet'){
			$response = Http::newDoGet($url,$data,15);
		}else{
			$response = Http::doPost($url,$data,15);
		}
		return json_decode($response, true);
	}
	
	/*
	 * 	神州转车领券api
	 * 	神州上线前要   cid   key  origin
	 * */
	public static function _accessShenzhou($mobile){
		$shenzhouCouponOrigin 	= 'wxhbdayima';
		$shenzhouCid 			= '20151008' ;	
		$shenzhouKey			= 'wxhbdayima-442f-330ub40-7aa93f004a02';
		
		$url = 'http://mktm.10101111.com/redscommon/get.do';
		$data = array();
		$data['mobile'] 		= $mobile;
		$data['couponOrigin']	= $shenzhouCouponOrigin;
		$data['cid']			= $shenzhouCid;
		$data['sign']			= md5('mobile='.$mobile.'couponOrigin='.$shenzhouCouponOrigin.'key='.$shenzhouKey);
		return self::_accessApi($url,'newGet',$data);
	}
	
	/*
	 * 唱吧api
	 * */
	public static function _accessChangba($mobile){
		$key 	= '6Fw619FF28B86sf0119Bbs12Dg00C04FC964FFgetCouponForDYM';
		$secret = 'JeJKCYk2jh2331df';
		$sign 	= md5($key.$mobile.$secret);
		$url 	= 'http://mall.changba.com/service/getCoupon.php';
		$data['phone']	= $mobile;
		$data['secret'] = $secret;
		$data['sign']	= $sign;	
		return self::_accessApi($url,'POST',$data);
	}
	
	
	/**
	 * 每日优鲜
	 * */
	public static function _accessMryx($mobile){
		//$url ='http://as.staging.missfresh.cn/v1/red_packet/receive/redpacket/code';		//线下
		$url  = 'http://as-vip.missfresh.cn/v1/red_packet/receive/redpacket/code';		//线上
		$data['mobile_no'] 	= $mobile;
		$data['platform']  	= 'dayima';
		$data['api_key']	= '462fbc2cd9e0f6dc637f87bd3ace6673b9e25564';
		return self::_accessApi($url,'POST',$data);
	}
	
	
	/**
	 * 泰笛 api接口
	 * */
	public static function _accessTedi($mobile){
		$url = 'http://partner.dayima.24tidy.com/api/addcouponfordayima';
		$data = array();
		$data['token'] = 'bUCulBdvWWRtMTyh2ULUpfUQf5DXlKJo';
		$data['phone'] = $mobile;
		return self::_accessApi($url,'POST',$data);
 	}
 	
 	/*
 	 * 美月  api接口  上线前换成 正式的环境
 	 * */
 	public static function _accessMy($mobile,$uid){
 		//$url = 'http://testmall.meiyue.com/coupon/grant_coupon';
 		$url = 'http://mall.meiyue.com/coupon/grant_coupon';
 		$data = array();
 		$data['uid'] = $uid;
 		$data['mobile'] = $mobile;
 		return self::_accessApi($url,'POST',$data);
 	}

 	/*
 	 * 	58到家接口
 	 * */
 	public static function _accessDj($mobile){
 		$url = 'http://t.jzt.58.com/commoncoupon/releasecoupon';
 		$data = array();
 		$data['phone'] = $mobile;
 		$data['act'] =	'dayima_01';
 		$key = 'C60315C561BFBC53915A7817315A9419';
 		//$data['act'] = '3855';
 		$data['nonstr'] = time();
 		$token = strtoupper(md5('act='.$data['act'].'&nonstr='.$data['nonstr'].'&phone='.$mobile.'&sign='.$key));
 		$data['token'] = $token;	
 		
 		return self::_accessApi($url,'POST',$data);
 	}
 	
 	/*
 	 * 	58到家测试接口
 	* */
 	public static function _accessTestDj($mobile){
 		$url = 'http://t.jzt.58.com/commoncoupon/releasecoupon';
 		$data = array();
 		$data['phone'] = $mobile;
 		$data['act'] =	'dayima_01';
 		$key = 'C60315C561BFBC53915A7817315A9419';
 		//$data['act'] = '3855';
 		$data['nonstr'] = time();
 		$token = strtoupper(md5('act='.$data['act'].'&nonstr='.$data['nonstr'].'&phone='.$mobile.'&sign='.$key));
 		$data['token'] = $token;
 		dump($data);
 		return self::_accessApi($url,'POST',$data);
 	}
 	
 	/**
 	 * 每日优选测试接口
 	 * @param unknown $mobile
 	 */
 	public static function _accessTestMryx($mobile){
 		//$url ='http://as.staging.missfresh.cn/v1/red_packet/receive/redpacket/code';		//线下
 		$url  = 'http://as-vip.missfresh.cn/v1/red_packet/receive/redpacket/code';		//线上
 		$data['mobile_no'] 	= $mobile;
 		$data['platform']  	= 'dayima';
 		$data['api_key']	= '462fbc2cd9e0f6dc637f87bd3ace6673b9e25564';
 		
 		return self::_accessApi($url,'POST',$data);
 	} 	
 	
 	
 	
 	public static  function _accessElm($mobile){
 		$url = 'http://openapi.ele.me/v2/misc/hongbao_request/';
 		$consumerSecret = '3c0f6655563380fb2749a6709e0e0e45597f74d2';
 		$system_param = array(
 				"consumer_key" 	=> 3942431130,
 				"timestamp" 	=> time(),
 				'mobile'		=> $mobile
 		);
 		$sign = self::EleConcatParams($system_param, true);
 		$str = $url.'?'.$sign.$consumerSecret;
 		$sig = sha1(bin2hex($str));
 		$system_param['sig'] = $sig;
 		$sign = self::EleConcatParams($system_param, true);
 		$data = array();
 		$data['mobile'] = $mobile;
 		$requestUrl = $url.'?'.$sign;
 		return self::_accessApi($requestUrl,'POST',$data);
 	} 
 	
 	
 	
 	private static  function EleConcatParams($params, $encode) {
 		ksort($params);
 		$pairs = array();
 		foreach ($params as $key => $val) {
 			if ($encode == true) {
 				array_push($pairs, $key . '=' . urlencode($val));
 			} else {
 				array_push($pairs, $key . '=' . $val);
 			}
 		}
 		return join('&', $pairs);
 	}
}