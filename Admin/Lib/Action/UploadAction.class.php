<?php

/**
 * Created by PhpStorm.
 * User: tankang
 * Date: 2017/2/28
 * Time: 下午6:46
 */
class UploadAction extends CommonAction{
    public function index(){
        vendor('Func.Uploader');
        $config = array(
            "savePath" => "./site_upload/umeditor/" ,             //存储文件夹
            "maxSize" => 1000000 ,                   //允许的文件最大尺寸，单位KB
            "allowFiles" => array( ".gif" , ".png" , ".jpg" , ".jpeg" , ".bmp" )  //允许的文件格式
        );
        //上传文件目录
        $Path = "./site_upload/umeditor/";

        //背景保存在临时目录中
        $config[ "savePath" ] = $Path;
        $up = new Uploader( "upfile" , $config );
        $type = $_REQUEST['type'];
        $callback=$_GET['callback'];

        $info = $up->getFileInfo();
        $info['url'] = substr($info['url'],1);
        vendor('Func.Func');
        $host_name = Func::getHostName();
        $url = 'http://' . $host_name . $info['url'];
      
        // vendor('Api.Core');
        // $result = Core::get_data('upload',array('data'=>$url));

        vendor('Qiniu.Qiniu');
        $qiniu = new Qiniu();
        $ext = pathinfo($url, PATHINFO_EXTENSION);
        $name = time() . mt_rand() . '.' . $ext;
        $s = $qiniu->up($url, $name, C('QINIU.BUCKET'));
        //print_r($s);exit;
        if($s){
            @unlink($info['url']);
            $info['url'] = C('CDN.URI').$name;
        }


        if($callback) {
            echo '<script>'.$callback.'('.json_encode($info).')</script>';
        } else {
            echo json_encode($info);
        }
    }

    public function save()
    {
        $width = $_POST['width'];
        $heights = $_POST['heights'];
    
        $file = $this->upload(1, $width, $heights, 'app_index');
    
        echo json_encode($file);
    }

}
