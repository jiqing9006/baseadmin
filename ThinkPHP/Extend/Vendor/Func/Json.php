<?php
/**
 * Clientmsg 处理类
 * @author sucry
 * 
 * Change by mujiling 2014-05-14
 *
 */
class Json{

    private $attr = array();
    
    /**
     * 消息输出字节大小,API调用统计使用
     * 
     * @var int 
     */
    private $output_bytes = 0;

    public function Json() {
        $this->attr['errno'] =0;
        $this->attr['errdesc'] = "";
        $this->attr['timestamp'] = time();
    }

    public function setErr($errno, $errdesc) {
        $this->attr['errno'] = (int) $errno;
        $this->attr['errdesc'] = $errdesc;
    }

    /**
     * 增加一个错误属性
     * @param string $name 属性名
     * @param mixed $val 属性值
     */
    public function setAttr($name, $val) {
        $this->attr[$name] = $val;
    }
    
    /**
     * 批量增加一组属性
     * 
     * @param Array $sr
     */
    public function setAttrArray($sr){
        foreach($sr As $k => $v) {
            $this->setAttr($k, $v);
        }
    }

    public function getAttr($name) {
        return $this->attr[$name];
    }

    /**
     * 删除一个属性
     * @param string $name 属性名
     */
    public function removeAttr($name) {
        if (isset($this->attr[$name])) {
            unset($this->attr[$name]);
        }
    }

    public function getErr() {
        return json_encode($this->attr);
    }

    public function getErrNo() {
        return $this->attr['errno'];
    }

//    public function getJSON() {
//        return json_encode($this->getErr());
//    }
    
    /**
     * 返回输出字节大小
     * @return int
     */
    public function getoutputbytes() {
        return $this->output_bytes;
    }

    public function sendJSON() {
        if (!headers_sent()) {
            //header("Content-type: application/json");
        }
        $jsonstring = $this->getErr();
        $this->output_bytes = strlen($jsonstring);
        echo $jsonstring;
    }
    
    public function Send(){
        $this->sendJSON();
        exit;
    }
}
?>
