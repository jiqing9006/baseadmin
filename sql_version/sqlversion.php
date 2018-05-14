<?php
/**
 * php版sqlversion
 * author     : yuanhao
 * date       : 2015-7-16
 * change	  : sucry
 * 目录结构要求 : 本文件为sqlversion.php,同级目录中有个sql_version按照数据库目录,里面是00001.sql,00002.sql依次类推   例如：  sql_version/dbname/1/00001.sql    sql_version/dbname/
 * 如何使用    : cd到本文件所在目录,如果配置好php的环境变量,直接执行 php -f sqlversion.php  这条命令
 */

header("Content-Type: text/html;charset=utf-8");
error_reporting(E_ALL | E_STRICT);
//conn=Mysql.connect 'rdsj2yjnrn6nanf.mysql.rds.aliyuncs.com', 'marketing', 'KJwkDHWKE_WEFJH_WEF', 'newmarket'
//conn=Mysql.connect 'rdsj2yjnrn6nanf.mysql.rds.aliyuncs.com', 'marketing', 'KJwkDHWKE_WEFJH_WEF', 'newmarket'
//$host   =  'rm-wz94y9juv07017s60.mysql.rds.aliyuncs.com';
//$user   =  'clearbay';
$host 	= 'rm-wz94y9juv07017s60.mysql.rds.aliyuncs.com';
$user	= 'clearbay';
$pwd    =  'Ttklb0010';
$dbname =  'baseadmin';

//$lnk = mysql_connect($host,$user,$pwd) or die ('连接失败'.mysql_error());
$lnk = new PDO('mysql:host='.$host.';dbname='.$dbname.'',$user,$pwd);

$lnk -> query("SET NAMES utf8");
global $a;

$is_dbver_exits = $lnk->query("show tables like '%dbver%'");
$row = $is_dbver_exits -> fetch();
if($row){
	$maxver = getMaxVer($dbname,$lnk);
}else{
	$dbversql 	= "CREATE TABLE `dbver` (`ver` int(11) NOT NULL DEFAULT '0',`changelog` text NOT NULL,`dateline` int(11) unsigned NOT NULL,PRIMARY KEY (`ver`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='DB版本表';";
	$dbresult 	= $lnk->query($dbversql);
	$maxver = 0;
}
if(!$maxver){
	$maxver = 0;
}

$allweifilename = getWeiFilename($maxver,$dbname);
asort($allweifilename);
foreach ($allweifilename as $v){
	$a = populate_db( $lnk,'',$v );

	if($a != 1){
		break;
	}else{
		echo "info: process version ".basename($v)."... completed.\n";
		//sleep(1);
	}
}

if($a == 1){
	echo "updating complete.\n";
}else{
	if($a){
		echo "发生错误:".$a[0][0][2]."\n";
	}else{
		echo "updating complete.\n";
	}
}

function getMaxVer($dbname,$lnk){
	$sql="SELECT max(ver) FROM `dbver`";
	$result = $lnk -> query($sql);
	$row = $result -> fetch();
	return $row[0];
}

function dump($a){
	echo '<pre>';
	var_dump($a);
	echo '</pre>';
}

function getWeiFilename($maxver,$dbname){
	$dir = dirname(__FILE__);

	$dir .= DIRECTORY_SEPARATOR.$dbname;

    if (is_file($dir)) {
        return array($dir);
    }

    $files = array();
    if (is_dir($dir) && ($dir_p = opendir($dir))) {
        $ds = DIRECTORY_SEPARATOR;
        while (($filename = readdir($dir_p)) !== false) {
            if ($filename=='.' || $filename=='..' || $filename=='.svn') { continue; }
			$dirs_p = $dir.DIRECTORY_SEPARATOR.$filename;
			if (is_dir($dirs_p) && ($dir_ps = opendir($dirs_p))) {
				while (($filenames =  readdir($dir_ps)) !== false) {
					 	 if ($filenames=='.' || $filenames=='..') { continue; }
						$files[] = $dirs_p.DIRECTORY_SEPARATOR.$filenames;
				}
			}else{
				$files[] = $filename;
			}

        }
        closedir($dir_p);
    }

    $arr = array();
	for($i=0;$i<count($files);$i++){

		$u_file_name = basename($files[$i]);
		$prearr = explode('.', $u_file_name);
    	$pre = ltrim ( $prearr[0] , '0');
		if($pre > $maxver){
    		$arr[] = $files[$i];
    	}
	}

    return $arr;
}

function populate_db( $lnk, $DBPrefix, $sqlfile ) {
    global $errors;

    //mysql_select_db($DBname);
    //$mqr = get_magic_quotes_runtime();    
    //set_magic_quotes_runtime(0);    
    $query = fread(fopen($sqlfile, "r"), filesize($sqlfile));
    //set_magic_quotes_runtime($mqr);    
    $pieces  = split_sql($query);

    for ($i=0; $i<count($pieces); $i++) {
        $pieces[$i] = trim($pieces[$i]);
        if(!empty($pieces[$i]) && $pieces[$i] != "#") {
            $pieces[$i] = str_replace( "#__", $DBPrefix, $pieces[$i]);
            if(!$result = $lnk->query($pieces[$i])){
            	$errors[] = array($lnk->errorInfo());
            	break;
            }
        }
    }
    if(!$errors){
    	return 1;
    }else{
    	return $errors;
    }
}

function split_sql($sql) {
    $sql = trim($sql);

	$sql = preg_replace("/\n#[^\n]*\n/", "/\n/", $sql);


    $buffer = array();
    $ret = array();
    $in_string = false;

    for($i=0; $i<strlen($sql)-1; $i++) {
        if($sql[$i] == ";" && !$in_string) {
            $ret[] = substr($sql, 0, $i);
            $sql = substr($sql, $i + 1);
            $i = 0;
        }

        if($in_string && ($sql[$i] == $in_string) && $buffer[1] != "\\") {
            $in_string = false;
        }
        elseif(!$in_string && ($sql[$i] == '"' || $sql[$i] == "'") && (!isset($buffer[0]) || $buffer[0] != "\\")) {
            $in_string = $sql[$i];
        }
        if(isset($buffer[1])) {
            $buffer[0] = $buffer[1];
        }
        $buffer[1] = $sql[$i];
    }

    if(!empty($sql)) {
        $ret[] = $sql;
    }
    return($ret);
}
?>
