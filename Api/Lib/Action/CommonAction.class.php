<?php
// 本类由系统自动生成，仅供测试用途
class CommonAction extends Action {
    public $json;
    public function _initialize(){
        header("Content-type: text/html; charset=utf-8");
        vendor('Func.Json');
        $this->json = new Json();
    }
}