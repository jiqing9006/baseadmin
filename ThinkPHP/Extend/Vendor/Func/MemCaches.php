<?php
class MemCaches{
	private static $__cache = array();
	private static $_memcache = null;
	private static function _getCacheInstance() {
		vendor("Func.Func");
		if (empty(self::$_memcache)) {
			$host_prev = 'ONLINE';
			if(Func::isOnline()){
				$host_prev = 'ONLINE';
			}else{
				$host_prev = 'OFFLINE';
			}
			$host = C('DAYIMA_CACHE_SERVER_'.$host_prev);
			$port = C('DAYIMA_CACHE_PORT_'.$host_prev);
			$username = C('DAYIMA_CACHE_USERNAME_'.$host_prev);
			$password = C('DAYIMA_CACHE_PASSWORD_'.$host_prev);
			self::$_memcache = new \Memcached();
			self::$_memcache->setOption(\Memcached::OPT_BINARY_PROTOCOL, true);
			self::$_memcache->setOption(\Memcached::OPT_SERIALIZER, \Memcached::SERIALIZER_IGBINARY);
			self::$_memcache->addServer($host, $port);
			if (!empty($username) && !empty($password)) {
				self::$_memcache->setSaslAuthData($username, $password);
			}
		}
		return self::$_memcache;
	}
	/**
	 * 取得指定KEY的缓存项目
	 *
	 * @param string $key        	
	 * @return mixed NULL
	 */
	public static function get($key) {
		
		if (isset(self::$__cache[$key])) {
			return self::$__cache[$key];
		} else {
			self::$__cache[$key] = self::_getCacheInstance()->get($key);
			return self::$__cache[$key];
		}
	}
	/**
	 * 判断指定KEY的存在状态
	 *
	 * @param string $key        	
	 * @return boolean
	 */
	public static function has($key) {
		if (!empty($key)) {
			if (array_key_exists($key, self::$__cache)) {
				return true;
			} else {
				$item = self::get($key);
				if (!empty($item)) {
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 根据指定KEY存储内容
	 *
	 * @param string $key        	
	 * @param mixed $value        	
	 */
	public static function set($key, $value, $expire = 600) {
		self::$__cache[$key] = $value;
		self::_getCacheInstance()->set($key, $value, $expire);
	}
	/**
	 * 删除指定KEY对应的缓存项目
	 *
	 * @param string $key        	
	 */
	public static function remove($key) {
		unset(self::$__cache[$key]);
		self::_getCacheInstance()->delete($key);
	}
}