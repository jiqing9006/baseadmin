<?php
// 本类由系统自动生成，仅供测试用途
class CommonAction extends Action {
    private function _get_path_info(){
        $c_path_info = $_SERVER['PATH_INFO'];       //找出当前的url
        if(!$c_path_info) $c_path_info = '/';
        if($c_path_info=='/Index/index' || $c_path_info== '/Index' || $c_path_info== '/Index/') $c_path_info = '/';
        if($c_path_info!='/'){
            $c_path_info_arr = explode('/',$c_path_info);
            if(!$c_path_info_arr[2]){
                $c_path_info = rtrim($c_path_info,'/');
                $c_path_info .= '/index';
            }
        }
        return $c_path_info;
    }

    private function _get_left_menu(){
        $c_path_info = $this->_get_path_info();
        $action = M('action');
        $c_left_act_result = $action->where('urls="'.$c_path_info.'" and level in(2,3)')->find();   //查询url

        if($c_left_act_result['is_show']!=1) { //再往上找一级
            $c_left_act_result = $action->where(array('id'=>$c_left_act_result['pid']))->find();   //查询url
        }
        //判断是否属于3级菜单的第一个。
        $k = $action->where(array('pid'=>$c_left_act_result['id'],'urls'=>$c_left_act_result['urls']))->find();   //查询url
        if($k){
            $c_left_act_result = $k;
        }
        return $c_left_act_result;
    }

    public function _initialize() {
        header("Content-type: text/html; charset=utf-8");
        if(!$_SESSION['_admin_nick_name'] && !$_SESSION['_admin_user_id']){
            $this->redirect('__APP__/Public/login');
        }
        vendor('Func.Func');
        $this->assign('hostname',Func::getHostName());
        $action = M('action');
        $c_left_act_result = $this->_get_left_menu();   //查询url
//        dump($c_left_act_result);
//        dump('---------------------------------------------------------------------------------------------------------');
        if($c_left_act_result['level']==3){
            $r_result = $action->where(array('id'=>$c_left_act_result['pid']))->find();
            $first_result = $action->where(array('id'=>$r_result['pid']))->find();
        }else{
            $first_result = $action->where(array('id'=>$c_left_act_result['pid']))->find(); //找出所属的一级分类
            $r_result = $first_result;
        }

//        dump($first_result);
//        dump('---------------------------------------------------------------------------------------------------------');
//        dump($r_result);
//        dump('---------------------------------------------------------------------------------------------------------');

        if(!$_SESSION['_admin_super']){
            $power = explode('-',$_SESSION['_admin_power']);
//            dump($power);
            $c_action_result = array();
            for($i=0;$i<count($power);$i++){
                $result = $action->where(array('id'=>$power[$i]))->find();

                if($result['pid']==0){
                    if($result['id'] ==  $first_result['id']){
                        $result['is_chose'] = 1;
                    }else{
                        $result['is_chose'] = 0;
                    }
                    $c_action_result[] = $result;
                }
            }

            $this->assign('c_action_result',$c_action_result);

            $c_left_menus = $action->where(array('pid'=>$first_result['id'],'is_show'=>1))->select();  //找二级

            $c_left_menu = array();
            for($j=0;$j<count($c_left_menus);$j++){
                if(in_array($c_left_menus[$j]['id'],$power)){

                    $t_menu = $action->where(array('pid'=>$c_left_menus[$j]['id'],'is_show'=>1))->select();
                    if($t_menu){
                        for($k=0;$k<count($t_menu);$k++){
                            if($t_menu[$k]['id'] ==  $c_left_act_result['id']){
                                $t_menu[$k]['is_chose'] = 1;
                            }else{
                                $t_menu[$k]['is_chose'] = 0;
                            }

                            if(in_array($t_menu[$k]['id'],$power)){
                                $c_left_menus[$j]['t_menu'][] = $t_menu[$k];
                            }
                        }
                    }
                    if($c_left_act_result['level']==2) {
                        if ($c_left_menus[$j]['id'] == $c_left_act_result['id']) {
                            $c_left_menus[$j]['is_chose'] = 1;
                        } else {
                            $c_left_menus[$j]['is_chose'] = 0;
                        }
                    }elseif($c_left_act_result['level']==3) {
                        if($c_left_menus[$j]['id'] == $r_result['id']){
                            $c_left_menus[$j]['is_chose'] = 1;
                        }else{
                            $c_left_menus[$j]['is_chose'] = 0;
                        }
                    }

                    $c_left_menu[] = $c_left_menus[$j];
                }
            }

//            dump($c_left_menu);
//            exit;
            $this->assign('c_left_menu',$c_left_menu);


        }else{
            //搜索出一级列表

            $c_action_result = $action->where(array('pid'=>0,'level'=>1,'is_show'=>1))->select();
            for($i=0;$i<count($c_action_result);$i++){
                if($c_action_result[$i]['id'] == $r_result['id']){
                    $c_action_result[$i]['is_chose'] = 1;
                }else{
                    $c_action_result[$i]['is_chose'] = 0;
                }
            }

            if($c_left_act_result['level']==2){
                $c_left_menu = $action->where(array('pid'=>$first_result['id'],'is_show'=>1))->select();  //找二级
            }elseif($c_left_act_result['level']==3){
                $c_left_menu = $action->where(array('pid'=>$r_result['pid'],'is_show'=>1))->select();  //找二级
            }

            for($j=0;$j<count($c_left_menu);$j++){
                $t_menu = $action->where(array('pid'=>$c_left_menu[$j]['id'],'is_show'=>1))->select();

                if($t_menu){
                    for($t=0;$t<count($t_menu);$t++){
                        if($c_left_act_result['id']==$t_menu[$t]['id']){
                            $t_menu[$t]['is_chose'] = 1;
                        }else{
                            $t_menu[$t]['is_chose'] = 0;
                        }
                    }
                    $c_left_menu[$j]['t_menu'] = $t_menu;
                }
                if($c_left_act_result['level']==2) {
                    if ($c_left_menu[$j]['id'] == $c_left_act_result['id']) {
                        $c_left_menu[$j]['is_chose'] = 1;
                    } else {
                        $c_left_menu[$j]['is_chose'] = 0;
                    }
                }elseif($c_left_act_result['level']==3){

                    if ($c_left_menu[$j]['id'] == $r_result['id']) {
                        $c_left_menu[$j]['is_chose'] = 1;
                    } else {
                        $c_left_menu[$j]['is_chose'] = 0;
                    }
                }
            }

//            dump($c_left_menu);exit;
            $this->assign('c_left_menu',$c_left_menu);
            $this->assign('c_action_result',$c_action_result);
            $this->assign('fe_host',C('FE_HOST'));
            $this->assign('admin_name',C('ADMIN_NAME'));
            $this->assign('admin_logo',C('ADMIN_LOGO'));
        }
    }

        public function say($data) {
            vendor('Func.Json');
            $json = new Json();
            $json->setAttrArray($data);
            $json->send();
        }

    /**
     * @param $ksize
     * @param $widths
     * @param $heights
     * @param $folders
     * @return mixed
     * 上传方法    大小,宽度,高度,文件夹
     */
    public function upload($ksize, $widths, $heights, $folders, $name = 'file'){

    if($_FILES[$name]['size'] > 1024000){
        $res['error'] = '图片质量大小不能超过1M！';
        return $res;
    }

	if($ksize == 1){
            $size = getimagesize($_FILES[$name]['tmp_name']);
		    $sizearray = explode('"',$size[3]);
            $width = $size[0];
            $height = $size[1];
            if($width == $widths && $height == $heights){
                //continue
            }else{
                $res['error']='尺寸不合要求!';
                return $res;
            }

        }elseif($ksize == 2){
            $size = getimagesize($_FILES[$name]['tmp_name']);
            $sizearray = explode('"',$size[3]);
            $height = $size[1];
            if($height == $heights){
                //continue
            }else{
                $res['error']='尺寸不合要求!';
                return $res;
            }
        }

        $us=$folders;
        import('ORG.Net.UploadFile');
        $upload = new UploadFile();								// 实例化上传类
        $upload->maxSize  = 3145728000000;						// 设置附件上传大小
        $upload->saveRule = time().'_'.mt_rand();
        $folders = date('Ymd',time());
        $upload->savePath =  "site_upload/".$us.'/'.$folders.'/';// 设置附件上传目录
        //$upload =Public/site_upload/banner_img/20170820/111.jpg
        if (!is_dir($upload->savePath)){
            @mkdir('./'.$upload->savePath, 0777,true);
        }
        $upload->upload();
        $info = $upload->getUploadFileInfo();//取得成功上传的文件信息
        
        if($info){

            //$res['msg']='ok';
            //$res['save_name'] = $upload->savePath . $info[0]['savename'];

            vendor('Func.Func');
            $host_name = Func::getHostName();
            vendor('Qiniu.Qiniu');
            $qiniu = new Qiniu();

            $img =  C('SF_HOST'). $upload->savePath . $info[0]['savename'];

            $ext = pathinfo($img, PATHINFO_EXTENSION);

            $name = time() . mt_rand() . '.' . $ext;
            
            $s = $qiniu->up($img, $name, C('QINIU.BUCKET'));
            
            if($s){
                @unlink('/' .$info[0]['savepath'] . $info[0]['savename']);
                $res['msg']='ok';
                $res['save_name'] = C('CDN.URI') . $name;
            }else{
                @unlink('/' .$info[0]['savepath'] . $info[0]['savename']);
                $res['error'] = '上传失败!!';
            }
        }else{
            $res['error']='上传失败!!';
        }

        return $res;

    }

    public function send_message($type, $uid){
        //type=1:发货消息   type=2:宝贝有新动态  type=3:收到优惠券
        $add = [];
        $add['message_id'] = $type;
        $add['uid'] = $uid;
        $add['create_time'] = time();
        $user_message = M('user_message');
        $user_message->add($add);
    }


    public function set(){
        vendor('Func.Json');
        $json = new Json();
        $id = (int)$_POST['id'];
        $type = trim($_POST['type']);
        $sold = (int)$_POST['sold'];
        $table = trim($_POST['table']);

        if (!$id || !$type){
            $json->setErr('10001','缺少参数');
            $json->Send();
        }
        $model_table = M($table);
        if(!$model_table->find()){
            $json->setErr('10002','缺少正确的表格信息');
            $json->Send();
        }
        $flag = $model_table->where(array('id'=>$id))->find();
        if (!$flag){
            $json->setErr('10003','没有该选项');
            $json->Send();
        }
        $data[$type] = $sold;
        $save_flag = $model_table->where(array('id'=>$id))->save($data);
        if ($save_flag || $save_flag === 0){
            $json->setErr(0,'更新成功');
            $json->Send();
        }else{
            $json->setErr('10004','编辑失败');
            $json->Send();
        }
    }


    public function __call($name, $arguments)
    {
        echo '<html><head><title>404 Not Found</title></head><body bgcolor="white"><center><h1>404 Not Found</h1></center><hr><center>nginx/1.10.1</center></body></html>';exit;
    }
}
