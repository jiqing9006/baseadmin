<?php
class MarketingApi {
	private static function _accessApi($module, $action, $params, $data = array()) {
		$domain = 'admin.yoloho.com';
		vendor("Func.Func");
		vendor("Func.Http");
		$host = Func::getHostName();
		if ($host=='marketing.test.yoloho.com') {
			$domain = 'testadmin.yoloho.com';
		} elseif ($host=='local.marketing.yoloho.com') {
			$domain = 'testadmin.yoloho.com';
		}
		
		$url = 'http://' . $domain . '/dayimaapi/' . $module . '/' . $action;
		
		if (!empty($params)) {
			$first = 1;
			foreach ($params as $key => $val) {
				if ($first) {
					$url .= '?' . $key . '=' . urlencode($val);
					$first = 0;
				} else {
					$url .= '&' . $key . '=' . urlencode($val);
				}
			}
		}
		
		$response = Http::doPost($url,$data,15);
		$str='<?php $array=' . var_export($response,true) . '; ?>';
		file_put_contents('/tmp/u_tankang_checkTokenA.log', $str);
		return json_decode($response, true);
	}
	
	private static function _accessnewdayimaApi($module,$action,$data = array()){
		$domain = 'www.dayima.com';
		vendor("Func.Func");
		vendor("Func.Http");
		$host = Func::getHostName();
		if ($host=='marketing.test.yoloho.com') {
			$domain = 'newdayima.test.yoloho.com';
		} elseif ($host=='local.marketing.yoloho.com') {
			$domain = 'local.www.dayima.com';
		}
		
		$url = 'http://' . $domain . '/'.$module.'/' . $action;
		
		$response = Http::doPost($url,$data,15);
		return json_decode($response, true);
	}
	
	static public function getusermarketinfobyuid($uid){
		$json = self::_accessApi('marketing', 'getusermarketinfobyuid', array("uid"=>$uid));
		return $json['info'];
	}
	
	static public function getnickbyuid($uid){
		$json = self::_accessApi('marketing', 'getnickbyuid', array("uid"=>$uid));
		return $json['info'];
	}
	/*
	 * 0 正确  只要不是0全错！
	 * */
	static public function checktoken($uid,$token){
		$json = self::_accessApi('marketing', 'checktoken', array("uid"=>$uid,"token"=>$token));
		
		return $json['errno'];
	}
	
	static public function getuserbyuid($uid){
		
		$json = self::_accessApi('user', 'singleinfo', array("uid"=>$uid));
		return $json['user'];
	}
	
	static public function sendmsg($uid,$title){
		$json = self::_accessApi('marketing', 'sendmsg', array("uid"=>$uid,"title"=>$title));
		//file_put_contents("/tmp/push_single_".date("Y_m_d_H_i").".log",$json['info']);
		return $json['info'];
	}
	
	static public function newsendmsg($uid,$title,$token,$nature){
		$json = self::_accessnewdayimaApi('sendMsg', 'sendPrivateLetter', array("uid"=>"93649925","touid"=>$uid,"title"=>$title,"token"=>$token,"nature"=>$nature));
		if($json['info']=='error'){
			file_put_contents("/tmp/yh_".date("Y_m_d_H_i").".log",$uid."token error");
		}
		return $json['info'];		
	}
	
	static public function getusernextperiod($uid){
		$json = self::_accessApi('marketing', 'getUserNextPeriod', array("uid"=>$uid));
		return $json['info'];
	}

	static public function getusermonthpoints($uid){
		$json = self::_accessnewdayimaApi('marketdownload', 'getusermonthpoints', array("uid"=>$uid));
		return $json['info'];
	}
	
	static public function getuserage($uid){
		$json = self::_accessnewdayimaApi('marketdownload', 'getuserage', array("uid"=>$uid));
		return $json['info'];
	}	
}