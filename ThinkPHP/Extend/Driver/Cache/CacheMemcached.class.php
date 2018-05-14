<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2012 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

defined('THINK_PATH') or exit();
/**
 * Memcache缓存驱动
 * @category   Extend
 * @package  Extend
 * @subpackage  Driver.Cache
 * @author    liu21st <liu21st@gmail.com>
 */
class CacheMemcached extends Cache {

    /**
     * 架构函数
     * @param array $options 缓存参数
     * @access public
     */
	function __construct($options=array()) {
		if ( !extension_loaded('memcached') ) {
			throw_exception(L('_NOT_SUPPERT_').':memcached');
		}
		
		vendor("Func.Func");
		$host_prev = 'ONLINE';
		if(Func::isOnline()){
			$host_prev = 'ONLINE';
			$ocs = true;
		}else{
			$host_prev = 'OFFLINE';
			$ocs = false;
		}
		$options = array_merge(array (
				'host' => C('DAYIMA_CACHE_SERVER_'.$host_prev),
				'port' => C('DAYIMA_CACHE_PORT_'.$host_prev),
				'username' => C('DAYIMA_CACHE_USERNAME_'.$host_prev),
				'password' => C('DAYIMA_CACHE_PASSWORD_'.$host_prev),
				'ocs' => $ocs,
				'timeout' => C('DAYIMA_DATA_CACHE_TIMEOUT') ? C('DAYIMA_DATA_CACHE_TIMEOUT') : false,
				'persistent' => false,
		),$options);
		
		$this->options = $options;
		$this->options['expire'] = isset($options['expire'])? $options['expire'] : C('DATA_CACHE_TIME');
		$this->options['prefix'] = isset($options['prefix'])? $options['prefix'] : C('DATA_CACHE_PREFIX');
		$this->options['length'] = isset($options['length'])? $options['length'] : 0;
		$this->handler = new Memcached;
		if($options['persistent'] && $options['timeout'] !== false){
			$this->handler->setOption(Memcached::OPT_CONNECT_TIMEOUT,$options['timeout']);
		}
		//阿里云OCS
		if($options['ocs']){
			$this->handler->setOption(Memcached::OPT_COMPRESSION, false);
			$this->handler->setOption(Memcached::OPT_BINARY_PROTOCOL, true);
			$this->handler->addServer($options['host'],$options['port']);
			$this->handler->setSaslAuthData($options['username'], $options['password']);
		}else{
			$this->handler->addServer($options['host'],$options['port']);
		}
	}

    /**
     * 是否连接
     * @access private
     * @return boolen
     */
    private function isConnected() {
        return $this->connected;
    }

    /**
     * 读取缓存
     * @access public
     * @param string $name 缓存变量名
     * @return mixed
     */
    public function get($name) {
        N('cache_read',1);
        return $this->handler->get($name);
    }

    /**
     * 写入缓存
     * @access public
     * @param string $name 缓存变量名
     * @param mixed $value  存储数据
     * @param integer $expire  有效时间（秒）
     * @return boolen
     */
    public function set($name, $value, $expire = null) {
        N('cache_write',1);
    	if(is_null($expire)) {	
    		$expire = $this->options['expire'];	
  		}
        if($this->handler->set($name, $value, $expire)) {
            if($this->options['length']>0) {
                // 记录缓存队列
                $this->queue($name);
            }
            return true;
        }
        return false;
    }

    /**
     * 删除缓存
     * @access public
     * @param string $name 缓存变量名
     * @return boolen
     */
    public function rm($name, $ttl = false) {
        return $ttl === false ?
            $this->handler->delete($name) :
            $this->handler->delete($name, $ttl);
    }

    /**
     * 清除缓存
     * @access public
     * @return boolen
     */
    public function clear() {
        return $this->handler->flush();
    }
}