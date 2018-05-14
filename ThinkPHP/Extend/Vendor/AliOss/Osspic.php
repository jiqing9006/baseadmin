<?php
if (!defined('OSS_ROOT')) {
	define('OSS_ROOT', dirname(__FILE__) . '/');
}

if (is_file(OSS_ROOT. 'libs/autoload.php')) {
	require_once OSS_ROOT . 'libs/autoload.php';
}
final class Config
{
    const OSS_ACCESS_ID = 'PFrk230sXgj6FLb9';
    const OSS_ACCESS_KEY = 'Had54ySYkwKqYjjwqdaB8IoIvJEg7c';
    const OSS_ENDPOINT = 'http://oss-cn-hangzhou.aliyuncs.com';
    const OSS_TEST_BUCKET = 'dayima-upload';
}

use \OSS\OssClient;
use \OSS\Core\OssException;

/**
 * Class Common
 *
 * 示例程序【Samples/*.php】 的Common类，用于获取OssClient实例和其他公用方法
 */
class Common
{
	const endpoint = Config::OSS_ENDPOINT;
	const accessKeyId = Config::OSS_ACCESS_ID;
	const accessKeySecret = Config::OSS_ACCESS_KEY;
	const bucket = Config::OSS_TEST_BUCKET;

	/**
	 * 根据Config配置，得到一个OssClient实例
	 *
	 * @return OssClient 一个OssClient实例
	 */
	public static function getOssClient()
	{
		try {
			$ossClient = new OssClient(self::accessKeyId, self::accessKeySecret, self::endpoint, false);
		} catch (OssException $e) {
			return $e->getMessage();
		}
		return $ossClient;
	}

	public static function getBucketName()
	{
		return self::bucket;
	}

	/**
	 * 工具方法，创建一个存储空间，如果发生异常直接exit
	 */
	public static function createBucket()
	{
		$ossClient = self::getOssClient();
		if (is_null($ossClient)) exit(1);
		$bucket = self::getBucketName();
		$acl = OssClient::OSS_ACL_TYPE_PUBLIC_READ;
		try {
			$ossClient->createBucket($bucket, $acl);
		} catch (OssException $e) {

			$message = $e->getMessage();
			if (\OSS\Core\OssUtil::startsWith($message, 'http status: 403')) {
				echo "Please Check your AccessKeyId and AccessKeySecret" . "\n";
				exit(0);
			} elseif (strpos($message, "BucketAlreadyExists") !== false) {
				echo "Bucket already exists. Please check whether the bucket belongs to you, or it was visited with correct endpoint. " . "\n";
				exit(0);
			}
			printf(__FUNCTION__ . ": FAILED\n");
			printf($e->getMessage() . "\n");
			return;
		}
		return 1;
	}

	public static function println($message)
	{
		if (!empty($message)) {
			echo strval($message) . "\n";
		}
	}
}

Common::createBucket();
class Osspic{
	public static function uploadFile($src_file, $dst_path_with_filename)
	{	
		$options = array();
		try {
			$ossClient = Common::getOssClient();
			$bucket = 	Common::getBucketName();
			$ossClient->uploadFile($bucket,$dst_path_with_filename, $src_file , $options);
		} catch (OssException $e) {
			return $e->getMessage();
		}
		return 1;
	}
}