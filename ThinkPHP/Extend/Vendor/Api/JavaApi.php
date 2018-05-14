<?php
class JavaApi {
	private static function _accessApi($cmd,$data) {
		vendor("Func.Http");
		list($host) = explode(":", $_SERVER ['HTTP_HOST']);
		//$url = 'https://uicapi.yoloho.com';
		
		if($host =='marketing.yoloho.com'){
			$url = 'https://uicapi.yoloho.com';
		}elseif($host == 'marketing.test.yoloho.com' || $host == 'local.marketing.yoloho.com'){
			$url = 'https://uicapi.test.yoloho.com';
		}else{
			$url = 'https://uicapi.yoloho.com';
		}
		
		
			
		$url .= $cmd;

		$response = Http::newDoGet($url,$data,15);
		//dump($response);exit;
		return json_decode($response, true);
	}



	private static function _accessDataApi($cmd,$data){
		vendor("Func.Http");
		list($host) = explode(":", $_SERVER ['HTTP_HOST']);
		
		if($host =='marketing.yoloho.com'){
			$url = 'http://dataapi.yoloho.com';
		}elseif($host == 'marketing.test.yoloho.com' || $host == 'local.marketing.yoloho.com'){
			$url = 'http://dataapi.dayima.org';
		}else{
			$url = 'http://dataapi.yoloho.com';
		}
			
		$url .= $cmd;
		$response = Http::newDoGet($url,$data,15);
		return json_decode($response, true);		
	}
	
	private static function _accessUserApi($cmd,$data){
		vendor("Func.Http");
		list($host) = explode(":", $_SERVER ['HTTP_HOST']);
		if($host =='marketing.yoloho.com'){
			$url = 'https://uicapi.yoloho.com';
		}elseif($host == 'marketing.test.yoloho.com' || $host == 'local.marketing.yoloho.com'){
			$url = 'https://uicapi.test.yoloho.com';
		}else{
			$url = 'https://uicapi.yoloho.com';
		}
		
		$url .= $cmd;

		$response = Http::doPost($url,$data,60);
		return json_decode($response, true);
	}
	
	private static function _accessPHPApi($cmd){
		vendor("Func.Http");
		list($host) = explode(":", $_SERVER ['HTTP_HOST']);
		
		if($host =='marketing.yoloho.com'){
			$url = 'https://api.yoloho.com/v1/index.php';
		}elseif($host == 'marketing.test.yoloho.com' || $host == 'local.marketing.yoloho.com'){
			$url = 'https://testapi.yoloho.com/v1/index.php';
		}else{
			$url = 'https://api.yoloho.com/v1/index.php';
		}
		
		$url .= $cmd;
		$response = Http::doGet($url);
		return json_decode($response, true);
	}


	private static function getApiHost(){
		$host = $_SERVER['HTTP_HOST'];
		if($host =='marketing.yoloho.com'){
			$url = 'https://uicapi.yoloho.com';
		}elseif($host == 'marketing.test.yoloho.com' || $host == 'local.marketing.yoloho.com'){
			$url = 'https://uicapi.test.yoloho.com';
		}else{
			$url = 'https://uicapi.yoloho.com';
		}
		return $url;
	}

	static public function rouletteadClick($data){
		$cmd = '/user/coins/adclick';
		$json = self::_accessApi($cmd,$data);
		return $json;
	}

	/**
	 *	第一次进入偷金币游戏,加金币接口
	 * */
	static public function firstSteal($data){
		$cmd = '/user/coins/firstSteal';
		$json = self::_accessApi($cmd,$data);
		return $json;
	}

	/**
	 * 	偷金币接口
	 * */
	static public function stealCoins($data){

		$cmd = '/user/coins/stealCoins';
		$json = self::_accessApi($cmd,$data);

		return $json;
	}

	/**
	 *	偷大宝箱的接口
	 * */
	static function stealChest($data){
		$cmd = '/user/coins/coinsChest';
		$json = self::_accessApi($cmd,$data);
		return $json;
	}
	/**
	 * 转盘加金币接口
	 * */
	static public function roulettePrize($data){
		$cmd = '/user/coins/draw/prize';
		$json = self::_accessApi($cmd,$data);
		return $json;
	}
	
	/**
	 * 转盘扣金币接口
	 * */
	static public function rouletteExpend($data){
		$cmd = '/user/coins/draw/expend';
		$json = self::_accessApi($cmd,$data);
		
		return $json;
		
	}
	
	
	/**
	 * 获取用户金币接口
	 * */
	static public function getCoins($data){
		//dump($data);exit;
		$cmd = '/user/coins/get';
		$json = self::_accessApi($cmd,$data);
		
		if($json['errno']==0){
			return $json;
		}else{
			return $json['errdesc'];
		}
	} 
	
	
	/**
	 *   加金币接口
	 *   参数:  token 和  ruleKey
	 */
	static public function addCoins($data){
		$cmd = '/user/coins/add';
		$json = self::_accessApi($cmd,$data);
		
		if($json['errno']==0){
			return $json;
		}else{
			return $json['errdesc'];
		}
	}
	
	/**
	 * 兑吧扣金币调取java接口
	 * @param  N多  array
	 * @return 金币相关数组
	 */
	static public function parseCreditConsume($data){
		
		$cmd = '/user/coins/remove';
		$json = self::_accessApi($cmd,$data);
		if($json['errno']== 0){
			return $json;
		}else{
			return $json['errdesc'];
		}
	}
	
	/**
	 * @name 获取用户绑定信息
	 * @param mobile
	 * @author wanglisong@dayima.com
	 * @Date 2015 12 14
	 */
	static public function get_user_mobile($token) {
		$cmd = '/user/getusermobile';
		$data = array('token' => $token);
		$json = self::_accessApi($cmd,$data);
		return $json;
	}
	/**
	 * @name 发送手机验证码
	 * @param mobile token device
	 * @author wanglisong@dayima.com
	 * @Date 2015 12 14
	 */
	static public function send_bind_code($mobile, $token, $device) {
		$cmd = '/wap/sendBindCode';
		$data = array(
			'mobile' => $mobile,
			'token'  => $token,
			'device' => $device,
		);
		$json = self::_accessApi($cmd, $data);
		return $json;
	}
	/**
	 * @name 验证用户是否有初始密码
	 * @param token
	 * @author wanglisong@dayima.com
	 * @Date 2015 12 14
	 */
	static public function get_user_pwd($token) {
		$cmd = '/wap/verification';
		$data = array('token' => $token);
		$json = self::_accessApi($cmd, $data);
		return $json;
	}
	/**
	 * @name 绑定手机
	 * @param data{mobile,code,passwd,token}
	 * @author wanglisong@dayima.com
	 * @Data 2015 12 15
	 */
	static public function bind_mobile($data) {
		$cmd = '/wap/bindmobile';
		$json = self::_accessApi($cmd, $data);
		return $json;
	}

	/**
	 * 百宝箱加金币接口
	 * */
	static public function Treasurebox_add_gold($data){
		$cmd = '/user/coins/appPopularize';
		$json = self::_accessApi($cmd,$data);
		return $json;
	}

	/**
	 *   取得链接的分享次数
	 */
	static public function getShareCountByLink($link){
		$cmd = '/admin/shareWapLog/wapAdd ';
		$data = array();
		$data['url'] = $link;
		$json = self::_accessDataApi($cmd, $data);
		return $json;
	}
	
	/**
	 * 签名部分
	 */
	private static function __instance($data = array()) {
		if (empty($data)) {
			return false;
		} else {
			$arr_key = array_keys($data);
			sort($arr_key);
			$new_data = array();
			foreach ( $arr_key as $v ) {
				$new_data[] = $v . "=" . urlencode($data[$v]);
			}
			return implode("&", $new_data);
		}
	}
	
	// 参数数组序列化
	private static function getSignString($data = array()) {
		if (empty($data)) {
			return false;
		} else {
			$arr_key = array_keys($data);
			sort($arr_key);
			$new_data = array();
			foreach ( $arr_key as $v ) {
				$new_data[] = $v . "=" . $data[$v];
			}
			return implode("&", $new_data);
		}
	}

	public static function get_userinfo_by_uid($data = array()){
		$action = 'admin/coins';
		$method = 'get';
		if(empty($data)) return false;
		$time = time();
		$signdata = $data;
		$signdata['ts'] = $time;

		$query_string = self::__instance($signdata);
		$sign_string = "/".$action."/".$method.'?' . self::getSignString($signdata);
		$sign = yutils_api_crypt_encode(0, $sign_string);
		$url = self::getApiHost() ."/".$action."/".$method. "?sign=" . $sign  ."&ts=".$time;
		vendor("Func.Http");
		$response = Http::doPost($url,$data,15);
		return $response;
	}


	
	/**
	 * 获取用户的积分
	 * @param  uid
	 * @return 用户积分相关数组
	 */
	public static function getUserPoints($data){
		$cmd = '/points/userPoints/get';
		$json = self::_accessUserApi($cmd,$data);
	
		if($json['errno']==0){
			return $json;
		}else{
			return $json['errdesc'];
		}
	}

	/**
	 * 偷金币接口
	 */


	/**
	 * 优秀组长top50
	 * @return 组长相关信息数组
	 */
	public function topTeam50($data){
		$cmd = '/leader/top30';
		$json = self::_accessUserApi($cmd,$data);
	
		if($json['errno']==0){
			return $json;
		}else{
			return $json['errdesc'];
		}
	}
	
	/**
	 * 总积分TOP10
	 * @return 积分榜top10数组
	 */
	public function topPoint10($data){
		$cmd = '/points/rank/lastWeekTop10';
		$json = self::_accessUserApi($cmd,$data);
	
		if($json['errno']==0){
			return $json;
		}else{
			return $json['errdesc'];
		}
	}
	
	/**
	 * 得到用户的30天积分汇总
	 * @param  uid
	 * @return 30天积分汇总数组
	 */
	public static function getUserPointsSummery($data){
		$cmd = '/points/userPoints/summery';
		$json = self::_accessUserApi($cmd,$data);
		if($json['errno']==0){
			return $json;
		}else{
			return $json['errdesc'];
		}
	}
	
	/**
	 *  最近7天金币详情
	 */
	public static function getNearSevenGold($data){
		$cmd = '/user/coins/list';
		$json = self::_accessUserApi($cmd,$data);
		if($json['errno']==0){
			return $json;
		}else{
			return $json['errdesc'];
		}
	}
	
	/**
	 *   判断能否创建小组
	 */
	public function judgecreateteam($data){
		$cmd = '/group/group/judgecreate?token='.$data;
		$json = self::_accessPHPApi($cmd);
	
		return $json;
	}
	
	/**
	 * 金币商城扣兑换商品金币接口
	 * */
	static public function mallKouGold($data){
		$cmd = '/user/coins/mallExchange';
		$json = self::_accessApi($cmd,$data);
		return $json;
	}
	
	/**
	 * 金币商城回调接口,加回金币
	 * */
	static public function mallJiaGold($data){
		$cmd = '/user/coins/mallExchangeRestore';
		$json = self::_accessApi($cmd,$data);
		return $json;
	}	
}