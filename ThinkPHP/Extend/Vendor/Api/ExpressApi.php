<?php

class ExpressApi
{

    /**
     * 快递查单接口
     * @param $com  操作
     * @param $no   编号
     * @return array    返回数据
     * 注意事项:
     */
    static public function get($com, $no)
    {
        $url = 'http://v.juhe.cn/exp/index';

        $params = [
            'com' => $com, 
            'no'  => $no,
            'key' => C('JH_APPKEY'),
        ];

        $url .= '?' . http_build_query($params);
        $data = self::file_get($url);

        $data = json_decode($data, true);

        if ($data['error_code'] == 0) {
            return self::success($data['result']);
        } else {
            return self::error($data['reason']);
        }
    }

    private function file_get($url)
    {
        $context = stream_context_create([
            [
                'http' => [
                    'method' => 'GET',
                    'timeout' => '30'
                ]
            ]
        ]);

        return file_get_contents($url, 0, $context);
    }

    private function error($msg)
    {
        return [
            'errno' => 1,
            'error' => $msg,
            'data' => []
        ]; 
    }

    private function success($data)
    {
        return [
            'errno' => 0,
            'error' => '成功',
            'data' => $data
        ];
    }
}
//end
