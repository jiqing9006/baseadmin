<?php
class Red {
    
    static private $redis = NULL;

    private $_red = NULL;

    private $_return_data = NULL;

    static public function create() {
        if(self::$redis) {
            return Red::$redis;   
        }    

        self::$redis = new self;
        return self::$redis;
    } 
    
    public function __call($func, $params) {
        if ($func == 'multi') {
            $this->_return_data = $this->_red->multi($params[0]);

        } else {
            $this->_return_data = call_user_func_array(array(&$this->_red, $func), $params);

        }

        return $this->_return_data;
    }

    private function __construct() {
    
         $this->_red = new Redis(); 
         $this->_red->connect(C("REDIS_HOST"),C("REDIS_PORT"));
         $this->_red->auth('Ttklb0010');
         return Red::$redis;
    }
 }
