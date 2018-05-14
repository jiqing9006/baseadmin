<?php

class Func {
    /**
     * 获取主机名
     */
    public static function getHostName() {
        list($host) = explode(":", $_SERVER ['HTTP_HOST']);
        return $host;
    }

    /**
     * 获取当前页面完整的url地址
     * */
    public static function get_url() {
        if ($_SERVER['QUERY_STRING']) {
            return 'http://' . $_SERVER['HTTP_HOST'] . '/index.php' . preg_replace('/\/index.php/i', '', $_SERVER['PHP_SELF']) . '?' . $_SERVER['QUERY_STRING'];
        } else {
            return 'http://' . $_SERVER['HTTP_HOST'] . '/index.php' . preg_replace('/\/index.php/i', '', $_SERVER['PHP_SELF']);
        }

    }

    /**
     * array to url
     * @param array $array 数组  必须是关联数组
     */
    public static function array_to_url($array) {
        $str = '';
        foreach ($array as $key => $val) {
            $str .= $key . '=' . $val . '&';
        }
        $str = rtrim($str, '&');
        return $str;
    }


    public static function isOnline() {
        $flag = TRUE;
        $host = self::getHostName();
        if ($host == 'local.marketing.yoloho.com' || $host == 'marketing.test.yoloho.com') {
            $flag = FALSE;
        }
        return $flag;
    }

    /**
     * 写数据到文件，自动写锁定
     * @param string $f 带路径文件名
     * @param string $d 要写入的数据，可为二进制
     * @param string $m = 'a' 文件模式，如w, a, wb, ab
     */
    public static function writeFile($f, $d, $m = 'a') {
        $fp = fopen($f, $m);
        if ($fp) {
            if (flock($fp, LOCK_EX)) {
                fwrite($fp, $d);
                flock($fp, LOCK_UN);
            }
            fclose($fp);
        }
    }

    public static function checkMobile($tel) {
        $search = '/^(1(([35][0-9])|(47)|[8][0-9]|[7][0-9]))\d{8}$/';
        if (preg_match($search, $tel)) {
            return true;
        } else {
            return false;
        }
    }

    public static function exportExcel($expTitle, $expCellName, $expTableData, $topData) {
        $xlsTitle = iconv('utf-8', 'gb2312', $expTitle);//文件名称
        $fileName = $xlsTitle;//or $xlsTitle 文件名称可根据自己情况设定
        $cellNum = count($expCellName);
        $dataNum = count($expTableData);
        $topNum = count($topData);
        vendor("PHPExcel.PHPExcel");

        $objPHPExcel = new PHPExcel();
        $cellName = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ');

        $objPHPExcel->getActiveSheet(0)->mergeCells('A1:' . $cellName[$cellNum - 1] . '1');//合并单元格
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A1', $expTitle);

        for ($i = 0; $i < count($topData); $i++) {
            for ($j = 0; $j < count($topData[$i]); $j++) {
                $objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellName[$j] . ($i + 2), $topData[$i][$j]);
            }
        }

        for ($i = 0; $i < $cellNum; $i++) {
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellName[$i] . ($topNum + 2), $expCellName[$i][1]);
        }
        // Miscellaneous glyphs, UTF-8
        for ($i = 0; $i < $dataNum; $i++) {
            for ($j = 0; $j < $cellNum; $j++) {
                if ($expCellName[$j][0] == 'account_type') {
                    if ($expTableData[$i][$expCellName[$j][0]] == 0) {
                        $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[$j] . ($i + $topNum + 3), '餐饮');
                    } else {
                        $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[$j] . ($i + $topNum + 3), '果蔬');
                    }
                } else {
                    $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[$j] . ($i + $topNum + 3), $expTableData[$i][$expCellName[$j][0]]);
                }
            }
        }

        header('pragma:public');
        header('Content-type:application/vnd.ms-excel;charset=utf-8;name="' . $xlsTitle . '.xls"');
        header("Content-Disposition:attachment;filename=$fileName.xls");//attachment新窗口打印inline本窗口打印
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save('php://output');
        exit;
    }

    public static function exportOrderInfoExcel($expTitle, $expTableData) {
        $xlsTitle = iconv('utf-8', 'gb2312', $expTitle);//文件名称
        $fileName = $xlsTitle;//or $xlsTitle 文件名称可根据自己情况设定
        $goodsInfoDataNum = count($expTableData['goods_info']);
        $expressInfoDataNum = count($expTableData['express_info']['express_info']);
        vendor("PHPExcel.PHPExcel");

        $goodsInfoExpCellName  = array(
            array('goods_id','商品ID'),
            array('goods_number','商品编号'),
            array('name','商品名称'),
            array('ob_name','商品类型'),
            array('base_name','商品品种'),
            array('attr_name','商品属性'),
            array('count','商品数量'),
            array('price','商品单价')
        );

        $orderInfoExpCellName = array(
            array('id','订单号'),
            array('pay_type_name','支付平台'),
            array('transaction_id','支付平台编号'),
            array('orders_origin','订单来源'),
            array('status_str','订单状态'),
            array('create_time_str','下单时间'),
            array('pay_time_str','支付时间'),
            array('price','支付金额'),
            array('total_price','商品总价'),
            array('deliver_price','运费'),
            array('coupon','优惠券'),
        );

        $ShipInfoExpCellName  = array(
            array('username','用户'),
            array('uid','UID'),
            array('ship_name','收件人'),
            array('ship_tel','电话'),
            array('ship_address','收货地址'),
            array('ship_remark','备注'),
        );

        $ExpressInfoExpCellName = array(
            array('create_time_str','发货时间'),
            array('company_name','物流公司'),
            array('code','物流编号'),
        );

        $objPHPExcel = new PHPExcel();
        $cellName = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ');

        $hang = 1;

        $objPHPExcel->getActiveSheet(0)->mergeCells('A' . ($hang) . ':' . $cellName[10] . ($hang)); //合并单元格
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A' . $hang, $expTitle);

        $hang += 1;

        // 设置商品信息
        $objPHPExcel->getActiveSheet(0)->mergeCells('A' . ($hang) . ':' . $cellName[7] . ($hang));
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A' . ($hang), '商品信息');
        $objPHPExcel->getActiveSheet(0)->getStyle('A' . ($hang))->applyFromArray(
            array(
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
                )
            )
        );  //居中

        $hang += 1;

        for ($i = 0; $i < 8; $i++) {
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellName[$i] . ($hang), $goodsInfoExpCellName[$i][1]);
        }

        $hang += 1;

        for ($i = 0; $i < $goodsInfoDataNum; $i++) {
            for ($j = 0; $j < 8; $j++) {
                if ($goodsInfoExpCellName[$j][0] == 'price') {
                    $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[$j] . ($hang), $expTableData['goods_info'][$i][$goodsInfoExpCellName[$j][0]] / 100);
                }else{
                    $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[$j] . ($hang), $expTableData['goods_info'][$i][$goodsInfoExpCellName[$j][0]]);
                }
            }
            $hang++;
        }

        //设置订单信息
        $objPHPExcel->getActiveSheet(0)->mergeCells('A' . ($hang) . ':' . $cellName[10] . ($hang));
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A' . ($hang), '订单信息');
        $objPHPExcel->getActiveSheet(0)->getStyle('A' . ($hang))->applyFromArray(
            array(
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
                )
            )
        );

        $hang += 1;

        for ($i = 0; $i < 11; $i++) {
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellName[$i] . ($hang), $orderInfoExpCellName[$i][1]);
        }

        $hang += 1;

        for ($j = 0; $j < 11; $j++) {
            if (in_array($orderInfoExpCellName[$j][0], ['price', 'total_price', 'deliver_price'])) {
                $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[$j] . ($hang), $expTableData['orders_info'][$orderInfoExpCellName[$j][0]] / 100);
            }else{
                $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[$j] . ($hang), $expTableData['orders_info'][$orderInfoExpCellName[$j][0]]);
            }
        }

        $hang += 1;

        //设置收货信息
        $objPHPExcel->getActiveSheet(0)->mergeCells('A' . ($hang) . ':' . $cellName[5] . ($hang));
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A' . ($hang), '收货信息');
        $objPHPExcel->getActiveSheet(0)->getStyle('A' . ($hang))->applyFromArray(
            array(
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
                )
            )
        );

        $hang += 1;

        for ($i = 0; $i < 6; $i++) {
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellName[$i] . ($hang), $ShipInfoExpCellName[$i][1]);
        }

        $hang += 1;

        for ($j = 0; $j < 11; $j++) {
            $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[$j] . ($hang), $expTableData['ship_info'][$ShipInfoExpCellName[$j][0]]);
        }

        $hang += 1;

        //设置物流信息
        $objPHPExcel->getActiveSheet(0)->mergeCells('A' . ($hang) . ':' . $cellName[2] . ($hang));
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A' . ($hang), '物流信息');
        $objPHPExcel->getActiveSheet(0)->getStyle('A' . ($hang))->applyFromArray(
            array(
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
                )
            )
        );

        $hang += 1;

        for ($i = 0; $i < 3; $i++) {
            $objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellName[$i] . ($hang), $ExpressInfoExpCellName[$i][1]);
        }

        $hang += 1;

        for ($j = 0; $j < 11; $j++) {
            $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[$j] . ($hang), $expTableData['express_info'][$ExpressInfoExpCellName[$j][0]]);
        }

        $hang += 1;

        $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[0] . ($hang), '物流节点内容');
        $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[1] . ($hang), '物流节点时间');

        $hang += 1;

        for ($i = 0; $i < $expressInfoDataNum; $i++) {
            $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[0] . ($hang), $expTableData['express_info']['express_info'][$i]['info']);
            $objPHPExcel->getActiveSheet(0)->setCellValue($cellName[1] . ($hang), $expTableData['express_info']['express_info'][$i]['time']);
            $hang++;
        }

        header('pragma:public');
        header('Content-type:application/vnd.ms-excel;charset=utf-8;name="' . $xlsTitle . '.xls"');
        header("Content-Disposition:attachment;filename=$fileName.xls");//attachment新窗口打印inline本窗口打印
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save('php://output');
        exit;
    }

    //上传图片到本地服务器
    public static function upload_pem($file, $wechat_type){
        if($wechat_type == 1){
            $tail = 'public/';
        }else if($wechat_type == 2){
            $tail = 'open/';
        }
        //得到文件名称
        $name = $file['name'];
        $type = strtolower(substr($name,strrpos($name,'.')+1));
        $allow_type = array('pem');
        if(!in_array($type, $allow_type)){
            return false;
        }
        if(!is_uploaded_file($file['tmp_name'])){
            return false;
        }
        $upload_path = realpath(__ROOT__) . "/site_upload/wxpay/" . $tail;
        if (!is_dir($upload_path)){
            @mkdir($upload_path, 0777, true);
        }

        if(move_uploaded_file($file['tmp_name'], $upload_path . $name)){
            return "/site_upload/wxpay/" . $tail .$name;
        }else{
            return false;
        }
    }
}